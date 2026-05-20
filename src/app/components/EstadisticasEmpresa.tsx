import { BarChart3, TrendingUp, Users, Briefcase, CheckCircle2, Clock, Award } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import Sidebar from "./Sidebar";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function EstadisticasEmpresa({ onNavigate }: { onNavigate: (view: string) => void }) {
  const postulacionesMensuales = [
    { mes: 'Ene', postulaciones: 12 },
    { mes: 'Feb', postulaciones: 18 },
    { mes: 'Mar', postulaciones: 25 },
    { mes: 'Abr', postulaciones: 32 },
    { mes: 'May', postulaciones: 28 },
  ];

  const estadoVacantes = [
    { name: 'Activas', value: 8, color: '#819A91' },
    { name: 'Llenas', value: 4, color: '#A7C1A8' },
  ];

  const horasPorArea = [
    { area: 'Desarrollo', horas: 3840 },
    { area: 'Diseño', horas: 1920 },
    { area: 'Análisis', horas: 2400 },
    { area: 'Soporte', horas: 1440 },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar userType="empresa" onNavigate={onNavigate} currentView="estadisticas-empresa" />

      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Estadísticas y Análisis</h1>
            <p className="text-muted-foreground">Métricas y rendimiento de la empresa</p>
          </div>

          {/* Main KPIs */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="border-l-4 border-l-primary">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-3xl font-bold mb-1">28</p>
                <p className="text-sm text-muted-foreground">Postulaciones este Mes</p>
                <p className="text-xs text-green-600 mt-2">+12% vs mes anterior</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-secondary">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-secondary" />
                  </div>
                </div>
                <p className="text-3xl font-bold mb-1">8</p>
                <p className="text-sm text-muted-foreground">Vacantes Activas</p>
                <p className="text-xs text-muted-foreground mt-2">4 con cupo disponible</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-accent">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-accent" />
                  </div>
                </div>
                <p className="text-3xl font-bold mb-1">24</p>
                <p className="text-sm text-muted-foreground">Alumnos Activos</p>
                <p className="text-xs text-blue-600 mt-2">1 completó recientemente</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-600">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                    <Award className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <p className="text-3xl font-bold mb-1">9.1</p>
                <p className="text-sm text-muted-foreground">Promedio Alumnos</p>
                <p className="text-xs text-muted-foreground mt-2">Calificación general</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row */}
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Postulaciones Mensuales</CardTitle>
                <CardDescription>Tendencia de solicitudes recibidas</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={postulacionesMensuales}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#D1D8BE" />
                    <XAxis dataKey="mes" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="postulaciones"
                      stroke="#819A91"
                      strokeWidth={2}
                      name="Postulaciones"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Estado de Vacantes</CardTitle>
                <CardDescription>Distribución de oportunidades</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={estadoVacantes}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {estadoVacantes.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Hours Chart */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Horas Registradas por Área</CardTitle>
              <CardDescription>Distribución de actividades</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={horasPorArea}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#D1D8BE" />
                  <XAxis dataKey="area" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="horas" fill="#819A91" name="Horas" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Summary Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Horas Totales
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-primary mb-2">9,600</p>
                <p className="text-sm text-muted-foreground mb-4">Horas acumuladas</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Este mes:</span>
                    <span className="font-medium">1,920 hrs</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Promedio diario:</span>
                    <span className="font-medium">64 hrs</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Tasa de Retención
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-secondary mb-2">95%</p>
                <p className="text-sm text-muted-foreground mb-4">Alumnos que completan</p>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-secondary h-2 rounded-full" style={{ width: '95%' }}></div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">23 de 24 alumnos</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Eficiencia
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-accent mb-2">89%</p>
                <p className="text-sm text-muted-foreground mb-4">Ocupación de cupos</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Cupos totales:</span>
                    <span className="font-medium">27</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ocupados:</span>
                    <span className="font-medium">24</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
