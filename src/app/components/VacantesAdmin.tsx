import { Briefcase, Search, Filter, Download, Eye, Edit, CheckCircle2, XCircle, Building2, Users, Clock, MapPin, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Sidebar from "./Sidebar";
import ModalDetalleVacante from "./modals/ModalDetalleVacante";
import { useState } from "react";

export default function VacantesAdmin({ onNavigate }: { onNavigate: (view: string) => void }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVacancy, setSelectedVacancy] = useState<any>(null);
  const vacantes = [
    { id: 1, title: 'Desarrollador Frontend React', company: 'TechCorp', area: 'Desarrollo', applicants: 8, slots: 3, filled: 2, status: 'active', location: 'Monterrey', hours: 480 },
    { id: 2, title: 'Analista de Datos', company: 'DataSolutions', area: 'Análisis', applicants: 5, slots: 2, filled: 2, status: 'filled', location: 'CDMX', hours: 480 },
    { id: 3, title: 'Diseñador UI/UX', company: 'DesignStudio', area: 'Diseño', applicants: 12, slots: 2, filled: 1, status: 'active', location: 'Guadalajara', hours: 480 },
    { id: 4, title: 'Soporte Técnico', company: 'CloudServices', area: 'Soporte', applicants: 3, slots: 4, filled: 0, status: 'active', location: 'Querétaro', hours: 480 },
    { id: 5, title: 'Auditor de Seguridad', company: 'SecureNet', area: 'Seguridad', applicants: 7, slots: 2, filled: 1, status: 'active', location: 'CDMX', hours: 480 },
    { id: 6, title: 'Ingeniero DevOps', company: 'CloudServices', area: 'Infraestructura', applicants: 4, slots: 1, filled: 1, status: 'filled', location: 'Monterrey', hours: 480 },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar userType="admin" onNavigate={onNavigate} currentView="vacantes-admin" />

      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Gestión de Vacantes</h1>
              <p className="text-muted-foreground">Administración de todas las oportunidades del sistema</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
              <Button>
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-5 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <p className="text-2xl font-bold mb-1">{vacantes.length}</p>
                <p className="text-sm text-muted-foreground">Total Vacantes</p>
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
                  {vacantes.filter(v => v.status === 'active').length}
                </p>
                <p className="text-sm text-muted-foreground">Activas</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-accent" />
                  </div>
                </div>
                <p className="text-2xl font-bold mb-1">
                  {vacantes.reduce((sum, v) => sum + v.applicants, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Solicitudes</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <p className="text-2xl font-bold mb-1">
                  {vacantes.reduce((sum, v) => sum + v.filled, 0)}/
                  {vacantes.reduce((sum, v) => sum + v.slots, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Cupos Ocupados</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                    <XCircle className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <p className="text-2xl font-bold mb-1">
                  {vacantes.filter(v => v.status === 'filled').length}
                </p>
                <p className="text-sm text-muted-foreground">Cupo Lleno</p>
              </CardContent>
            </Card>
          </div>

          {/* Search */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input className="pl-10" placeholder="Buscar por título, empresa o área..." />
              </div>
            </CardContent>
          </Card>

          {/* Vacancies Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                Todas las Vacantes
              </CardTitle>
              <CardDescription>Lista completa de oportunidades en el sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Vacante</th>
                      <th className="text-left py-3 px-4 font-medium">Empresa</th>
                      <th className="text-left py-3 px-4 font-medium">Área</th>
                      <th className="text-left py-3 px-4 font-medium">Ubicación</th>
                      <th className="text-left py-3 px-4 font-medium">Solicitudes</th>
                      <th className="text-left py-3 px-4 font-medium">Cupos</th>
                      <th className="text-left py-3 px-4 font-medium">Ocupación</th>
                      <th className="text-left py-3 px-4 font-medium">Estado</th>
                      <th className="text-left py-3 px-4 font-medium">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vacantes.map((vacancy) => (
                      <tr key={vacancy.id} className="border-b hover:bg-accent/5">
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium">{vacancy.title}</p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {vacancy.hours} horas
                            </p>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">{vacancy.company}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant="outline">{vacancy.area}</Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <MapPin className="w-3 h-3" />
                            {vacancy.location}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4 text-muted-foreground" />
                            <span className="font-medium">{vacancy.applicants}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-medium">{vacancy.filled} / {vacancy.slots}</span>
                        </td>
                        <td className="py-3 px-4">
                          <div>
                            <p className="text-sm font-medium mb-1">
                              {Math.round((vacancy.filled / vacancy.slots) * 100)}%
                            </p>
                            <div className="w-24 bg-muted rounded-full h-1.5">
                              <div
                                className="bg-primary h-1.5 rounded-full"
                                style={{ width: `${(vacancy.filled / vacancy.slots) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          {vacancy.status === 'filled' ? (
                            <Badge variant="success">Llena</Badge>
                          ) : (
                            <Badge variant="default">Activa</Badge>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedVacancy(vacancy);
                                setModalOpen(true);
                              }}
                            >
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
                  Mostrando {vacantes.length} de {vacantes.length} vacantes
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

      {/* Modal de Detalle */}
      {selectedVacancy && (
        <ModalDetalleVacante
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setSelectedVacancy(null);
          }}
          vacancy={selectedVacancy}
        />
      )}
    </div>
  );
}
