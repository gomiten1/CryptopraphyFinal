import { X, Building2, Shield, CheckCircle2, FileText, Mail, Phone, MapPin, Briefcase, Users, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useState } from "react";

interface ModalVerificarEmpresaProps {
  isOpen: boolean;
  onClose: () => void;
  empresa: {
    name: string;
    rfc: string;
    sector: string;
    email: string;
    phone: string;
    location: string;
    students: number;
    vacancies: number;
    status: string;
  };
}

export default function ModalVerificarEmpresa({ isOpen, onClose, empresa }: ModalVerificarEmpresaProps) {
  const [verified, setVerified] = useState(empresa.status === 'verified');

  if (!isOpen) return null;

  const handleVerify = () => {
    setVerified(true);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              Detalles de Empresa
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
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center">
                <Building2 className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-1">{empresa.name}</h2>
                <p className="text-muted-foreground">{empresa.sector}</p>
              </div>
            </div>
            {verified ? (
              <Badge variant="success" className="gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Verificada
              </Badge>
            ) : (
              <Badge variant="warning" className="gap-1">
                <AlertCircle className="w-3 h-3" />
                Pendiente
              </Badge>
            )}
          </div>

          {/* Company Info */}
          <div>
            <h3 className="font-semibold mb-4">Información Institucional</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">RFC</span>
                </div>
                <p className="font-mono font-semibold">{empresa.rfc}</p>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Sector</span>
                </div>
                <p className="font-semibold">{empresa.sector}</p>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Email</span>
                </div>
                <p className="font-semibold text-sm">{empresa.email}</p>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Teléfono</span>
                </div>
                <p className="font-semibold">{empresa.phone}</p>
              </div>
              <div className="p-4 border rounded-lg md:col-span-2">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Ubicación</span>
                </div>
                <p className="font-semibold">{empresa.location}</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div>
            <h3 className="font-semibold mb-4">Estadísticas</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-primary" />
                  <span className="text-sm text-muted-foreground">Alumnos Activos</span>
                </div>
                <p className="text-3xl font-bold text-primary">{empresa.students}</p>
              </div>
              <div className="p-4 bg-secondary/5 border border-secondary/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase className="w-5 h-5 text-secondary" />
                  <span className="text-sm text-muted-foreground">Vacantes Publicadas</span>
                </div>
                <p className="text-3xl font-bold text-secondary">{empresa.vacancies}</p>
              </div>
            </div>
          </div>

          {/* Verification Checklist */}
          <div>
            <h3 className="font-semibold mb-4">Lista de Verificación</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span className="text-sm">RFC validado en SAT</span>
              </div>
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span className="text-sm">Documentación legal completa</span>
              </div>
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span className="text-sm">Datos de contacto verificados</span>
              </div>
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span className="text-sm">Convenio institucional firmado</span>
              </div>
            </div>
          </div>

          {/* Convenio Info */}
          <div>
            <h3 className="font-semibold mb-4">Convenio Institucional</h3>
            <div className="p-4 bg-muted rounded-lg">
              <div className="grid md:grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-muted-foreground">Número de Convenio:</span>
                  <p className="font-medium">CONV-2024-00156</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Fecha de Inicio:</span>
                  <p className="font-medium">01 Enero 2024</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Vigencia:</span>
                  <p className="font-medium">Hasta 31 Dic 2026</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Estado:</span>
                  <Badge variant={verified ? "success" : "warning"}>
                    {verified ? "Activo" : "Pendiente"}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cerrar
            </Button>
            {!verified && (
              <Button onClick={handleVerify} className="flex-1">
                <Shield className="w-4 h-4 mr-2" />
                Verificar Empresa
              </Button>
            )}
          </div>

          {verified && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <p className="text-sm text-green-700 font-medium">
                  Empresa verificada exitosamente. Puede publicar vacantes y recibir alumnos.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
