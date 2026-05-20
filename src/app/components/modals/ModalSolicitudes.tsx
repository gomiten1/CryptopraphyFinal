import { X, Users, CheckCircle2, XCircle, Award, Mail, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useState } from "react";

interface ModalSolicitudesProps {
  isOpen: boolean;
  onClose: () => void;
  vacancy: {
    title: string;
    applicants: number;
  };
}

export default function ModalSolicitudes({ isOpen, onClose, vacancy }: ModalSolicitudesProps) {
  const [solicitudes, setSolicitudes] = useState([
    { id: 1, name: 'Roberto Sánchez', matricula: 'A2021001238', career: 'Ing. Sistemas', email: 'roberto.sanchez@uni.edu', phone: '+52 55 1234 5678', avg: 8.9, status: 'pending' },
    { id: 2, name: 'Laura Fernández', matricula: 'A2021001239', career: 'Ing. Datos', email: 'laura.fernandez@uni.edu', phone: '+52 55 2345 6789', avg: 9.3, status: 'pending' },
    { id: 3, name: 'Miguel Torres', matricula: 'A2021001240', career: 'Ing. Software', email: 'miguel.torres@uni.edu', phone: '+52 55 3456 7890', avg: 9.0, status: 'pending' },
  ]);

  if (!isOpen) return null;

  const handleApprove = (id: number) => {
    setSolicitudes(solicitudes.map(s =>
      s.id === id ? { ...s, status: 'approved' } : s
    ));
  };

  const handleReject = (id: number) => {
    setSolicitudes(solicitudes.map(s =>
      s.id === id ? { ...s, status: 'rejected' } : s
    ));
  };

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
          <div className="space-y-4">
            {solicitudes.map((alumno) => (
              <div key={alumno.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-medium text-primary">{alumno.name[0]}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">{alumno.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {alumno.matricula} • {alumno.career}
                      </p>
                    </div>
                  </div>
                  {alumno.status === 'pending' && <Badge variant="warning">Pendiente</Badge>}
                  {alumno.status === 'approved' && <Badge variant="success">Aprobado</Badge>}
                  {alumno.status === 'rejected' && <Badge variant="destructive">Rechazado</Badge>}
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 text-sm mb-1">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Email</span>
                    </div>
                    <p className="text-sm">{alumno.email}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-sm mb-1">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Teléfono</span>
                    </div>
                    <p className="text-sm">{alumno.phone}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-sm mb-1">
                      <Award className="w-4 h-4 text-yellow-600" />
                      <span className="text-muted-foreground">Promedio</span>
                    </div>
                    <p className="text-sm font-semibold">{alumno.avg}</p>
                  </div>
                </div>

                {alumno.status === 'pending' && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleReject(alumno.id)}
                      className="flex-1"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Rechazar
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleApprove(alumno.id)}
                      className="flex-1"
                    >
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Aprobar
                    </Button>
                  </div>
                )}

                {alumno.status === 'approved' && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-700">
                      ✓ Alumno aprobado. Se le ha notificado por correo electrónico.
                    </p>
                  </div>
                )}

                {alumno.status === 'rejected' && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-700">
                      Solicitud rechazada. El alumno ha sido notificado.
                    </p>
                  </div>
                )}
              </div>
            ))}
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
