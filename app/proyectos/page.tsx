"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getProjects, getUserById, toMediaUrl } from "@/lib/api"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type Project = {
  id: number
  title: string
  description?: string
  technologies?: string[] | string
  projectUrl?: string
  userId?: number
  imageUrl?: string | null
  imageUrls?: string[] | null
  category?: string
  status?: string
  isFeatured?: boolean
}

type User = { id: number; name: string; profileImageUrl?: string | null }

export default function ProyectosPage() {
  const router = useRouter()
  const search = useSearchParams()

  const [userId, setUserId] = useState<number | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Inicializa el userId desde query (?id=) o localStorage, con fallback 1
  useEffect(() => {
    const q = search.get("id")
    if (q) {
      const idNum = Number(q)
      if (Number.isFinite(idNum) && idNum > 0) {
        localStorage.setItem("selectedUserId", String(idNum))
        setUserId(idNum)
        router.replace("/proyectos")
        return
      }
    }
    const saved = Number(localStorage.getItem("selectedUserId") || "")
    if (Number.isFinite(saved) && saved > 0) {
      setUserId(saved)
    } else {
      localStorage.setItem("selectedUserId", "1")
      setUserId(1)
    }
  }, [router, search])

  useEffect(() => {
    if (!userId) return
    ;(async () => {
      setLoading(true)
      setError(null)
      try {
        const [u, list] = await Promise.all([getUserById(userId), getProjects()])
        setUser(u ? { id: u.id, name: u.name, profileImageUrl: u.profileImageUrl } : null)
        const only = (Array.isArray(list) ? list : []).filter((p: any) => Number(p?.userId ?? p?.UserId) === userId)
        setProjects(only)
      } catch (e: any) {
        setError(e?.message || "No se pudo cargar los proyectos del usuario")
      } finally {
        setLoading(false)
      }
    })()
  }, [userId])

  const headerTitle = useMemo(() => (user ? `Proyectos de ${user.name}` : "Proyectos"), [user])

  if (loading || !userId) return <div className="max-w-6xl mx-auto px-4 py-10 text-muted-foreground">Cargando…</div>
  if (error) return <div className="max-w-6xl mx-auto px-4 py-10 text-red-500">{error}</div>

  return (
    <div className="min-h-screen bg-background">
      <section className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4">
            <Avatar className="h-14 w-14">
              {user?.profileImageUrl ? (
                <AvatarImage src={toMediaUrl(user.profileImageUrl)} alt={user.name} />
              ) : (
                <AvatarFallback>{(user?.name || "U").split(" ").map(s=>s[0]).slice(0,2).join("").toUpperCase()}</AvatarFallback>
              )}
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold leading-tight">{headerTitle}</h1>
              <p className="text-sm text-muted-foreground">Proyectos destacados, tecnologías y demo.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {projects.length === 0 ? (
            <div className="text-center text-muted-foreground">Este usuario aún no tiene proyectos.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => {
                const mainImg = toMediaUrl(project.imageUrl || project.imageUrls?.[0]) || "/placeholder.jpg"
                const techs = Array.isArray(project.technologies)
                  ? project.technologies
                  : typeof project.technologies === "string"
                  ? project.technologies.split(",").map(t => t.trim()).filter(Boolean)
                  : []
                return (
                  <Card key={project.id} className="group overflow-hidden hover:shadow-xl transition-all">
                    <Link href={`/proyecto/${project.id}`} className="block">
                      <div className="aspect-video relative overflow-hidden rounded-t-lg">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={mainImg} alt={project.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        {project.isFeatured && (
                          <div className="absolute top-3 left-3">
                            <Badge className="bg-yellow-500 text-black hover:bg-yellow-500/90">Destacado</Badge>
                          </div>
                        )}
                        {project.status && (
                          <div className="absolute top-3 right-3">
                            <Badge variant={project.status === "Completado" ? "default" : "secondary"} className="text-xs">
                              {project.status}
                            </Badge>
                          </div>
                        )}
                      </div>
                      <CardHeader>
                        <div className="flex items-center justify-between gap-2">
                          <CardTitle className="text-lg group-hover:text-primary transition-colors">{project.title}</CardTitle>
                          {project.category && (
                            <Badge variant="outline" className="text-xs">{project.category}</Badge>
                          )}
                        </div>
                        {project.description && (
                          <CardDescription className="line-clamp-3">{project.description}</CardDescription>
                        )}
                      </CardHeader>
                    </Link>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {techs.map((t) => (
                          <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        {project.projectUrl ? (
                          <>
                            <Button asChild className="w-full">
                              <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">Abrir demo</a>
                            </Button>
                            <Button asChild variant="outline" className="w-full">
                              <Link href={`/proyecto/${project.id}`}>Detalles</Link>
                            </Button>
                          </>
                        ) : (
                          <Button asChild className="w-full">
                            <Link href={`/proyecto/${project.id}`}>Ver Proyecto</Link>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
