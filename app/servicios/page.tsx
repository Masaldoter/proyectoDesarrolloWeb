import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Code, Smartphone, Database, Palette, Zap, Shield } from "lucide-react"

const services = [
  {
    icon: Code,
    title: "Desarrollo Web",
    description:
      "Aplicaciones web modernas y responsivas utilizando las últimas tecnologías como React, Next.js y TypeScript.",
    features: ["Sitios web responsivos", "Aplicaciones web progresivas", "E-commerce", "Dashboards administrativos"],
    price: "Desde $800",
    popular: false,
  },
  {
    icon: Smartphone,
    title: "Desarrollo Mobile",
    description: "Aplicaciones móviles nativas y multiplataforma para iOS y Android con rendimiento óptimo.",
    features: ["Apps nativas iOS/Android", "React Native", "Flutter", "Integración con APIs"],
    price: "Desde $1,200",
    popular: true,
  },
  {
    icon: Database,
    title: "Backend & APIs",
    description: "Desarrollo de APIs robustas y escalables con bases de datos optimizadas para tu aplicación.",
    features: ["APIs REST", "Bases de datos", "Autenticación", "Integración de servicios"],
    price: "Desde $600",
    popular: false,
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Diseño de interfaces intuitivas y atractivas que mejoran la experiencia del usuario.",
    features: ["Diseño de interfaces", "Prototipado", "Wireframes", "Design systems"],
    price: "Desde $400",
    popular: false,
  },
  {
    icon: Zap,
    title: "Optimización",
    description: "Mejora del rendimiento y velocidad de aplicaciones existentes para una mejor experiencia.",
    features: ["Optimización de velocidad", "SEO técnico", "Performance audit", "Refactoring"],
    price: "Desde $300",
    popular: false,
  },
  {
    icon: Shield,
    title: "Mantenimiento",
    description: "Soporte continuo y mantenimiento de aplicaciones para garantizar su funcionamiento óptimo.",
    features: ["Actualizaciones", "Monitoreo", "Backup automático", "Soporte técnico"],
    price: "Desde $200/mes",
    popular: false,
  },
]

export default function ServiciosPage() {
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
            Mis{" "}
            <span className="text-primary bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Servicios
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed text-pretty">
            Ofrezco soluciones tecnológicas completas para llevar tu idea desde el concepto hasta la realidad digital.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <Card
                  key={index}
                  className={`group hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:-translate-y-3 border-0 bg-card/90 backdrop-blur-sm relative overflow-hidden ${service.popular ? "ring-2 ring-primary/50" : ""}`}
                >
                  {service.popular && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-primary text-primary-foreground">Más Popular</Badge>
                    </div>
                  )}

                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl text-center group-hover:text-primary transition-colors duration-300">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed text-center">
                      {service.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-3 mb-6">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                          <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                          {feature}
                        </div>
                      ))}
                    </div>

                    <div className="text-center mb-6">
                      <div className="text-2xl font-bold text-primary mb-2">{service.price}</div>
                    </div>

                    <Button
                      asChild
                      className={`w-full transition-colors duration-300 ${service.popular ? "glow-effect" : "group-hover:bg-primary/90"}`}
                      variant={service.popular ? "default" : "outline"}
                    >
                      <Link href="/contacto">Solicitar Cotización</Link>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4 text-balance">Mi Proceso de Trabajo</h2>
            <p className="text-lg text-muted-foreground text-pretty">
              Un enfoque estructurado para garantizar el éxito de tu proyecto
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Consulta", description: "Analizamos tus necesidades y objetivos" },
              { step: "02", title: "Planificación", description: "Creamos una estrategia y cronograma detallado" },
              { step: "03", title: "Desarrollo", description: "Construimos tu solución con las mejores prácticas" },
              { step: "04", title: "Entrega", description: "Lanzamos y brindamos soporte continuo" },
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-xl font-bold text-primary">{item.step}</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4 text-balance">¿Listo para comenzar tu proyecto?</h2>
          <p className="text-lg text-muted-foreground mb-8 text-pretty">
            Conversemos sobre cómo puedo ayudarte a alcanzar tus objetivos digitales.
          </p>
          <Button asChild size="lg" className="text-lg px-8 glow-effect">
            <Link href="/contacto">Contactar Ahora</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
