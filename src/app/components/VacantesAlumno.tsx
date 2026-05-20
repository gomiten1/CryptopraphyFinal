import { Briefcase, Search, Filter, MapPin, Clock, Building2, Heart, Send, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Sidebar from "./Sidebar";
import ModalPostulacion from "./modals/ModalPostulacion";
import { useState } from "react";

export default function VacantesAlumno({ onNavigate }: { onNavigate: (view: string) => void }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVacancy, setSelectedVacancy] = useState<any>(null);
  const vacantesGuardadas = [
    { id: 1, title: 'Analista de Seguridad', company: 'CyberSec Corp', area: 'Seguridad', hours: 480, location: 'Ciudad de México', saved: true, applied: false },
    { id: 2, title: 'Desarrollador Backend', company: 'CloudTech', area: 'Desarrollo', hours: 480, location: 'Guadalajara', saved: true, applied: false },
  ];

  const vacantesPostuladas = [
    { id: 3, title: 'Desarrollador Frontend React', company: 'TechCorp', area: 'Desarrollo', hours: 480, location: 'Monterrey', saved: false, applied: true, status: 'approved' },
    { id: 4, title: 'Especialista en Criptografía', company: 'SecureData', area: 'Seguridad', hours: 480, location: 'Ciudad de México', saved: false, applied: true, status: 'pending' },
    { id: 5, title: 'Ingeniero DevOps', company: 'CloudServices', area: 'Infraestructura', hours: 480, location: 'Querétaro', saved: false, applied: true, status: 'rejected' },
  ];

  const vacantesDisponibles = [
    { id: 6, title: 'Desarrollador Full Stack', company: 'WebSolutions', area: 'Desarrollo', hours: 480, location: 'Ciudad de México', saved: false, applied: false },
    { id: 7, title: 'Analista de Datos', company: 'DataCorp', area: 'Análisis', hours: 480, location: 'Guadalajara', saved: false, applied: false },
    { id: 8, title: 'Diseñador UI/UX', company: 'DesignStudio', area: 'Diseño', hours: 480, location: 'Monterrey', saved: false, applied: false },
    { id: 9, title: 'Auditor de Seguridad', company: 'SecureNet', area: 'Seguridad', hours: 480, location: 'Ciudad de México', saved: false, applied: false },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge variant="success" className="gap-1"><CheckCircle2 className="w-3 h-3" />Aprobada</Badge>;
      case 'pending':
        return <Badge variant="warning" className="gap-1"><AlertCircle className="w-3 h-3" />Pendiente</Badge>;
      case 'rejected':
        return <Badge variant="destructive" className="gap-1"><XCircle className="w-3 h-3" />Rechazada</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar userType="alumno" onNavigate={onNavigate} currentView="vacantes-alumno" />

      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Vacantes</h1>
            <p className="text-muted-foreground">Explora y postúlate a oportunidades de servicio social</p>
          </div>

          {/* Search and Filters */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input className="pl-10" placeholder="Buscar vacantes por título, empresa o área..." />
                </div>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtros
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Heart className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <p className="text-2xl font-bold mb-1">{vacantesGuardadas.length}</p>
                <p className="text-sm text-muted-foreground">Vacantes Guardadas</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                    <Send className="w-6 h-6 text-secondary" />
                  </div>
                </div>
                <p className="text-2xl font-bold mb-1">{vacantesPostuladas.length}</p>
                <p className="text-sm text-muted-foreground">Postulaciones Enviadas</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-accent" />
                  </div>
                </div>
                <p className="text-2xl font-bold mb-1">{vacantesDisponibles.length}</p>
                <p className="text-sm text-muted-foreground">Nuevas Vacantes</p>
              </CardContent>
            </Card>
          </div>

          {/* Postulated Vacancies */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="w-5 h-5" />
                Mis Postulaciones
              </CardTitle>
              <CardDescription>Seguimiento de solicitudes enviadas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vacantesPostuladas.map((vacancy) => (
                  <div key={vacancy.id} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-accent/5 transition-colors">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold">{vacancy.title}</h4>
                          <p className="text-sm text-muted-foreground">{vacancy.company}</p>
                        </div>
                        {getStatusBadge(vacancy.status)}
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          {vacancy.area}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {vacancy.hours} hrs
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {vacancy.location}
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Ver Detalles</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Saved Vacancies */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Vacantes Guardadas
              </CardTitle>
              <CardDescription>Oportunidades que te interesan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {vacantesGuardadas.map((vacancy) => (
                  <div key={vacancy.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{vacancy.title}</h4>
                        <p className="text-sm text-muted-foreground">{vacancy.company}</p>
                      </div>
                      <Button size="icon" variant="ghost" className="text-red-500 hover:text-red-600">
                        <Heart className="w-4 h-4 fill-current" />
                      </Button>
                    </div>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Briefcase className="w-4 h-4 text-muted-foreground" />
                        <span>{vacancy.area}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>{vacancy.hours} horas</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span>{vacancy.location}</span>
                      </div>
                    </div>
                    <Button
                      className="w-full"
                      onClick={() => {
                        setSelectedVacancy(vacancy);
                        setModalOpen(true);
                      }}
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Postularme
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Available Vacancies */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                Vacantes Disponibles
              </CardTitle>
              <CardDescription>Nuevas oportunidades que coinciden con tu perfil</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {vacantesDisponibles.map((vacancy) => (
                  <div key={vacancy.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{vacancy.title}</h4>
                        <p className="text-sm text-muted-foreground">{vacancy.company}</p>
                      </div>
                      <Button size="icon" variant="ghost">
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Briefcase className="w-4 h-4 text-muted-foreground" />
                        <span>{vacancy.area}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>{vacancy.hours} horas</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span>{vacancy.location}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        className="flex-1"
                        onClick={() => {
                          setSelectedVacancy(vacancy);
                          setModalOpen(true);
                        }}
                      >
                        Postularme
                      </Button>
                      <Button variant="outline" size="icon">
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Modal de Postulación */}
      {selectedVacancy && (
        <ModalPostulacion
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
