// Cliente API del frontend que consume el proxy interno /api/backend
// Nota: No establecemos manualmente "Content-Type" para permitir FormData/multipart correcto.

type Json = any

const BASE = "/api/backend"

function getServerOrigin(): string {
	const envOrigin = process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL
	if (envOrigin) {
		return envOrigin.startsWith("http") ? envOrigin : `https://${envOrigin}`
	}
	const port = process.env.PORT || "3000"
	return `http://localhost:${port}`
}

function buildUrl(path: string): string {
	const rel = `${BASE}${path}`.replace(/\/+$/, "")
	if (typeof window !== "undefined") return rel
	return new URL(rel, getServerOrigin()).toString()
}

async function http<T = Json>(path: string, init?: RequestInit): Promise<T> {
	const url = buildUrl(path)
	const res = await fetch(url, {
		// credenciales same-origin por defecto
		...init,
		headers: init?.body instanceof FormData ? init?.headers : { ...(init?.headers || { Accept: "application/json" }) },
		cache: "no-store",
	})
	if (!res.ok) {
		// intenta parsear body para mensaje de error
		let msg = `${res.status} ${res.statusText}`
		try {
			const data = await res.json()
			msg = data?.message || msg
		} catch {}
		throw new Error(msg)
	}
	const ct = res.headers.get("content-type") || ""
	if (ct.includes("application/json")) return (await res.json()) as T
	// @ts-ignore
	return (await res.text()) as T
}

// Helpers
export function toMediaUrl(path?: string | null): string | undefined {
	if (!path) return undefined
	const clean = String(path).replace(/^\/+/, "")
	return `/api/media/${clean}`
}

// Users
export async function getUsers(): Promise<Json[]> {
	return http<Json[]>(`/Users`)
}

export async function getUserById(id: number): Promise<Json | null> {
	if (!id) return null
	return http<Json>(`/Users/${id}`)
}

export async function createUser(form: FormData): Promise<Json> {
	return http<Json>(`/Users/with-image`, { method: "POST", body: form })
}

export async function updateUser(id: number, form: FormData): Promise<Json> {
	return http<Json>(`/Users/${id}/with-image`, { method: "PUT", body: form })
}

export async function deleteUser(id: number): Promise<void> {
	await http(`/Users/${id}`, { method: "DELETE" })
}

// Projects
export async function getProjects(): Promise<Json[]> {
	return http<Json[]>(`/Projects`)
}

export async function getProjectById(id: number): Promise<Json | null> {
	if (!id) return null
	return http<Json>(`/Projects/${id}`)
}

export async function createProject(body: Record<string, any> | FormData): Promise<Json> {
	const isForm = body instanceof FormData
	return http<Json>(`/Projects`, { method: "POST", body: isForm ? (body as FormData) : JSON.stringify(body), headers: isForm ? undefined : { "Content-Type": "application/json" } })
}

export async function updateProject(id: number, body: Record<string, any> | FormData): Promise<Json> {
	const isForm = body instanceof FormData
	return http<Json>(`/Projects/${id}`, { method: "PUT", body: isForm ? (body as FormData) : JSON.stringify(body), headers: isForm ? undefined : { "Content-Type": "application/json" } })
}

export async function deleteProject(id: number): Promise<void> {
	// Intento principal: DELETE directo
	try {
		await http(`/Projects/${id}`, { method: "DELETE" })
		return
	} catch (e: any) {
		const msg = String(e?.message || "")
		// Fallback 1: algunos backends no permiten DELETE. Intentar POST con method-override.
		if (msg.includes("405")) {
			try {
				await http(`/Projects/${id}?_method=DELETE`, {
					method: "POST",
					headers: { "X-HTTP-Method-Override": "DELETE" },
				})
				return
			} catch (e2: any) {
				// Fallback 2: rutas comunes alternativas para borrar
				const altPaths = [`/Projects/delete/${id}`, `/Projects/${id}/delete`]
				let lastErr = String(e2?.message || msg)
				for (const p of altPaths) {
					try {
						await http(p, { method: "POST" })
						return
					} catch (e3: any) {
						lastErr = String(e3?.message || lastErr)
					}
				}
				throw new Error(lastErr)
			}
		}
		throw e
	}
}

// Projects with image
export async function createProjectWithImage(form: FormData): Promise<Json> {
	return http<Json>(`/Projects/with-image`, { method: "POST", body: form })
}

export async function updateProjectWithImage(id: number, form: FormData): Promise<Json> {
	return http<Json>(`/Projects/${id}/with-image`, { method: "PUT", body: form })
}

// Points
export async function getPoints(): Promise<Json[]> {
	return http<Json[]>(`/Points`)
}

export async function getPointById(id: number): Promise<Json | null> {
	if (!id) return null
	return http<Json>(`/Points/${id}`)
}

export async function createPoint(body: { description: string; projectId: number }): Promise<Json> {
	return http<Json>(`/Points`, {
		method: "POST",
		body: JSON.stringify(body),
		headers: { "Content-Type": "application/json" },
	})
}

export async function updatePoint(id: number, body: { id?: number; description: string; projectId: number }): Promise<void> {
	return http<void>(`/Points/${id}`, {
		method: "PUT",
		body: JSON.stringify({ id, ...body }),
		headers: { "Content-Type": "application/json" },
	})
}

export async function deletePoint(id: number): Promise<void> {
	await http(`/Points/${id}`, { method: "DELETE" })
}

// Contact messages
export async function getContactMessages(): Promise<Json[]> {
	return http<Json[]>(`/ContactMessages`)
}

export async function createContactMessage(body: {
	name: string
	email: string
	subject: string
	message: string
	userId?: number
}): Promise<Json> {
	return http<Json>(`/ContactMessages`, {
		method: "POST",
		body: JSON.stringify(body),
		headers: { "Content-Type": "application/json" },
	})
}

// Auth
export async function register(body: { name?: string; email?: string; phone?: string; username?: string; password: string }): Promise<Json> {
	return http<Json>(`/Auth/register`, {
		method: "POST",
		body: JSON.stringify(body),
		headers: { "Content-Type": "application/json" },
	})
}

export async function login(body: { identifier: string; password: string }): Promise<{ userId: number; username: string; email: string; message: string }> {
	return http<{ userId: number; username: string; email: string; message: string }>(`/Auth/login`, {
		method: "POST",
		body: JSON.stringify(body),
		headers: { "Content-Type": "application/json" },
	})
}

export async function changePassword(body: { userId?: number; identifier?: string; currentPassword: string; newPassword: string }): Promise<Json> {
	return http<Json>(`/Auth/change-password`, {
		method: "POST",
		body: JSON.stringify(body),
		headers: { "Content-Type": "application/json" },
	})
}

