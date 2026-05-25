import { Shield, Lock, FileCheck, QrCode, Users, Building2, Briefcase, TrendingUp, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

export default function LandingPage({ onNavigate }: { onNavigate: (view: string) => void }) {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-semibold text-foreground">ServicioSeguro</h1>
              <p className="text-xs text-muted-foreground">Sistema Universitario</p>
            </div>
          </div>
          <Button onClick={() => onNavigate('login')}>
            Iniciar Sesión
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-secondary/20 rounded-full px-4 py-2 mb-6">
              <Lock className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Seguridad Criptográfica</span>
            </div>
            <h1 className="text-5xl font-bold text-foreground mb-6 leading-tight">
              Gestión Segura de Servicio Social Universitario
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Plataforma moderna que integra criptografía, firmas digitales y validación QR para proteger la información de estudiantes y empresas.
            </p>
            <div className="flex gap-4">
              <Button size="lg" onClick={() => onNavigate('login')}>
                Comenzar Ahora
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => onNavigate('catalogo')}>
                Explorar catálogo
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-3xl"></div>
            <Card className="relative">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Shield className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">Cifrado End-to-End</h4>
                      <p className="text-sm text-muted-foreground">Datos protegidos con AES-256</p>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                      <FileCheck className="w-6 h-6 text-secondary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">Firma Digital</h4>
                      <p className="text-sm text-muted-foreground">Contratos verificables</p>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                      <QrCode className="w-6 h-6 text-accent" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">QR Seguro</h4>
                      <p className="text-sm text-muted-foreground">Validación instantánea</p>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-card py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Funcionalidades Principales</h2>
            <p className="text-xl text-muted-foreground">Todo lo que necesitas para gestionar el servicio social de forma segura</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Protección Criptográfica",
                description: "Toda la información sensible está cifrada con los más altos estándares de seguridad."
              },
              {
                icon: FileCheck,
                title: "Contratos Digitales",
                description: "Firma y valida contratos con tecnología blockchain y hash verification."
              },
              {
                icon: QrCode,
                title: "Identificación QR",
                description: "Códigos QR únicos con validación criptográfica para cada estudiante."
              },
              {
                icon: Users,
                title: "Gestión de Alumnos",
                description: "Administra estudiantes, horas y estados de forma centralizada."
              },
              {
                icon: Building2,
                title: "Panel de Empresas",
                description: "Las empresas publican vacantes y gestionan solicitudes fácilmente."
              },
              {
                icon: TrendingUp,
                title: "Analytics Avanzado",
                description: "Dashboards con métricas en tiempo real y reportes detallados."
              }
            ].map((feature, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-4 gap-8">
            {[
              { label: "Estudiantes activos", value: "--" },
              { label: "Empresas registradas", value: "--" },
              { label: "Vacantes disponibles", value: "--" },
              { label: "Contratos firmados", value: "--" }
            ].map((stat, idx) => (
            <Card key={idx}>
              <CardContent className="p-6 text-center">
                <p className="text-4xl font-bold text-primary mb-2">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">¿Listo para comenzar?</h2>
          <p className="text-xl mb-8 opacity-90">
            Únete a las universidades que ya confían en nuestra plataforma segura
          </p>
          <Button size="lg" variant="secondary" onClick={() => onNavigate('login')}>
            Crear Cuenta Gratis
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-6 h-6 text-primary" />
                <span className="font-semibold">ServicioSeguro</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Gestión segura de servicio social universitario con tecnología criptográfica.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Producto</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Características</li>
                <li>Seguridad</li>
                <li>Precios</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Sobre Nosotros</li>
                <li>Contacto</li>
                <li>Soporte</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Privacidad</li>
                <li>Términos</li>
                <li>Seguridad</li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground">
            © 2026 ServicioSeguro. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
