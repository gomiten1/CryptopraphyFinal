import { X, Shield, Lock, CheckCircle2, Hash, Clock, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useState } from "react";

interface ModalPostulacionProps {
  isOpen: boolean;
  onClose: () => void;
  vacancy: {
    title: string;
    company: string;
    area: string;
    hours: number;
    location: string;
  };
}

export default function ModalPostulacion({ isOpen, onClose, vacancy }: ModalPostulacionProps) {
  const [step, setStep] = useState<'confirm' | 'processing' | 'success'>('confirm');
  const [hash, setHash] = useState('');

  if (!isOpen) return null;

  const handleConfirm = () => {
    setStep('processing');
    // Simular proceso de firma digital
    setTimeout(() => {
      setHash('a3f8b2c9e1d4f7a5b8c3d9e6f2a7b4c1');
      setStep('success');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              {step === 'confirm' && 'Confirmar Postulación'}
              {step === 'processing' && 'Procesando Solicitud'}
              {step === 'success' && 'Postulación Exitosa'}
            </CardTitle>
            <button
              onClick={onClose}
              className="p-2 hover:bg-accent rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {step === 'confirm' && (
            <div className="space-y-6">
              {/* Vacancy Info */}
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-semibold text-lg mb-3">{vacancy.title}</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">Empresa:</span>
                    <p className="font-medium">{vacancy.company}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Área:</span>
                    <p className="font-medium">{vacancy.area}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Horas:</span>
                    <p className="font-medium">{vacancy.hours} hrs</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Ubicación:</span>
                    <p className="font-medium">{vacancy.location}</p>
                  </div>
                </div>
              </div>

              {/* Security Info */}
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-blue-900 mb-1">Postulación Segura</p>
                    <p className="text-sm text-blue-700">
                      Tu solicitud será firmada digitalmente con tecnología RSA-2048 y registrada en blockchain para garantizar su autenticidad.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 p-3 border rounded-lg">
                    <Lock className="w-4 h-4 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Cifrado</p>
                      <p className="font-medium text-sm">AES-256</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 border rounded-lg">
                    <Hash className="w-4 h-4 text-secondary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Hash</p>
                      <p className="font-medium text-sm">SHA-256</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Validation Checklist */}
              <div className="space-y-2">
                <p className="font-medium mb-3">Validación de Requisitos:</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>Perfil completo</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>Documentación verificada</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>Sin servicio social activo</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>QR de identificación válido</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t">
                <Button variant="outline" onClick={onClose} className="flex-1">
                  Cancelar
                </Button>
                <Button onClick={handleConfirm} className="flex-1">
                  <Shield className="w-4 h-4 mr-2" />
                  Confirmar y Firmar
                </Button>
              </div>
            </div>
          )}

          {step === 'processing' && (
            <div className="py-12 text-center">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
              <h3 className="text-xl font-semibold mb-2">Procesando Solicitud</h3>
              <p className="text-muted-foreground mb-6">Firmando digitalmente y registrando en blockchain...</p>
              <div className="max-w-md mx-auto space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
                  <span>Generando firma digital RSA-2048</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
                  <span>Calculando hash SHA-256</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
                  <span>Registrando en blockchain</span>
                </div>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-center mb-2">¡Postulación Exitosa!</h3>
              <p className="text-center text-muted-foreground mb-6">
                Tu solicitud ha sido registrada y firmada digitalmente
              </p>

              {/* Security Details */}
              <div className="space-y-4 mb-6">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-green-900">Solicitud Protegida</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-green-700">Estado:</span>
                      <Badge variant="success">En Revisión</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-700">Hash SHA-256:</span>
                      <span className="font-mono text-xs text-green-900">{hash}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-700">Timestamp:</span>
                      <span className="text-green-900">{new Date().toLocaleString('es-MX')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-700">Firma Digital:</span>
                      <span className="text-green-900">RSA-2048 ✓</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-blue-900 mb-1">Próximos Pasos</p>
                    <p className="text-sm text-blue-700">
                      La empresa revisará tu solicitud. Recibirás una notificación cuando haya una actualización.
                    </p>
                  </div>
                </div>
              </div>

              <Button onClick={onClose} className="w-full">
                Entendido
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
