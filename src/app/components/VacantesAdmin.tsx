import { Briefcase, Search, Download, CheckCircle2, Users, TrendingUp, XCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Sidebar from "./Sidebar";

export default function VacantesAdmin({ onNavigate }: { onNavigate: (view: string) => void }) {
  const vacantes: Array<any> = [];

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
                <p className="text-2xl font-bold mb-1">--</p>
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
                <p className="text-2xl font-bold mb-1">--</p>
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
                <p className="text-2xl font-bold mb-1">--</p>
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
                <p className="text-2xl font-bold mb-1">--/--</p>
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
                <p className="text-2xl font-bold mb-1">--</p>
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
              <div className="rounded-lg border border-dashed p-6 text-sm text-muted-foreground">
                No hay vacantes cargadas todavía.
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-6">
                <p className="text-sm text-muted-foreground">
                  Mostrando 0 de 0 vacantes
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

    </div>
  );
}
