import { Briefcase, Users, Building2, Calendar, CheckCircle2, ArrowRight, Search, Award } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

export default function FeriaLanding({ onNavigate }: { onNavigate: (view: string) => void }) {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground">Feria de servicio social</h1>
            <p className="text-sm text-muted-foreground">Universidad Nacional</p>
          </div>
          <Button onClick={() => onNavigate('login')}>
            Iniciar sesión
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-secondary/30 rounded-full px-4 py-2 mb-6">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Convocatoria abierta 2026</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Encuentra el proyecto perfecto para tu servicio social
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Explora oportunidades en empresas e instituciones que buscan estudiantes como tú.
              Regístrate fácilmente y comienza tu experiencia profesional.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={() => onNavigate('catalogo')}>
                <Search className="w-4 h-4 mr-2" />
                Explorar proyectos
              </Button>
              <Button size="lg" variant="outline" onClick={() => onNavigate('login')}>
                Registrarme
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-3xl"></div>
            <Card className="relative bg-card">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Briefcase className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">Proyectos disponibles</h4>
                      <p className="text-sm text-muted-foreground">Información cargada desde el catálogo</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-secondary/30 flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-foreground" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">Organizaciones participantes</h4>
                      <p className="text-sm text-muted-foreground">Información cargada desde el catálogo</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">Estudiantes inscritos</h4>
                      <p className="text-sm text-muted-foreground">Información cargada desde el sistema</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="bg-card py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Cómo funciona?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tres pasos sencillos para comenzar tu servicio social
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                number: "1",
                title: "Explora proyectos",
                description: "Navega por el catálogo y descubre oportunidades que se ajusten a tu perfil y área de estudio."
              },
              {
                number: "2",
                title: "Regístrate al proyecto",
                description: "Completa el formulario de registro con tus datos. Es rápido, seguro y muy fácil."
              },
              {
                number: "3",
                title: "Comienza tu servicio",
                description: "Recibe la confirmación y sigue las instrucciones para dar inicio a tu experiencia profesional."
              }
            ].map((step, idx) => (
              <Card key={idx} className="relative hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Por qué participar en la feria?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Beneficios de realizar tu servicio social con nosotros
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: Award,
              title: "Experiencia real",
              description: "Proyectos que te preparan para el mundo laboral y fortalecen tu currículum."
            },
            {
              icon: Building2,
              title: "Organizaciones verificadas",
              description: "Todas las empresas e instituciones están validadas por la universidad."
            },
            {
              icon: Users,
              title: "Apoyo continuo",
              description: "Te acompañamos durante todo el proceso, desde la inscripción hasta la finalización."
            },
            {
              icon: CheckCircle2,
              title: "Proceso simple",
              description: "Registro en línea sin complicaciones. Todo desde una sola plataforma."
            },
            {
              icon: Briefcase,
              title: "Variedad de áreas",
              description: "Proyectos en tecnología, educación, salud, diseño y muchas áreas más."
            },
            {
              icon: Calendar,
              title: "Horarios flexibles",
              description: "Encuentra proyectos que se adapten a tu disponibilidad de tiempo."
            }
          ].map((benefit, idx) => (
            <Card key={idx} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-secondary/30 flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-secondary/20 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { value: "--", label: "Estudiantes inscritos" },
              { value: "--", label: "Organizaciones aliadas" },
              { value: "--", label: "Proyectos activos" },
              { value: "--", label: "Satisfacción general" }
            ].map((stat, idx) => (
              <div key={idx}>
                <p className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.value}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Listo para comenzar?</h2>
          <p className="text-lg mb-8 opacity-90">
            No esperes más. Explora los proyectos disponibles y da el primer paso hacia tu futuro profesional.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" onClick={() => onNavigate('catalogo')}>
              <Search className="w-4 h-4 mr-2" />
              Ver catálogo de proyectos
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10" onClick={() => onNavigate('login')}>
              Crear mi cuenta
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Feria de servicio social</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Conectando estudiantes con oportunidades de crecimiento profesional.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Para estudiantes</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Explorar proyectos</a></li>
                <li><a href="#" className="hover:text-foreground">Cómo registrarse</a></li>
                <li><a href="#" className="hover:text-foreground">Preguntas frecuentes</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Para organizaciones</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Publicar proyecto</a></li>
                <li><a href="#" className="hover:text-foreground">Beneficios</a></li>
                <li><a href="#" className="hover:text-foreground">Contacto</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Universidad</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Acerca de</a></li>
                <li><a href="#" className="hover:text-foreground">Términos y condiciones</a></li>
                <li><a href="#" className="hover:text-foreground">Privacidad</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground">
            © 2026 Universidad Nacional. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
