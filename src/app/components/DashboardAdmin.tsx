import { Users, Building2, Briefcase, FileCheck, Shield, Activity, TrendingUp, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import Sidebar from "./Sidebar";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function DashboardAdmin({ onNavigate }: { onNavigate: (view: string) => void }) {
  const monthlyData: { mes: string; alumnos: number; empresas: number }[] = [];

  const statusData: { name: string; value: number; color: string }[] = [];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar userType="admin" onNavigate={onNavigate} currentView="dashboard-admin" />

      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Panel de Administración</h1>
            <p className="text-muted-foreground">Resumen general del sistema</p>
          </div>

          {/* KPI Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="border-l-4 border-l-primary">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-3xl font-bold mb-1">--</p>
                <p className="text-sm text-muted-foreground">Alumnos totales</p>
                <p className="text-xs text-muted-foreground mt-2">Sin datos cargados</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-secondary">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-secondary" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-3xl font-bold mb-1">--</p>
                <p className="text-sm text-muted-foreground">Empresas activas</p>
                <p className="text-xs text-muted-foreground mt-2">Sin datos cargados</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-accent">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-accent" />
                  </div>
                  <Activity className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-3xl font-bold mb-1">--</p>
                <p className="text-sm text-muted-foreground">Vacantes activas</p>
                <p className="text-xs text-muted-foreground mt-2">Sin datos cargados</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-600">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                    <FileCheck className="w-6 h-6 text-green-600" />
                  </div>
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-3xl font-bold mb-1">--</p>
                <p className="text-sm text-muted-foreground">Contratos firmados</p>
                <p className="text-xs text-muted-foreground mt-2">Sin datos cargados</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row */}
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Tendencia de Crecimiento</CardTitle>
                <CardDescription>Sin datos históricos cargados</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border border-dashed p-6 text-sm text-muted-foreground">
                  No hay serie temporal disponible.
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Estado de Servicios Sociales</CardTitle>
                <CardDescription>Sin distribución cargada</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border border-dashed p-6 text-sm text-muted-foreground">
                  No hay distribución para mostrar.
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tables Row */}
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            {/* Recent Students */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Alumnos Recientes</CardTitle>
                    <CardDescription>Últimos registros</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => onNavigate('alumnos-admin')}>
                    Ver Todos
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
                    No hay alumnos recientes cargados.
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Companies */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Empresas Recientes</CardTitle>
                    <CardDescription>Últimos convenios</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => onNavigate('empresas-admin')}>
                    Ver Todas
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
                    No hay empresas recientes cargadas.
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Security & Audit Section */}
          <div className="grid lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Registro de Auditoría
                </CardTitle>
                <CardDescription>Eventos de seguridad recientes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
                    No hay eventos de auditoría recientes.
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4" onClick={() => onNavigate('auditoria')}>
                  Ver Registro Completo
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-6">
              {/* Security Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Estado de Seguridad
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Cifrado Activo</span>
                      <Badge variant="secondary">Sin datos</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Firmas Válidas</span>
                      <Badge variant="secondary">--</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">QR Verificados</span>
                      <Badge variant="secondary">--</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Último Backup</span>
                      <span className="text-sm text-muted-foreground">No registrado</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Alerts */}
              <Card className="border-yellow-200 bg-yellow-50">
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-yellow-900 mb-1">7 Solicitudes Pendientes</p>
                      <p className="text-sm text-yellow-700 mb-3">
                        No hay solicitudes cargadas.
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
