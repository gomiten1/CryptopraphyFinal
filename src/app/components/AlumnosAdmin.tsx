import { Users, Search, Filter, Download, Eye, Edit, CheckCircle2, Clock, Building2, Award, Mail } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Sidebar from "./Sidebar";

export default function AlumnosAdmin({ onNavigate }: { onNavigate: (view: string) => void }) {
  const alumnos = [
    { id: 1, name: 'Juan Pérez', matricula: 'A2021001234', career: 'Ing. Sistemas', company: 'TechCorp', hours: 480, status: 'completed', avg: 9.2, email: 'juan.perez@uni.edu' },
    { id: 2, name: 'Ana Martínez', matricula: 'A2021001235', career: 'Ing. Datos', company: 'DataSolutions', hours: 320, status: 'active', avg: 9.5, email: 'ana.martinez@uni.edu' },
    { id: 3, name: 'Carlos López', matricula: 'A2021001236', career: 'Ing. Software', company: 'CloudServices', hours: 280, status: 'active', avg: 8.8, email: 'carlos.lopez@uni.edu' },
    { id: 4, name: 'María García', matricula: 'A2021001237', career: 'Diseño Digital', company: 'DesignStudio', hours: 150, status: 'active', avg: 9.0, email: 'maria.garcia@uni.edu' },
    { id: 5, name: 'Roberto Sánchez', matricula: 'A2021001238', career: 'Ing. Sistemas', company: null, hours: 0, status: 'pending', avg: 8.9, email: 'roberto.sanchez@uni.edu' },
    { id: 6, name: 'Laura Fernández', matricula: 'A2021001239', career: 'Ing. Datos', company: 'SecureNet', hours: 420, status: 'active', avg: 9.3, email: 'laura.fernandez@uni.edu' },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="success">Completado</Badge>;
      case 'active':
        return <Badge variant="default">Activo</Badge>;
      case 'pending':
        return <Badge variant="warning">Pendiente</Badge>;
      default:
        return <Badge variant="outline">Sin Asignar</Badge>;
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar userType="admin" onNavigate={onNavigate} currentView="alumnos-admin" />

      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Gestión de Alumnos</h1>
              <p className="text-muted-foreground">Administración completa de estudiantes</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filtros Avanzados
              </Button>
              <Button>
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
            </div>
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
                <p className="text-2xl font-bold mb-1">{alumnos.length}</p>
                <p className="text-sm text-muted-foreground">Total Alumnos</p>
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
                  {alumnos.filter(a => a.status === 'completed').length}
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
                <p className="text-2xl font-bold mb-1">
                  {alumnos.filter(a => a.status === 'active').length}
                </p>
                <p className="text-sm text-muted-foreground">En Proceso</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                    <Award className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <p className="text-2xl font-bold mb-1">
                  {(alumnos.reduce((sum, a) => sum + a.avg, 0) / alumnos.length).toFixed(1)}
                </p>
                <p className="text-sm text-muted-foreground">Promedio General</p>
              </CardContent>
            </Card>
          </div>

          {/* Search */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input className="pl-10" placeholder="Buscar por nombre, matrícula, carrera o empresa..." />
              </div>
            </CardContent>
          </Card>

          {/* Students Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Todos los Alumnos
              </CardTitle>
              <CardDescription>Lista completa del sistema universitario</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Alumno</th>
                      <th className="text-left py-3 px-4 font-medium">Matrícula</th>
                      <th className="text-left py-3 px-4 font-medium">Carrera</th>
                      <th className="text-left py-3 px-4 font-medium">Empresa</th>
                      <th className="text-left py-3 px-4 font-medium">Horas</th>
                      <th className="text-left py-3 px-4 font-medium">Promedio</th>
                      <th className="text-left py-3 px-4 font-medium">Estado</th>
                      <th className="text-left py-3 px-4 font-medium">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {alumnos.map((alumno) => (
                      <tr key={alumno.id} className="border-b hover:bg-accent/5">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <span className="font-medium text-primary">{alumno.name[0]}</span>
                            </div>
                            <div>
                              <p className="font-medium">{alumno.name}</p>
                              <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <Mail className="w-3 h-3" />
                                {alumno.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 font-mono text-sm">{alumno.matricula}</td>
                        <td className="py-3 px-4 text-sm">{alumno.career}</td>
                        <td className="py-3 px-4">
                          {alumno.company ? (
                            <div className="flex items-center gap-2">
                              <Building2 className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm">{alumno.company}</span>
                            </div>
                          ) : (
                            <span className="text-sm text-muted-foreground">Sin asignar</span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium text-sm">{alumno.hours} / 480</p>
                            <div className="w-24 bg-muted rounded-full h-1.5 mt-1">
                              <div
                                className="bg-primary h-1.5 rounded-full"
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
                        <td className="py-3 px-4">{getStatusBadge(alumno.status)}</td>
                        <td className="py-3 px-4">
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-6">
                <p className="text-sm text-muted-foreground">
                  Mostrando {alumnos.length} de {alumnos.length} alumnos
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled>Anterior</Button>
                  <Button variant="outline" size="sm">Siguiente</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
