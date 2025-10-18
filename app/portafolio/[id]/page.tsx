import { redirect } from "next/navigation"

// Redirige /portafolio/[id] a la ruta canónica /portafolio?id=...
// La página /portafolio leerá ese id, fijará localStorage y limpiará la query
export default async function PortafolioIdAlias({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  redirect(`/portafolio?id=${id}`)
}
