import { Briefcase, Users, UserCheck, TrendingUp, Plus, Eye } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import Sidebar from "./Sidebar";

export default function DashboardEmpresa({ onNavigate }: { onNavigate: (view: string) => void }) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar userType="empresa" onNavigate={onNavigate} currentView="dashboard-empresa" />

      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Panel de Empresa</h1>
              <p className="text-muted-foreground">TechCorp - Desarrollo de Software</p>
            </div>
            <Button onClick={() => onNavigate('vacantes-empresa')}>
              <Plus className="w-4 h-4 mr-2" />
              Nueva Vacante
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <p className="text-2xl font-bold mb-1">12</p>
                <p className="text-sm text-muted-foreground">Vacantes Totales</p>
                <div className="flex gap-2 mt-3">
                  <Badge variant="success">8 Activas</Badge>
                  <Badge variant="outline">4 Llenas</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-secondary" />
                  </div>
                </div>
                <p className="text-2xl font-bold mb-1">24</p>
                <p className="text-sm text-muted-foreground">Alumnos Inscritos</p>
                <p className="text-xs text-green-600 mt-3">+3 esta semana</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <UserCheck className="w-6 h-6 text-accent" />
                  </div>
                </div>
                <p className="text-2xl font-bold mb-1">7</p>
                <p className="text-sm text-muted-foreground">Solicitudes Pendientes</p>
                <Button variant="ghost" size="sm" className="mt-2 p-0 h-auto text-primary">
                  Revisar →
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-foreground" />
                  </div>
                </div>
                <p className="text-2xl font-bold mb-1">89%</p>
                <p className="text-sm text-muted-foreground">Tasa de Ocupación</p>
                <p className="text-xs text-muted-foreground mt-3">21/24 plazas</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Active Vacancies */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Vacantes Activas</CardTitle>
                      <CardDescription>Puestos disponibles para servicio social</CardDescription>
                    </div>
                    <Button variant="outline" size="sm">Ver Todas</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { title: 'Desarrollador Frontend React', applicants: 8, slots: 3, area: 'Desarrollo' },
                      { title: 'Analista de Datos', applicants: 5, slots: 2, area: 'Análisis' },
                      { title: 'Diseñador UI/UX', applicants: 12, slots: 2, area: 'Diseño' },
                      { title: 'Soporte Técnico', applicants: 3, slots: 4, area: 'Soporte' },
                    ].map((vacancy, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/5 transition-colors">
                        <div className="flex-1">
                          <h4 className="font-medium mb-1">{vacancy.title}</h4>
                          <div className="flex gap-3 text-sm text-muted-foreground">
                            <span>{vacancy.area}</span>
                            <span>•</span>
                            <span>{vacancy.applicants} solicitudes</span>
                            <span>•</span>
                            <span>{vacancy.slots} lugares</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Applications */}
              <Card>
                <CardHeader>
                  <CardTitle>Solicitudes Recientes</CardTitle>
                  <CardDescription>Estudiantes interesados en tus vacantes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: 'Ana Martínez', career: 'Ing. Sistemas', vacancy: 'Desarrollador Frontend', status: 'pending' },
                      { name: 'Carlos López', career: 'Ing. Datos', vacancy: 'Analista de Datos', status: 'pending' },
                      { name: 'María García', career: 'Diseño Gráfico', vacancy: 'Diseñador UI/UX', status: 'pending' },
                    ].map((app, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="font-medium text-primary">{app.name[0]}</span>
                          </div>
                          <div>
                            <p className="font-medium">{app.name}</p>
                            <p className="text-sm text-muted-foreground">{app.career} • {app.vacancy}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">Rechazar</Button>
                          <Button size="sm">Aceptar</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Company Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Información de Empresa</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Razón Social</p>
                      <p className="font-medium">TechCorp S.A. de C.V.</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">RFC</p>
                      <p className="font-medium">TEC123456ABC</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Sector</p>
                      <p className="font-medium">Tecnología</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Estado del Convenio</p>
                      <Badge variant="success">Activo</Badge>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Vigencia</p>
                      <p className="font-medium">Hasta 31 Dic 2026</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Estadísticas del Mes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Nuevas Solicitudes</span>
                        <span className="font-medium">15</span>
                      </div>
                      <div className="bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Horas Registradas</span>
                        <span className="font-medium">1,920</span>
                      </div>
                      <div className="bg-muted rounded-full h-2">
                        <div className="bg-secondary h-2 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Tasa de Retención</span>
                        <span className="font-medium">95%</span>
                      </div>
                      <div className="bg-muted rounded-full h-2">
                        <div className="bg-accent h-2 rounded-full" style={{ width: '95%' }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Acciones Rápidas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Plus className="w-4 h-4 mr-2" />
                    Publicar Vacante
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="w-4 h-4 mr-2" />
                    Ver Alumnos
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => onNavigate('estadisticas-empresa')}>
                    <Briefcase className="w-4 h-4 mr-2" />
                    Ver Estadísticas
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => onNavigate('qr-validacion-empresa')}>
                    <UserCheck className="w-4 h-4 mr-2" />
                    Validar QR de Alumno
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
