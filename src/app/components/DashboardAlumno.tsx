import { Clock, Building2, FileCheck, QrCode, Download, CheckCircle2, AlertCircle, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import Sidebar from "./Sidebar";

export default function DashboardAlumno({ onNavigate }: { onNavigate: (view: string) => void }) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar userType="alumno" onNavigate={onNavigate} currentView="dashboard-alumno" />

      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Mi Dashboard</h1>
            <p className="text-muted-foreground">Resumen general de tu servicio social</p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <Badge variant="secondary">Sin datos</Badge>
                </div>
                <p className="text-2xl font-bold mb-1">-- hrs</p>
                <p className="text-sm text-muted-foreground">Horas registradas</p>
                <div className="mt-4 bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Sin avance registrado todavía</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-secondary" />
                  </div>
                </div>
                <p className="text-2xl font-bold mb-1">No asignada</p>
                <p className="text-sm text-muted-foreground">Empresa receptora</p>
                <p className="text-xs text-muted-foreground mt-4">Pendiente de vinculación</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <FileCheck className="w-6 h-6 text-accent" />
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-muted-foreground" />
                </div>
                <p className="text-2xl font-bold mb-1">Pendiente</p>
                <p className="text-sm text-muted-foreground">Estado del Contrato</p>
                <p className="text-xs text-muted-foreground mt-4">Sin contrato registrado todavía</p>
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
                <p className="text-sm text-muted-foreground">Vacantes disponibles</p>
                <Button variant="ghost" size="sm" className="mt-2 p-0 h-auto" onClick={() => onNavigate('vacantes-alumno')}>
                  Ver todas →
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Profile Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Información del Alumno</CardTitle>
                  <CardDescription>Datos personales y académicos</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Matrícula</p>
                      <p className="font-medium">No registrada</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Carrera</p>
                      <p className="font-medium">No registrada</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Semestre</p>
                      <p className="font-medium">No registrado</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Promedio</p>
                      <p className="font-medium">No registrado</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Fecha de Inicio</p>
                      <p className="font-medium">No registrada</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Fecha de Fin</p>
                      <p className="font-medium">No registrada</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Activity Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle>Actividad Reciente</CardTitle>
                  <CardDescription>Historial de eventos y acciones</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
                    Aún no hay actividad registrada.
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* QR Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <QrCode className="w-5 h-5" />
                    QR de Identificación
                  </CardTitle>
                  <CardDescription>Código seguro verificable</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-square bg-white rounded-lg p-4 mb-4">
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                      <QrCode className="w-32 h-32 text-primary" />
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Hash:</span>
                      <span className="font-mono text-xs">No generado</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Válido hasta:</span>
                      <span>Pendiente</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4" onClick={() => onNavigate('qr-alumno')}>
                    Ver Detalles
                  </Button>
                </CardContent>
              </Card>

              {/* Contract Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileCheck className="w-5 h-5" />
                    Contrato Digital
                  </CardTitle>
                  <CardDescription>Documento firmado digitalmente</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-muted/40 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 className="w-5 h-5 text-muted-foreground" />
                        <span className="font-medium">Pendiente</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Aún no hay contrato firmado.
                      </p>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Firmado:</span>
                        <span>Pendiente</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Hash SHA-256:</span>
                        <span className="font-mono text-xs">No generado</span>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full" onClick={() => onNavigate('contrato')}>
                      <Download className="w-4 h-4 mr-2" />
                      Descargar PDF
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Alert */}
              <Card className="border-yellow-200 bg-yellow-50">
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-yellow-900 mb-1">Recordatorio</p>
                      <p className="text-sm text-yellow-700">
                        Registra tus horas semanales antes del viernes.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
