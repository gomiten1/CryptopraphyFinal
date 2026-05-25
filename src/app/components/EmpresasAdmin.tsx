import { Building2, Search, Download, CheckCircle2, Briefcase, Users } from "lucide-react";
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
  const empresas: Array<never> = [];

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
                <p className="text-2xl font-bold mb-1">--</p>
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
                <p className="text-2xl font-bold mb-1">--</p>
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
                <p className="text-2xl font-bold mb-1">--</p>
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
                <p className="text-2xl font-bold mb-1">--</p>
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
          <div className="rounded-lg border border-dashed p-6 text-sm text-muted-foreground mb-8">
            No hay empresas cargadas todavía.
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Mostrando 0 de 0 empresas
            </p>
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
