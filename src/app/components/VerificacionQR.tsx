import { QrCode, CheckCircle2, Shield, User, Calendar, Scan, XCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import Sidebar from "./Sidebar";
import { useState } from "react";

export default function VerificacionQR({ onNavigate }: { onNavigate: (view: string) => void }) {
  const [isVerified, setIsVerified] = useState(true);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar userType="alumno" onNavigate={onNavigate} currentView="qr-alumno" />

      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Mi Código QR Seguro</h1>
            <p className="text-muted-foreground">Identificación verificable con criptografía</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* QR Code Display */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <QrCode className="w-5 h-5" />
                  Código QR
                </CardTitle>
                <CardDescription>Válido para verificación de identidad</CardDescription>
              </CardHeader>
              <CardContent>
                {/* QR Code Visual */}
                <div className="relative">
                  <div className="aspect-square bg-white rounded-xl p-8 border-4 border-primary/20 mb-6">
                    <div className="w-full h-full bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-lg flex items-center justify-center relative overflow-hidden">
                      {/* QR Pattern Simulation */}
                      <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 gap-1 p-4">
                        {Array.from({ length: 64 }).map((_, i) => (
                          <div
                            key={i}
                            className={`rounded-sm ${
                              Math.random() > 0.5 ? 'bg-foreground' : 'bg-transparent'
                            }`}
                          />
                        ))}
                      </div>
                      <div className="relative z-10 w-32 h-32 bg-white rounded-lg flex items-center justify-center shadow-lg">
                        <Shield className="w-16 h-16 text-primary" />
                      </div>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    {isVerified ? (
                      <Badge variant="success" className="gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Activo
                      </Badge>
                    ) : (
                      <Badge variant="destructive" className="gap-1">
                        <XCircle className="w-3 h-3" />
                        Inactivo
                      </Badge>
                    )}
                  </div>
                </div>

                {/* QR Info */}
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground mb-2">Hash de Verificación</p>
                    <p className="font-mono text-sm break-all">
                      a3f8b2c9e1d4f7a5b8c3d9e6f2a7b4c1e8d5f9a3b7c2e6f1d8a4b9c5e2f7a1b4
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Generado</p>
                      <p className="font-medium">18 May 2026</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Expira</p>
                      <p className="font-medium">18 Jun 2026</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Verificaciones</p>
                      <p className="font-medium">47 veces</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Última verificación</p>
                      <p className="font-medium">Hace 2 horas</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button className="flex-1">
                      <Scan className="w-4 h-4 mr-2" />
                      Escanear
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Regenerar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Verification Details */}
            <div className="space-y-6">
              {/* Student Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Información del Alumno
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <User className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Juan Pérez Martínez</h3>
                      <p className="text-sm text-muted-foreground">A2021001234</p>
                      <Badge variant="success" className="mt-2">Verificado</Badge>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Carrera:</span>
                      <span className="font-medium">Ing. en Sistemas</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Semestre:</span>
                      <span className="font-medium">8vo Semestre</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Empresa:</span>
                      <span className="font-medium">TechCorp</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Estado:</span>
                      <Badge variant="success">Activo</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Cryptographic Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Detalles Criptográficos
                  </CardTitle>
                  <CardDescription>Información de seguridad del QR</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Algoritmo</p>
                      <Badge>HMAC-SHA256</Badge>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Clave Pública</p>
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="font-mono text-xs break-all">
                          -----BEGIN PUBLIC KEY-----
                          MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8A...
                          -----END PUBLIC KEY-----
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Timestamp</p>
                      <p className="font-mono text-sm">1716040500000</p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Nonce</p>
                      <p className="font-mono text-sm">9c3e7f2d6a8b4c1a9e</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Verification History */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Historial de Verificaciones
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { date: '18 May 2026, 14:35', location: 'Entrada Principal', status: 'success' },
                      { date: '18 May 2026, 09:15', location: 'Oficina TechCorp', status: 'success' },
                      { date: '17 May 2026, 15:20', location: 'Biblioteca', status: 'success' },
                      { date: '17 May 2026, 08:45', location: 'Entrada Principal', status: 'success' },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 border rounded-lg">
                        <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">{item.location}</p>
                          <p className="text-xs text-muted-foreground">{item.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Security Tips */}
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-blue-900 mb-1">Consejos de Seguridad</p>
                      <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
                        <li>No compartas capturas de tu QR</li>
                        <li>Regenera tu código si sospechas compromiso</li>
                        <li>Verifica el dominio al escanear</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
