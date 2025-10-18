import { NextResponse } from "next/server";
import axios from "axios";
import https from "node:https";

// Base del backend incluyendo "/api" para endpoints de la API
const API_BASE = (process.env.NEXT_PUBLIC_API_BASE_URL || "https://localhost:7251/api").replace(/\/$/, "");

const httpsAgent = new https.Agent({ rejectUnauthorized: false });

function buildTarget(req: Request, segments: string[]) {
  const urlIn = new URL(req.url);
  const path = segments.join("/");
  return `${API_BASE}/${path}${urlIn.search}`;
}

function forwardHeaders(req: Request) {
  const headers = Object.fromEntries(req.headers.entries());
  // Opcional: eliminar cabeceras que no deben reenviarse
  delete headers["host"]; // será establecido por axios
  delete headers["content-length"]; // axios calculará longitud correcta
  delete headers["content-encoding"]; // evitar inconsistencias de compresión
  delete headers["transfer-encoding"]; // que axios gestione transferencia
  delete headers["connection"]; // hop-by-hop header
  delete headers["accept-encoding"]; // deja que axios gestione encoding
  return headers;
}

async function forwardBody(req: Request) {
  const method = req.method.toUpperCase();
  if (method === "GET" || method === "HEAD") return undefined;
  // Mantener el cuerpo tal cual
  const buf = await req.arrayBuffer();
  return Buffer.from(buf);
}

export async function GET(req: Request, ctx: { params: Promise<{ path: string[] }> }) {
  const { path } = await ctx.params;
  const segments = path || [];
  const target = buildTarget(req, segments);

  try {
    const res = await axios.get(target, { httpsAgent, responseType: "arraybuffer" });
    const contentType = res.headers["content-type"] || "application/octet-stream";
    return new NextResponse(res.data, {
      status: res.status,
      headers: {
        "Content-Type": contentType,
      },
    });
  } catch (error: any) {
    const status = error?.response?.status || 502;
    let backendMsg = "";
    try {
      if (error?.response?.data) {
        const buf = Buffer.from(error.response.data);
        backendMsg = buf.toString("utf8").slice(0, 500);
      }
    } catch {}
    const msg = error?.message || "Proxy error";
    console.error(`[backend-proxy GET] ${target} -> ${status} ${msg}${backendMsg ? ` | body: ${backendMsg}` : ""}`);
    return new NextResponse(`Proxy error (${status})`, { status });
  }
}

export async function POST(req: Request, ctx: { params: Promise<{ path: string[] }> }) {
  const { path } = await ctx.params;
  const target = buildTarget(req, path || []);
  try {
    const data = await forwardBody(req);
    const res = await axios.post(target, data, { httpsAgent, headers: forwardHeaders(req), responseType: "arraybuffer", validateStatus: () => true });
    if (res.status === 204) return new NextResponse(null, { status: 204 });
    const contentType = res.headers["content-type"] || "application/octet-stream";
    return new NextResponse(res.data, { status: res.status, headers: { "Content-Type": contentType } });
  } catch (error: any) {
    const status = error?.response?.status || 502;
    let backendMsg = "";
    try {
      if (error?.response?.data) {
        const buf = Buffer.from(error.response.data);
        backendMsg = buf.toString("utf8").slice(0, 500);
      }
    } catch {}
    const msg = error?.message || "Proxy error";
    console.error(`[backend-proxy POST] ${target} -> ${status} ${msg}${backendMsg ? ` | body: ${backendMsg}` : ""}`);
    return new NextResponse(`Proxy error (${status})`, { status });
  }
}

export async function PUT(req: Request, ctx: { params: Promise<{ path: string[] }> }) {
  const { path } = await ctx.params;
  const target = buildTarget(req, path || []);
  try {
    const data = await forwardBody(req);
    const res = await axios.put(target, data, { httpsAgent, headers: forwardHeaders(req), responseType: "arraybuffer", validateStatus: () => true });
    if (res.status === 204) return new NextResponse(null, { status: 204 });
    const contentType = res.headers["content-type"] || "application/octet-stream";
    return new NextResponse(res.data, { status: res.status, headers: { "Content-Type": contentType } });
  } catch (error: any) {
    const status = error?.response?.status || 502;
    let backendMsg = "";
    try {
      if (error?.response?.data) {
        const buf = Buffer.from(error.response.data);
        backendMsg = buf.toString("utf8").slice(0, 500);
      }
    } catch {}
    const msg = error?.message || "Proxy error";
    console.error(`[backend-proxy PUT] ${target} -> ${status} ${msg}${backendMsg ? ` | body: ${backendMsg}` : ""}`);
    return new NextResponse(`Proxy error (${status})`, { status });
  }
}

export async function PATCH(req: Request, ctx: { params: Promise<{ path: string[] }> }) {
  const { path } = await ctx.params;
  const target = buildTarget(req, path || []);
  try {
    const data = await forwardBody(req);
    const res = await axios.patch(target, data, { httpsAgent, headers: forwardHeaders(req), responseType: "arraybuffer", validateStatus: () => true });
    if (res.status === 204) return new NextResponse(null, { status: 204 });
    const contentType = res.headers["content-type"] || "application/octet-stream";
    return new NextResponse(res.data, { status: res.status, headers: { "Content-Type": contentType } });
  } catch (error: any) {
    const status = error?.response?.status || 502;
    let backendMsg = "";
    try {
      if (error?.response?.data) {
        const buf = Buffer.from(error.response.data);
        backendMsg = buf.toString("utf8").slice(0, 500);
      }
    } catch {}
    const msg = error?.message || "Proxy error";
    console.error(`[backend-proxy PATCH] ${target} -> ${status} ${msg}${backendMsg ? ` | body: ${backendMsg}` : ""}`);
    return new NextResponse(`Proxy error (${status})`, { status });
  }
}

export async function DELETE(req: Request, ctx: { params: Promise<{ path: string[] }> }) {
  const { path } = await ctx.params;
  const target = buildTarget(req, path || []);
  try {
    const res = await axios.delete(target, { httpsAgent, headers: forwardHeaders(req), responseType: "arraybuffer", validateStatus: () => true });
    if (res.status === 204) return new NextResponse(null, { status: 204 });
    const contentType = res.headers["content-type"] || "application/octet-stream";
    return new NextResponse(res.data, { status: res.status, headers: { "Content-Type": contentType } });
  } catch (error: any) {
    const status = error?.response?.status || 502;
    let backendMsg = "";
    try {
      if (error?.response?.data) {
        const buf = Buffer.from(error.response.data);
        backendMsg = buf.toString("utf8").slice(0, 500);
      }
    } catch {}
    const msg = error?.message || "Proxy error";
    console.error(`[backend-proxy DELETE] ${target} -> ${status} ${msg}${backendMsg ? ` | body: ${backendMsg}` : ""}`);
    return new NextResponse(`Proxy error (${status})`, { status });
  }
}
