import { useEffect, useState } from "react";
import { Briefcase, Search, Filter, MapPin, Clock, Building2, Send, CheckCircle2, XCircle, AlertCircle, Loader2, RefreshCw } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Sidebar from "./Sidebar";
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

type VacancyCard = {
  title: string;
  company: string;
  area: string;
  hours: number;
  location: string;
};

export default function VacantesAlumno({ onNavigate }: { onNavigate: (view: string) => void }) {
  const [vacantes, setVacantes] = useState<VacancyRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const loadVacancies = async () => {
    setLoading(true);
    setError(null);

    const { data, error: fetchError } = await supabase
      .from('vacantes')
      .select('id,titulo,descripcion,cupo_total,cupo_disponible,empresa_id,creado_en,activo')
      .eq('activo', true)
      .gt('cupo_disponible', 0)
      .order('creado_en', { ascending: false });

    if (fetchError) {
      setError(fetchError.message);
      setVacantes([]);
    } else {
      setVacantes((data ?? []) as VacancyRow[]);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadVacancies();
  }, []);

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

  const toCard = (vacancy: VacancyRow): VacancyCard => {
    const area = vacancy.descripcion?.trim() || 'General';
    return {
      title: vacancy.titulo,
      company: vacancy.empresa_id ? `Empresa ${vacancy.empresa_id.slice(0, 8)}` : 'Empresa no disponible',
      area,
      hours: vacancy.cupo_total ? vacancy.cupo_total * 48 : 480,
      location: 'Consultar con la empresa',
    };
  };

  const filteredVacancies = vacantes.filter((vacancy) => {
    const term = search.toLowerCase();
    const company = vacancy.empresa_id?.toLowerCase() ?? '';
    return [vacancy.titulo, vacancy.descripcion ?? '', company].some((value) => value.toLowerCase().includes(term));
  });

  const vacancyCards = filteredVacancies.map(toCard);

  const availableCount = vacantes.length;
  const totalSpots = vacantes.reduce((acc, vacancy) => acc + (vacancy.cupo_disponible ?? 0), 0);
  const totalCapacity = vacantes.reduce((acc, vacancy) => acc + (vacancy.cupo_total ?? 0), 0);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar userType="alumno" onNavigate={onNavigate} currentView="vacantes-alumno" />

      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Vacantes</h1>
            <p className="text-muted-foreground">Explora y postúlate a oportunidades de servicio social</p>
          </div>

          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    className="pl-10"
                    placeholder="Buscar vacantes por título, empresa o área..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <Button variant="outline" onClick={loadVacancies}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refrescar
                </Button>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtros
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <p className="text-2xl font-bold mb-1">{availableCount}</p>
                <p className="text-sm text-muted-foreground">Vacantes disponibles</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                    <Send className="w-6 h-6 text-secondary" />
                  </div>
                </div>
                <p className="text-2xl font-bold mb-1">{totalSpots}</p>
                <p className="text-sm text-muted-foreground">Cupos disponibles</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-accent" />
                  </div>
                </div>
                <p className="text-2xl font-bold mb-1">{totalCapacity}</p>
                <p className="text-sm text-muted-foreground">Cupo total</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                Vacantes Disponibles en Supabase
              </CardTitle>
              <CardDescription>Filtradas con cupo disponible mayor a cero y ordenadas por fecha</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="py-16 flex items-center justify-center text-muted-foreground">
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Cargando vacantes...
                </div>
              ) : error ? (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
                  <p className="font-medium mb-1">No fue posible cargar las vacantes</p>
                  <p className="text-sm">{error}</p>
                </div>
              ) : vacancyCards.length === 0 ? (
                <div className="py-16 text-center text-muted-foreground">
                  No hay vacantes disponibles con cupo en este momento.
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {vacancyCards.map((vacancy, index) => {
                    const source = vacantes[index];
                    return (
                      <div key={source.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold mb-1">{vacancy.title}</h4>
                            <p className="text-sm text-muted-foreground break-all">{vacancy.company}</p>
                          </div>
                          <Badge variant="outline">{source.cupo_disponible ?? 0} cupos</Badge>
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
                              if (source.empresa_id) {
                                sessionStorage.setItem('qr-alumno-empresa-id', source.empresa_id);
                              }
                              onNavigate('qr-alumno');
                            }}
                          >
                            <Send className="w-4 h-4 mr-2" />
                            Postularme
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
