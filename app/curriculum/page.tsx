import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Download, MapPin, Mail, Phone, Calendar, Award, Briefcase, GraduationCap } from "lucide-react"

const experience = [
  {
    company: "Tech Solutions Inc.",
    position: "Senior Full Stack Developer",
    period: "2022 - Presente",
    location: "Remoto",
    description:
      "Liderazgo de equipo de desarrollo, arquitectura de aplicaciones escalables y mentoring de desarrolladores junior.",
    achievements: [
      "Incrementé la eficiencia del equipo en un 40%",
      "Desarrollé 3 aplicaciones web de alto tráfico",
      "Implementé CI/CD reduciendo bugs en producción en 60%",
    ],
  },
  {
    company: "Digital Agency Pro",
    position: "Full Stack Developer",
    period: "2020 - 2022",
    location: "Ciudad de México",
    description: "Desarrollo de aplicaciones web y móviles para clientes corporativos utilizando tecnologías modernas.",
    achievements: [
      "Entregué más de 15 proyectos exitosos",
      "Mejoré el rendimiento de aplicaciones en 50%",
      "Colaboré con equipos multidisciplinarios",
    ],
  },
  {
    company: "StartUp Innovadora",
    position: "Frontend Developer",
    period: "2019 - 2020",
    location: "Guadalajara",
    description: "Desarrollo de interfaces de usuario modernas y responsivas para productos SaaS.",
    achievements: [
      "Creé componentes reutilizables que redujeron el tiempo de desarrollo",
      "Implementé diseños pixel-perfect",
      "Optimicé la experiencia de usuario",
    ],
  },
]

const education = [
  {
    institution: "Universidad Tecnológica",
    degree: "Ingeniería en Sistemas Computacionales",
    period: "2015 - 2019",
    description: "Especialización en desarrollo de software y bases de datos.",
  },
  {
    institution: "Platzi",
    degree: "Escuela de JavaScript",
    period: "2020",
    description: "Certificación avanzada en desarrollo web moderno.",
  },
  {
    institution: "AWS",
    degree: "AWS Certified Developer",
    period: "2021",
    description: "Certificación en servicios de nube de Amazon Web Services.",
  },
]

const skills = {
  frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vue.js", "Angular"],
  backend: ["Node.js", "Python", "Express", "Django", "PostgreSQL", "MongoDB"],
  mobile: ["React Native", "Flutter", "iOS", "Android"],
  tools: ["Git", "Docker", "AWS", "Vercel", "Figma", "Jest"],
}

export default function CurriculumPage() {
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

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Profile Info */}
            <div className="lg:col-span-1">
              <Card className="bg-card/90 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader className="text-center">
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border-4 border-primary/30 flex items-center justify-center overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                      <svg className="w-16 h-16 text-primary/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                  </div>
                  <CardTitle className="text-2xl mb-2">Javier Guerra</CardTitle>
                  <CardDescription className="text-lg text-primary font-medium">
                    Senior Full Stack Developer
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-3 text-primary" />
                    Petén, Guatemala
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Mail className="w-4 h-4 mr-3 text-primary" />
                    javier.guerra294@gmail.com
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Phone className="w-4 h-4 mr-3 text-primary" />
                    +502 5485-3063
                  </div>

                  <Button className="w-full mt-6 glow-effect">
                    <Download className="w-4 h-4 mr-2" />
                    Descargar CV
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 text-balance">
                  Mi{" "}
                  <span className="text-primary bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Curriculum
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed text-pretty">
                  Desarrollador Full Stack con más de 5 años de experiencia creando soluciones digitales innovadoras.
                  Especializado en tecnologías modernas y metodologías ágiles.
                </p>
              </div>

              {/* Skills Overview */}
              <Card className="bg-card/90 backdrop-blur-sm border-0">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="w-5 h-5 mr-2 text-primary" />
                    Habilidades Técnicas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(skills).map(([category, skillList]) => (
                    <div key={category}>
                      <h4 className="font-medium text-foreground mb-2 capitalize">{category}</h4>
                      <div className="flex flex-wrap gap-2">
                        {skillList.map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4 text-balance flex items-center justify-center">
              <Briefcase className="w-8 h-8 mr-3 text-primary" />
              Experiencia Profesional
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
          </div>

          <div className="space-y-8">
            {experience.map((job, index) => (
              <Card
                key={index}
                className="bg-card/90 backdrop-blur-sm border-0 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300"
              >
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <CardTitle className="text-xl text-primary">{job.position}</CardTitle>
                      <CardDescription className="text-lg font-medium text-foreground mt-1">
                        {job.company}
                      </CardDescription>
                    </div>
                    <div className="flex flex-col md:items-end mt-2 md:mt-0">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-1" />
                        {job.period}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <MapPin className="w-4 h-4 mr-1" />
                        {job.location}
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{job.description}</p>
                  <div className="space-y-2">
                    <h4 className="font-medium text-foreground">Logros principales:</h4>
                    <ul className="space-y-1">
                      {job.achievements.map((achievement, achievementIndex) => (
                        <li key={achievementIndex} className="flex items-start text-sm text-muted-foreground">
                          <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></div>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4 text-balance flex items-center justify-center">
              <GraduationCap className="w-8 h-8 mr-3 text-primary" />
              Educación y Certificaciones
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {education.map((edu, index) => (
              <Card
                key={index}
                className="bg-card/90 backdrop-blur-sm border-0 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-2"
              >
                <CardHeader>
                  <CardTitle className="text-lg text-primary">{edu.degree}</CardTitle>
                  <CardDescription className="font-medium text-foreground">{edu.institution}</CardDescription>
                  <div className="flex items-center text-sm text-muted-foreground mt-2">
                    <Calendar className="w-4 h-4 mr-1" />
                    {edu.period}
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">{edu.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4 text-balance">¿Interesado en trabajar conmigo?</h2>
          <p className="text-lg text-muted-foreground mb-8 text-pretty">
            Estoy disponible para nuevos proyectos y oportunidades de colaboración.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8 glow-effect">
              <Link href="/contacto">Contactar</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 bg-transparent">
              <Link href="/portafolio">Ver Proyectos</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
