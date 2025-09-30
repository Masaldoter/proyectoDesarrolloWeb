import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"

const projects = [
  {
    id: 1,
    title: "E-commerce Moderno",
    description:
      "Plataforma de comercio electrónico completa con carrito de compras, pagos integrados y panel de administración.",
    image: "/modern-ecommerce-interface.png",
    technologies: ["React", "Next.js", "Stripe", "PostgreSQL"],
    category: "Web App",
    status: "Completado",
    link: "#",
  },
  {
    id: 2,
    title: "Dashboard de Gestión",
    description: "Sistema de gestión empresarial con análisis en tiempo real, reportes y gestión de usuarios.",
    image: "/task-management-dashboard.png",
    technologies: ["React", "Node.js", "MongoDB", "Chart.js"],
    category: "Dashboard",
    status: "En desarrollo",
    link: "#",
  },
  {
    id: 3,
    title: "App Móvil Social",
    description: "Aplicación móvil para redes sociales con chat en tiempo real, stories y sistema de notificaciones.",
    image: "/social-media-mobile-app-interface.png",
    technologies: ["React Native", "Firebase", "Socket.io"],
    category: "Mobile App",
    status: "Completado",
    link: "#",
  },
  {
    id: 4,
    title: "Portafolio Personal",
    description: "Sitio web personal moderno con animaciones, modo oscuro y diseño responsivo.",
    image: "/modern-portfolio-website.png",
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion"],
    category: "Website",
    status: "Completado",
    link: "#",
  },
  {
    id: 5,
    title: "Plataforma de Aprendizaje",
    description: "Sistema de educación online con cursos, evaluaciones y seguimiento de progreso.",
    image: "/online-learning-platform.png",
    technologies: ["Vue.js", "Python", "Django", "PostgreSQL"],
    category: "Web App",
    status: "Completado",
    link: "#",
  },
  {
    id: 6,
    title: "API REST Escalable",
    description: "API robusta para aplicaciones empresariales con autenticación, rate limiting y documentación.",
    image: "/preview/project4.png",
    technologies: ["Node.js", "Express", "JWT", "Swagger"],
    category: "Backend",
    status: "Completado",
    link: "#",
  },
]

export default function PortafolioPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl float-animation"></div>
          <div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl float-animation"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 text-balance">
            Mi{" "}
            <span className="text-primary bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Portafolio
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed text-pretty">
            Explora una selección de mis proyectos más destacados, desde aplicaciones web modernas hasta soluciones
            móviles innovadoras.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Card
                key={project.id}
                className="group hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:-translate-y-3 border-0 bg-card/90 backdrop-blur-sm overflow-hidden"
              >
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-4">
                    <Badge variant={project.status === "Completado" ? "default" : "secondary"} className="text-xs">
                      {project.status}
                    </Badge>
                  </div>
                </div>

                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </CardTitle>
                    <Badge variant="outline" className="text-xs">
                      {project.category}
                    </Badge>
                  </div>
                  <CardDescription className="text-base leading-relaxed">{project.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <Button asChild className="w-full group-hover:bg-primary/90 transition-colors duration-300">
                    <Link href={project.link}>Ver Proyecto</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4 text-balance">¿Tienes un proyecto en mente?</h2>
          <p className="text-lg text-muted-foreground mb-8 text-pretty">
            Me encantaría colaborar contigo en tu próximo proyecto. Hablemos sobre cómo puedo ayudarte a hacerlo
            realidad.
          </p>
          <Button asChild size="lg" className="text-lg px-8 glow-effect">
            <Link href="/contacto">Iniciar Conversación</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
