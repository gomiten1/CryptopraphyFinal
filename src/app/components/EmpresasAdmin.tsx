import { Building2, Search, Filter, Download, Eye, Edit, CheckCircle2, XCircle, Briefcase, Users, Mail, Phone, MapPin } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Sidebar from "./Sidebar";
import ModalVerificarEmpresa from "./modals/ModalVerificarEmpresa";
import { useState } from "react";

export default function EmpresasAdmin({ onNavigate }: { onNavigate: (view: string) => void }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEmpresa, setSelectedEmpresa] = useState<any>(null);
  const empresas = [
    { id: 1, name: 'TechCorp', rfc: 'TEC123456ABC', sector: 'Tecnología', students: 24, vacancies: 8, status: 'verified', email: 'contacto@techcorp.com', phone: '+52 81 1234 5678', location: 'Monterrey' },
    { id: 2, name: 'DataSolutions', rfc: 'DAT789012DEF', sector: 'Análisis de Datos', students: 15, vacancies: 5, status: 'verified', email: 'info@datasolutions.com', phone: '+52 55 2345 6789', location: 'CDMX' },
    { id: 3, name: 'DesignStudio', rfc: 'DES345678GHI', sector: 'Diseño', students: 8, vacancies: 3, status: 'pending', email: 'hello@designstudio.com', phone: '+52 33 3456 7890', location: 'Guadalajara' },
    { id: 4, name: 'CloudServices', rfc: 'CLO901234JKL', sector: 'Cloud Computing', students: 12, vacancies: 6, status: 'verified', email: 'contact@cloudservices.com', phone: '+52 81 4567 8901', location: 'Monterrey' },
    { id: 5, name: 'SecureNet', rfc: 'SEC567890MNO', sector: 'Seguridad', students: 18, vacancies: 7, status: 'verified', email: 'info@securenet.com', phone: '+52 55 5678 9012', location: 'CDMX' },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar userType="admin" onNavigate={onNavigate} currentView="empresas-admin" />

      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Gestión de Empresas</h1>
              <p className="text-muted-foreground">Administración de organizaciones participantes</p>
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
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <p className="text-2xl font-bold mb-1">{empresas.length}</p>
                <p className="text-sm text-muted-foreground">Total Empresas</p>
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
                  {empresas.filter(e => e.status === 'verified').length}
                </p>
                <p className="text-sm text-muted-foreground">Verificadas</p>
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
                  {empresas.reduce((sum, e) => sum + e.students, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Alumnos Totales</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <p className="text-2xl font-bold mb-1">
                  {empresas.reduce((sum, e) => sum + e.vacancies, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Vacantes Activas</p>
              </CardContent>
            </Card>
          </div>

          {/* Search */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input className="pl-10" placeholder="Buscar por nombre, RFC o sector..." />
              </div>
            </CardContent>
          </Card>

          {/* Companies Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {empresas.map((empresa) => (
              <Card key={empresa.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{empresa.name}</CardTitle>
                        <CardDescription>{empresa.sector}</CardDescription>
                      </div>
                    </div>
                    {empresa.status === 'verified' ? (
                      <Badge variant="success" className="gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Verificada
                      </Badge>
                    ) : (
                      <Badge variant="warning" className="gap-1">
                        <XCircle className="w-3 h-3" />
                        Pendiente
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-muted-foreground w-20">RFC:</span>
                      <span className="font-mono">{empresa.rfc}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{empresa.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{empresa.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{empresa.location}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4 p-4 bg-muted/50 rounded-lg">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Users className="w-4 h-4 text-primary" />
                        <span className="text-sm text-muted-foreground">Alumnos</span>
                      </div>
                      <p className="text-xl font-bold">{empresa.students}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Briefcase className="w-4 h-4 text-secondary" />
                        <span className="text-sm text-muted-foreground">Vacantes</span>
                      </div>
                      <p className="text-xl font-bold">{empresa.vacancies}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => {
                        setSelectedEmpresa(empresa);
                        setModalOpen(true);
                      }}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Ver Detalles
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="w-4 h-4 mr-2" />
                      Editar
                    </Button>
                    {empresa.status === 'pending' && (
                      <Button
                        size="sm"
                        onClick={() => {
                          setSelectedEmpresa(empresa);
                          setModalOpen(true);
                        }}
                      >
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Verificar
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Mostrando {empresas.length} de {empresas.length} empresas
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>Anterior</Button>
              <Button variant="outline" size="sm">Siguiente</Button>
            </div>
          </div>
        </div>
      </main>

      {/* Modal de Verificación */}
      {selectedEmpresa && (
        <ModalVerificarEmpresa
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setSelectedEmpresa(null);
          }}
          empresa={selectedEmpresa}
        />
      )}
    </div>
  );
}
