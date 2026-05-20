import { Users, Building2, Briefcase, FileCheck, Shield, Activity, TrendingUp, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import Sidebar from "./Sidebar";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function DashboardAdmin({ onNavigate }: { onNavigate: (view: string) => void }) {
  const monthlyData = [
    { mes: 'Ene', alumnos: 320, empresas: 45 },
    { mes: 'Feb', alumnos: 380, empresas: 52 },
    { mes: 'Mar', alumnos: 420, empresas: 58 },
    { mes: 'Abr', alumnos: 510, empresas: 67 },
    { mes: 'May', alumnos: 580, empresas: 75 },
  ];

  const statusData = [
    { name: 'Activos', value: 420, color: '#819A91' },
    { name: 'Completados', value: 280, color: '#A7C1A8' },
    { name: 'Pendientes', value: 120, color: '#D1D8BE' },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar userType="admin" onNavigate={onNavigate} currentView="dashboard-admin" />

      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Panel de Administración</h1>
            <p className="text-muted-foreground">Universidad Nacional - Sistema de Servicio Social</p>
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
                <p className="text-3xl font-bold mb-1">2,547</p>
                <p className="text-sm text-muted-foreground">Alumnos Totales</p>
                <p className="text-xs text-green-600 mt-2">+12% vs mes anterior</p>
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
                <p className="text-3xl font-bold mb-1">156</p>
                <p className="text-sm text-muted-foreground">Empresas Activas</p>
                <p className="text-xs text-green-600 mt-2">+8% vs mes anterior</p>
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
                <p className="text-3xl font-bold mb-1">89</p>
                <p className="text-sm text-muted-foreground">Vacantes Activas</p>
                <p className="text-xs text-blue-600 mt-2">67 en proceso</p>
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
                <p className="text-3xl font-bold mb-1">1,823</p>
                <p className="text-sm text-muted-foreground">Contratos Firmados</p>
                <p className="text-xs text-green-600 mt-2">100% verificados</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row */}
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Tendencia de Crecimiento</CardTitle>
                <CardDescription>Alumnos y empresas por mes</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#D1D8BE" />
                    <XAxis dataKey="mes" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="alumnos" fill="#819A91" name="Alumnos" />
                    <Bar dataKey="empresas" fill="#A7C1A8" name="Empresas" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Estado de Servicios Sociales</CardTitle>
                <CardDescription>Distribución por estado</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
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
                  {[
                    { name: 'Juan Pérez', id: 'A2021001234', career: 'Ing. Sistemas', status: 'Activo' },
                    { name: 'Ana Martínez', id: 'A2021001235', career: 'Ing. Datos', status: 'Activo' },
                    { name: 'Carlos López', id: 'A2021001236', career: 'Ing. Software', status: 'Pendiente' },
                    { name: 'María García', id: 'A2021001237', career: 'Diseño', status: 'Activo' },
                  ].map((student, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/5 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="font-medium text-primary">{student.name[0]}</span>
                        </div>
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-xs text-muted-foreground">{student.id} • {student.career}</p>
                        </div>
                      </div>
                      <Badge variant={student.status === 'Activo' ? 'success' : 'warning'}>
                        {student.status}
                      </Badge>
                    </div>
                  ))}
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
                  {[
                    { name: 'TechCorp', sector: 'Tecnología', students: 24, status: 'Verificado' },
                    { name: 'DataSolutions', sector: 'Análisis', students: 15, status: 'Verificado' },
                    { name: 'DesignStudio', sector: 'Diseño', students: 8, status: 'Pendiente' },
                    { name: 'CloudServices', sector: 'Cloud', students: 12, status: 'Verificado' },
                  ].map((company, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/5 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                          <Building2 className="w-5 h-5 text-secondary" />
                        </div>
                        <div>
                          <p className="font-medium">{company.name}</p>
                          <p className="text-xs text-muted-foreground">{company.sector} • {company.students} alumnos</p>
                        </div>
                      </div>
                      <Badge variant={company.status === 'Verificado' ? 'success' : 'warning'}>
                        {company.status}
                      </Badge>
                    </div>
                  ))}
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
                  {[
                    { event: 'Contrato digital verificado', user: 'Juan Pérez', time: 'Hace 5 min', type: 'success' },
                    { event: 'Nueva empresa registrada', user: 'TechCorp', time: 'Hace 15 min', type: 'info' },
                    { event: 'QR verificado exitosamente', user: 'Ana Martínez', time: 'Hace 1 hora', type: 'success' },
                    { event: 'Intento de acceso fallido', user: 'Unknown', time: 'Hace 2 horas', type: 'warning' },
                    { event: 'Firma digital aplicada', user: 'Carlos López', time: 'Hace 3 horas', type: 'success' },
                  ].map((log, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-3 border rounded-lg">
                      <div className={`w-2 h-2 rounded-full ${
                        log.type === 'success' ? 'bg-green-600' :
                        log.type === 'warning' ? 'bg-yellow-600' : 'bg-blue-600'
                      }`}></div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{log.event}</p>
                        <p className="text-xs text-muted-foreground">{log.user} • {log.time}</p>
                      </div>
                    </div>
                  ))}
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
                      <Badge variant="success">✓ Activo</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Firmas Válidas</span>
                      <Badge variant="success">100%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">QR Verificados</span>
                      <Badge variant="success">2,547</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Último Backup</span>
                      <span className="text-sm text-muted-foreground">Hace 2h</span>
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
                        Requieren revisión manual
                      </p>
                      <Button size="sm" variant="outline" className="bg-white">
                        Revisar Ahora
                      </Button>
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
