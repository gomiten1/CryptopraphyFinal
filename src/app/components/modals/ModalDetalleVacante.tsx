import { X, Briefcase, Building2, MapPin, Clock, Users, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

interface ModalDetalleVacanteProps {
  isOpen: boolean;
  onClose: () => void;
  vacancy: {
    title: string;
    company: string;
    area: string;
    location: string;
    hours: number;
    slots: number;
    filled: number;
    applicants: number;
    status: string;
    description?: string;
    requirements?: string[];
  };
}

export default function ModalDetalleVacante({ isOpen, onClose, vacancy }: ModalDetalleVacanteProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              Detalles de Vacante
            </CardTitle>
            <button
              onClick={onClose}
              className="p-2 hover:bg-accent rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {/* Header Info */}
          <div>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold mb-2">{vacancy.title}</h2>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Building2 className="w-4 h-4" />
                  <span>{vacancy.company}</span>
                </div>
              </div>
              {vacancy.status === 'filled' ? (
                <Badge variant="secondary">Cupo lleno</Badge>
              ) : (
                <Badge variant="default">Activa</Badge>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Briefcase className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">Área</span>
              </div>
              <p className="font-semibold">{vacancy.area}</p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-secondary" />
                <span className="text-sm text-muted-foreground">Ubicación</span>
              </div>
              <p className="font-semibold">{vacancy.location}</p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-accent" />
                <span className="text-sm text-muted-foreground">Horas</span>
              </div>
              <p className="font-semibold">{vacancy.hours} hrs</p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-green-600" />
                <span className="text-sm text-muted-foreground">Cupos</span>
              </div>
              <p className="font-semibold">{vacancy.filled}/{vacancy.slots}</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-semibold mb-3">Descripción del Puesto</h3>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                {vacancy.description || 'Sin descripción registrada para esta vacante.'}
              </p>
            </div>
          </div>

          {/* Requirements */}
          <div>
            <h3 className="font-semibold mb-3">Requisitos</h3>
            {vacancy.requirements && vacancy.requirements.length > 0 ? (
              <div className="space-y-2">
                {vacancy.requirements.map((requirement) => (
                  <div key={requirement} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{requirement}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
                Sin requisitos registrados para esta vacante.
              </div>
            )}
          </div>

          {/* Applicants */}
          <div>
            <h3 className="font-semibold mb-3">Estado de Postulaciones</h3>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Total de Solicitudes</span>
                <span className="font-semibold">{vacancy.applicants}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{ width: `${(vacancy.filled / vacancy.slots) * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {Math.round((vacancy.filled / vacancy.slots) * 100)}% de cupos ocupados
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cerrar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
