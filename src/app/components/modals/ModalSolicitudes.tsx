import { X, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";

interface ModalSolicitudesProps {
  isOpen: boolean;
  onClose: () => void;
  vacancy: {
    title: string;
    applicants: number;
  };
}

export default function ModalSolicitudes({ isOpen, onClose, vacancy }: ModalSolicitudesProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Solicitudes Recibidas
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">{vacancy.title}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-accent rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
            No hay solicitudes cargadas para esta vacante.
          </div>

          <div className="mt-6 pt-6 border-t">
            <Button variant="outline" onClick={onClose} className="w-full">
              Cerrar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
