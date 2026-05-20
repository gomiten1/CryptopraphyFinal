import { Users, Search, Filter, Download, CheckCircle2, XCircle, Clock, Award, Mail, Phone } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Sidebar from "./Sidebar";

export default function AlumnosEmpresa({ onNavigate }: { onNavigate: (view: string) => void }) {
  const alumnosInscritos = [
    { id: 1, name: 'Juan Pérez', matricula: 'A2021001234', career: 'Ing. Sistemas', hours: 480, status: 'completed', email: 'juan.perez@uni.edu', phone: '+52 55 1234 5678', avg: 9.2 },
    { id: 2, name: 'Ana Martínez', matricula: 'A2021001235', career: 'Ing. Datos', hours: 320, status: 'active', email: 'ana.martinez@uni.edu', phone: '+52 55 2345 6789', avg: 9.5 },
    { id: 3, name: 'Carlos López', matricula: 'A2021001236', career: 'Ing. Software', hours: 280, status: 'active', email: 'carlos.lopez@uni.edu', phone: '+52 55 3456 7890', avg: 8.8 },
    { id: 4, name: 'María García', matricula: 'A2021001237', career: 'Diseño Digital', hours: 150, status: 'active', email: 'maria.garcia@uni.edu', phone: '+52 55 4567 8901', avg: 9.0 },
  ];

  const solicitudesPendientes = [
    { id: 5, name: 'Roberto Sánchez', matricula: 'A2021001238', career: 'Ing. Sistemas', vacancy: 'Desarrollador Backend', email: 'roberto.sanchez@uni.edu', avg: 8.9 },
    { id: 6, name: 'Laura Fernández', matricula: 'A2021001239', career: 'Ing. Datos', vacancy: 'Analista de Datos', email: 'laura.fernandez@uni.edu', avg: 9.3 },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar userType="empresa" onNavigate={onNavigate} currentView="alumnos-empresa" />

      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Gestión de Alumnos</h1>
              <p className="text-muted-foreground">Administra estudiantes y solicitudes</p>
            </div>
            <Button>
              <Download className="w-4 h-4 mr-2" />
              Exportar Datos
            </Button>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <p className="text-2xl font-bold mb-1">{alumnosInscritos.length}</p>
                <p className="text-sm text-muted-foreground">Alumnos Activos</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-secondary" />
                  </div>
                </div>
                <p className="text-2xl font-bold mb-1">
                  {alumnosInscritos.filter(a => a.status === 'completed').length}
                </p>
                <p className="text-sm text-muted-foreground">Completados</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-accent" />
                  </div>
                </div>
                <p className="text-2xl font-bold mb-1">{solicitudesPendientes.length}</p>
                <p className="text-sm text-muted-foreground">Pendientes Aprobación</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                    <Award className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <p className="text-2xl font-bold mb-1">9.1</p>
                <p className="text-sm text-muted-foreground">Promedio General</p>
              </CardContent>
            </Card>
          </div>

          {/* Pending Requests */}
          {solicitudesPendientes.length > 0 && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Solicitudes Pendientes
                </CardTitle>
                <CardDescription>Requieren aprobación para iniciar servicio social</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {solicitudesPendientes.map((alumno) => (
                    <div key={alumno.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="font-medium text-primary">{alumno.name[0]}</span>
                        </div>
                        <div>
                          <h4 className="font-semibold">{alumno.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {alumno.matricula} • {alumno.career}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Vacante: {alumno.vacancy}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right mr-4">
                          <p className="text-sm text-muted-foreground">Promedio</p>
                          <p className="font-semibold">{alumno.avg}</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <XCircle className="w-4 h-4 mr-2" />
                          Rechazar
                        </Button>
                        <Button size="sm">
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          Aprobar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Search and Filters */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input className="pl-10" placeholder="Buscar por nombre, matrícula o carrera..." />
                </div>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtros
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Students Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Alumnos Inscritos
              </CardTitle>
              <CardDescription>Lista completa de estudiantes realizando servicio social</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Alumno</th>
                      <th className="text-left py-3 px-4 font-medium">Matrícula</th>
                      <th className="text-left py-3 px-4 font-medium">Carrera</th>
                      <th className="text-left py-3 px-4 font-medium">Contacto</th>
                      <th className="text-left py-3 px-4 font-medium">Horas</th>
                      <th className="text-left py-3 px-4 font-medium">Promedio</th>
                      <th className="text-left py-3 px-4 font-medium">Estado</th>
                      <th className="text-left py-3 px-4 font-medium">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {alumnosInscritos.map((alumno) => (
                      <tr key={alumno.id} className="border-b hover:bg-accent/5">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <span className="font-medium text-primary">{alumno.name[0]}</span>
                            </div>
                            <div>
                              <p className="font-medium">{alumno.name}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 font-mono text-sm">{alumno.matricula}</td>
                        <td className="py-3 px-4 text-sm">{alumno.career}</td>
                        <td className="py-3 px-4">
                          <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              <span>{alumno.email}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              <span>{alumno.phone}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium">{alumno.hours} / 480</p>
                            <div className="w-24 bg-muted rounded-full h-2 mt-1">
                              <div
                                className="bg-primary h-2 rounded-full"
                                style={{ width: `${(alumno.hours / 480) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1">
                            <Award className="w-4 h-4 text-yellow-600" />
                            <span className="font-medium">{alumno.avg}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          {alumno.status === 'completed' ? (
                            <Badge variant="success">Completado</Badge>
                          ) : (
                            <Badge variant="default">Activo</Badge>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <Button variant="ghost" size="sm">
                            Ver Perfil
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
