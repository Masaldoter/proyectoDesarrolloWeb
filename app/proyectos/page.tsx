import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const projects = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "Plataforma completa de comercio electrónico con carrito de compras, pagos y gestión de inventario.",
    image: "/modern-ecommerce-interface.png",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    demoUrl: "#",
    codeUrl: "#",
  },
  {
    id: 2,
    title: "Task Management App",
    description: "Aplicación de gestión de tareas con colaboración en tiempo real y notificaciones push.",
    image: "/task-management-dashboard.png",
    technologies: ["Next.js", "TypeScript", "Supabase", "Tailwind"],
    demoUrl: "#",
    codeUrl: "#",
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description: "Dashboard meteorológico con pronósticos detallados y visualizaciones interactivas.",
    image: "/preview/project4.png",
    technologies: ["Vue.js", "Chart.js", "OpenWeather API"],
    demoUrl: "#",
    codeUrl: "#",
  },
  {
    id: 4,
    title: "Social Media App",
    description: "Red social con funciones de chat, publicaciones y sistema de seguimiento.",
    image: "/social-media-mobile-app-interface.png",
    technologies: ["React Native", "Firebase", "Redux"],
    demoUrl: "#",
    codeUrl: "#",
  },
  {
    id: 5,
    title: "Portfolio Website",
    description: "Sitio web de portafolio personal con animaciones suaves y diseño responsivo.",
    image: "/modern-portfolio-website.png",
    technologies: ["Gatsby", "GraphQL", "Framer Motion"],
    demoUrl: "#",
    codeUrl: "#",
  },
  {
    id: 6,
    title: "Learning Platform",
    description: "Plataforma de aprendizaje online con cursos, quizzes y seguimiento de progreso.",
    image: "/online-learning-platform.png",
    technologies: ["Django", "React", "PostgreSQL"],
    demoUrl: "#",
    codeUrl: "#",
  },
]

export default function ProyectosPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="relative overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl float-animation"></div>
        <div
          className="absolute bottom-20 left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl float-animation"
          style={{ animationDelay: "3s" }}
        ></div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">Mis Proyectos</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Una colección de proyectos que demuestran mis habilidades en desarrollo web y móvil
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Card
                key={project.id}
                className="group hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:-translate-y-2 border-0 bg-card/90 backdrop-blur-sm overflow-hidden"
              >
                <div className="aspect-video overflow-hidden rounded-t-lg relative">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <CardHeader>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed">{project.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="text-xs hover:bg-primary/10 transition-colors duration-200"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      asChild
                      size="sm"
                      className="flex-1 hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
                    >
                      <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                        Ver Demo
                      </a>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-transparent hover:bg-primary/5 hover:border-primary/50 transition-all duration-300"
                    >
                      <a href={project.codeUrl} target="_blank" rel="noopener noreferrer">
                        Ver Código
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-16">
            <p className="text-muted-foreground mb-4 text-lg">¿Tienes una idea de proyecto? ¡Hablemos!</p>
            <Button asChild size="lg" className="glow-effect">
              <a href="/contacto">Iniciar Conversación →</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
