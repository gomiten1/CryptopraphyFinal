import { Search, Filter, MapPin, Clock, Building2, Users, Briefcase, Heart, ArrowRight, Award } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";

export default function CatalogoProyectos({ onNavigate }: { onNavigate: (view: string) => void }) {
  const [searchTerm, setSearchTerm] = useState("");

  const proyectos = [
    {
      id: 1,
      titulo: "Desarrollador web frontend",
      organizacion: "TechCorp",
      area: "Tecnología",
      ubicacion: "Ciudad de México",
      horas: 480,
      cupos: 3,
      descripcion: "Participa en el desarrollo de aplicaciones web modernas usando React y tecnologías actuales.",
      requisitos: ["JavaScript", "React básico", "Trabajo en equipo"]
    },
    {
      id: 2,
      titulo: "Asistente en educación infantil",
      organizacion: "Centro Educativo Futuro",
      area: "Educación",
      ubicacion: "Guadalajara",
      horas: 480,
      cupos: 2,
      descripcion: "Apoya en actividades educativas y recreativas para niños de 6 a 12 años.",
      requisitos: ["Paciencia", "Creatividad", "Comunicación"]
    },
    {
      id: 3,
      titulo: "Diseñador gráfico digital",
      organizacion: "Estudio Creativo",
      area: "Diseño",
      ubicacion: "Monterrey",
      horas: 480,
      cupos: 2,
      descripcion: "Crea contenido visual para redes sociales y materiales de marketing digital.",
      requisitos: ["Adobe Illustrator", "Photoshop", "Portafolio"]
    },
    {
      id: 4,
      titulo: "Analista de datos",
      organizacion: "DataInsights",
      area: "Análisis",
      ubicacion: "Ciudad de México",
      horas: 480,
      cupos: 1,
      descripcion: "Analiza información y genera reportes que ayuden a la toma de decisiones.",
      requisitos: ["Excel avanzado", "SQL básico", "Análisis"]
    },
    {
      id: 5,
      titulo: "Apoyo en comunicación social",
      organizacion: "ONG Comunidad Activa",
      area: "Comunicación",
      ubicacion: "Puebla",
      horas: 480,
      cupos: 4,
      descripcion: "Crea contenido para difundir programas sociales en comunidades vulnerables.",
      requisitos: ["Redacción", "Redes sociales", "Empatía"]
    },
    {
      id: 6,
      titulo: "Asistente de investigación",
      organizacion: "Instituto de Ciencias",
      area: "Investigación",
      ubicacion: "Querétaro",
      horas: 480,
      cupos: 2,
      descripcion: "Colabora en proyectos de investigación científica y recopilación de datos.",
      requisitos: ["Metodología", "Excel", "Redacción académica"]
    }
  ];

  const filteredProyectos = proyectos.filter(p =>
    p.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.organizacion.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.area.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => onNavigate('landing')} className="flex items-center gap-2 hover:opacity-80">
            <div>
              <h1 className="text-xl font-bold text-foreground">Feria de servicio social</h1>
              <p className="text-sm text-muted-foreground">Universidad Nacional</p>
            </div>
          </button>
          <Button onClick={() => onNavigate('login')}>
            Iniciar sesión
          </Button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-3">Catálogo de proyectos</h1>
          <p className="text-lg text-muted-foreground">
            Explora {proyectos.length} oportunidades disponibles y encuentra la que mejor se ajuste a ti
          </p>
        </div>

        {/* Search & Filter */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  className="pl-11"
                  placeholder="Buscar por título, organización o área..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filtrar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Mostrando <span className="font-semibold text-foreground">{filteredProyectos.length}</span> {filteredProyectos.length === 1 ? 'proyecto' : 'proyectos'}
          </p>
        </div>

        {/* Proyectos Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredProyectos.map((proyecto) => (
            <Card key={proyecto.id} className="hover:shadow-lg transition-all border-l-4 border-l-primary">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{proyecto.titulo}</h3>
                    <div className="flex items-center gap-2 text-muted-foreground mb-3">
                      <Building2 className="w-4 h-4" />
                      <span className="text-sm">{proyecto.organizacion}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="flex-shrink-0">
                    <Heart className="w-5 h-5" />
                  </Button>
                </div>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                  {proyecto.descripcion}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">{proyecto.area}</Badge>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{proyecto.ubicacion}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{proyecto.horas} hrs</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>{proyecto.cupos} {proyecto.cupos === 1 ? 'lugar' : 'lugares'}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium mb-2">Se busca:</p>
                  <div className="flex flex-wrap gap-2">
                    {proyecto.requisitos.map((req, idx) => (
                      <div key={idx} className="flex items-center gap-1 text-xs text-foreground">
                        <Award className="w-3 h-3 text-primary" />
                        <span>{req}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Button className="w-full" onClick={() => onNavigate('registro')}>
                  Registrarme a este proyecto
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
