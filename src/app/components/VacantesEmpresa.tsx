import { Briefcase, Plus, Users, Eye, BarChart3, Clock, MapPin, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import Sidebar from "./Sidebar";
import ModalNuevaVacante from "./modals/ModalNuevaVacante";
import ModalSolicitudes from "./modals/ModalSolicitudes";
import { useEffect, useState } from "react";
import supabase from "../lib/supabase";

type VacancyRow = {
  id: string;
  titulo: string;
  descripcion: string | null;
  cupo_total: number | null;
  cupo_disponible: number | null;
  empresa_id: string | null;
  creado_en: string | null;
  activo: boolean | null;
};

export default function VacantesEmpresa({ onNavigate }: { onNavigate: (view: string) => void }) {
  const [modalNuevaOpen, setModalNuevaOpen] = useState(false);
  const [modalSolicitudesOpen, setModalSolicitudesOpen] = useState(false);
  const [selectedVacancy, setSelectedVacancy] = useState<any>(null);
  const [vacancies, setVacancies] = useState<VacancyRow[]>([]);
  const [loadingVacancies, setLoadingVacancies] = useState(true);
  const [vacancyError, setVacancyError] = useState<string | null>(null);

  const loadVacancies = async () => {
    setLoadingVacancies(true);
    setVacancyError(null);

    const { data: sessionData } = await supabase.auth.getSession();
    const userId = sessionData.session?.user?.id;

    if (!userId) {
      setVacancyError('No hay sesión activa.');
      setVacancies([]);
      setLoadingVacancies(false);
      return;
    }

    const { data, error } = await supabase
      .from('vacantes')
      .select('id,titulo,descripcion,cupo_total,cupo_disponible,empresa_id,creado_en,activo')
      .eq('empresa_id', userId)
      .order('creado_en', { ascending: false });

    if (error) {
      setVacancyError(error.message);
      setVacancies([]);
    } else {
      setVacancies((data ?? []) as VacancyRow[]);
    }

    setLoadingVacancies(false);
  };

  useEffect(() => {
    loadVacancies();
  }, []);

  const vacantesActivas = vacancies.filter((vacancy) => vacancy.activo !== false);
  const vacantesCerradas = vacancies.filter((vacancy) => vacancy.activo === false);

  const totalApplicants = 0;
  const totalFilled = vacantesActivas.reduce((acc, vacancy) => acc + ((vacancy.cupo_total ?? 0) - (vacancy.cupo_disponible ?? 0)), 0);
  const totalSlots = vacantesActivas.reduce((acc, vacancy) => acc + (vacancy.cupo_total ?? 0), 0);
  const occupancy = totalSlots > 0 ? Math.round((totalFilled / totalSlots) * 100) : 0;

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar userType="empresa" onNavigate={onNavigate} currentView="vacantes-empresa" />

      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Mis Vacantes</h1>
              <p className="text-muted-foreground">Gestiona las oportunidades de servicio social</p>
            </div>
            <Button onClick={() => setModalNuevaOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Nueva Vacante
            </Button>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <p className="text-2xl font-bold mb-1">{vacantesActivas.length}</p>
                <p className="text-sm text-muted-foreground">Vacantes activas</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-secondary" />
                  </div>
                </div>
                <p className="text-2xl font-bold mb-1">{totalApplicants}</p>
                <p className="text-sm text-muted-foreground">Solicitudes totales</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-accent" />
                  </div>
                </div>
                <p className="text-2xl font-bold mb-1">
                  {totalFilled}/{totalSlots}
                </p>
                <p className="text-sm text-muted-foreground">Cupos ocupados</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <p className="text-2xl font-bold mb-1">{occupancy}%</p>
                <p className="text-sm text-muted-foreground">Tasa de ocupación</p>
              </CardContent>
            </Card>
          </div>

          {/* Active Vacancies */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5" />
                    Vacantes Activas
                  </CardTitle>
                  <CardDescription>Oportunidades abiertas a postulaciones</CardDescription>
                </div>
                <Button variant="outline" size="sm">Ver Estadísticas</Button>
              </div>
            </CardHeader>
            <CardContent>
              {loadingVacancies ? (
                <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
                  Cargando vacantes...
                </div>
              ) : vacancyError ? (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
                  {vacancyError}
                </div>
              ) : vacantesActivas.length === 0 ? (
                <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
                  No hay vacantes activas registradas.
                </div>
              ) : (
                <div className="space-y-4">
                {vacantesActivas.map((vacancy) => (
                  <div key={vacancy.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Briefcase className="w-6 h-6 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-1">{vacancy.titulo}</h3>
                            <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Briefcase className="w-4 h-4" />
                                {vacancy.descripcion?.split('\n\n')[0] || 'General'}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                Consultar con la empresa
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {vacancy.cupo_total ?? 0} cupos
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {vacancy.status === 'filled' ? (
                          <Badge variant="secondary">Cupo lleno</Badge>
                        ) : (
                          <Badge variant="default">Activa</Badge>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Solicitudes</p>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-primary" />
                          <span className="font-semibold">0 postulaciones</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Cupos</p>
                        <div className="flex items-center gap-2">
                          <BarChart3 className="w-4 h-4 text-secondary" />
                          <span className="font-semibold">{(vacancy.cupo_total ?? 0) - (vacancy.cupo_disponible ?? 0)} / {vacancy.cupo_total ?? 0} ocupados</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2 mt-2">
                          <div
                            className="bg-secondary h-2 rounded-full"
                            style={{ width: `${(vacancy.cupo_total ?? 0) > 0 ? (((vacancy.cupo_total ?? 0) - (vacancy.cupo_disponible ?? 0)) / (vacancy.cupo_total ?? 0)) * 100 : 0}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Ocupación</p>
                        <span className="text-2xl font-bold text-primary">
                          {vacancy.cupo_total ? Math.round((((vacancy.cupo_total ?? 0) - (vacancy.cupo_disponible ?? 0)) / vacancy.cupo_total) * 100) : 0}%
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2 flex-wrap">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedVacancy(vacancy);
                          setModalSolicitudesOpen(true);
                        }}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Ver solicitudes (0)
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => onNavigate('estadisticas-empresa')}>
                        <BarChart3 className="w-4 h-4 mr-2" />
                        Estadísticas
                      </Button>
                    </div>
                  </div>
                ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Closed Vacancies */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                Vacantes Cerradas
              </CardTitle>
              <CardDescription>Historial de oportunidades completadas</CardDescription>
            </CardHeader>
            <CardContent>
              {vacantesCerradas.length === 0 ? (
                <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
                  No hay vacantes cerradas registradas.
                </div>
              ) : (
                <div className="space-y-3">
                {vacantesCerradas.map((vacancy) => (
                  <div key={vacancy.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                        <Briefcase className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <h4 className="font-medium">{vacancy.titulo}</h4>
                        <p className="text-sm text-muted-foreground">
                          {vacancy.descripcion?.split('\n\n')[0] || 'General'} • 0 solicitudes • {(vacancy.cupo_total ?? 0) - (vacancy.cupo_disponible ?? 0)}/{vacancy.cupo_total ?? 0} cupos
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline">Cerrada</Badge>
                    </div>
                  </div>
                ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Modales */}
      <ModalNuevaVacante
        isOpen={modalNuevaOpen}
        onClose={() => setModalNuevaOpen(false)}
        onCreated={() => {
          setModalNuevaOpen(false);
          void loadVacancies();
        }}
      />

      {selectedVacancy && (
        <ModalSolicitudes
          isOpen={modalSolicitudesOpen}
          onClose={() => {
            setModalSolicitudesOpen(false);
            setSelectedVacancy(null);
          }}
          vacancy={selectedVacancy}
        />
      )}
    </div>
  );
}
