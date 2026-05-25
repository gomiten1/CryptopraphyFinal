import { Briefcase, Users, UserCheck, TrendingUp, Plus } from "lucide-react";
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
              <p className="text-muted-foreground">Resumen general de la empresa vinculada</p>
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
                <p className="text-2xl font-bold mb-1">--</p>
                <p className="text-sm text-muted-foreground">Vacantes totales</p>
                <div className="flex gap-2 mt-3">
                  <Badge variant="secondary">Sin datos</Badge>
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
                <p className="text-2xl font-bold mb-1">--</p>
                <p className="text-sm text-muted-foreground">Alumnos inscritos</p>
                <p className="text-xs text-muted-foreground mt-3">Sin registros cargados</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <UserCheck className="w-6 h-6 text-accent" />
                  </div>
                </div>
                <p className="text-2xl font-bold mb-1">--</p>
                <p className="text-sm text-muted-foreground">Solicitudes pendientes</p>
                <Button variant="ghost" size="sm" className="mt-2 p-0 h-auto text-primary" onClick={() => onNavigate('vacantes-empresa')}>
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
                <p className="text-2xl font-bold mb-1">--</p>
                <p className="text-sm text-muted-foreground">Tasa de ocupación</p>
                <p className="text-xs text-muted-foreground mt-3">Sin datos para calcular</p>
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
                    <Button variant="outline" size="sm" onClick={() => onNavigate('vacantes-empresa')}>Ver todas</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
                    Aún no hay vacantes activas cargadas.
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
                  <div className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
                    No hay solicitudes recientes para revisar.
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
                      <p className="font-medium">No registrada</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">RFC</p>
                      <p className="font-medium">No registrado</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Sector</p>
                      <p className="font-medium">No registrado</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Estado del Convenio</p>
                      <Badge variant="secondary">Pendiente</Badge>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Vigencia</p>
                      <p className="font-medium">No registrada</p>
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
                        <span className="font-medium">--</span>
                      </div>
                      <div className="bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '0%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Horas Registradas</span>
                        <span className="font-medium">--</span>
                      </div>
                      <div className="bg-muted rounded-full h-2">
                        <div className="bg-secondary h-2 rounded-full" style={{ width: '0%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Tasa de Retención</span>
                        <span className="font-medium">--</span>
                      </div>
                      <div className="bg-muted rounded-full h-2">
                        <div className="bg-accent h-2 rounded-full" style={{ width: '0%' }}></div>
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
                  <Button variant="outline" className="w-full justify-start" onClick={() => onNavigate('vacantes-empresa')}>
                    <Plus className="w-4 h-4 mr-2" />
                    Publicar Vacante
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => onNavigate('alumnos-empresa')}>
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
