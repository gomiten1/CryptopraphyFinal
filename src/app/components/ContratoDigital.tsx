import { FileCheck, Download, Shield, CheckCircle2, Calendar, User } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import Sidebar from "./Sidebar";

export default function ContratoDigital({ onNavigate }: { onNavigate: (view: string) => void }) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar userType="alumno" onNavigate={onNavigate} currentView="contrato" />

      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Contrato Digital</h1>
            <p className="text-muted-foreground">Documento firmado con validación criptográfica</p>
          </div>

          {/* Status Card */}
          <Card className="mb-8 border-green-200 bg-green-50">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-green-600 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-green-900 mb-1">Contrato Verificado</h3>
                  <p className="text-sm text-green-700 mb-4">
                    Este documento ha sido firmado digitalmente y su autenticidad ha sido verificada mediante blockchain
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-green-700 mb-1">Firmado el:</p>
                      <p className="font-medium text-green-900">18 Mayo 2026, 14:35</p>
                    </div>
                    <div>
                      <p className="text-xs text-green-700 mb-1">Método:</p>
                      <p className="font-medium text-green-900">RSA-2048 + SHA-256</p>
                    </div>
                    <div>
                      <p className="text-xs text-green-700 mb-1">Estado:</p>
                      <Badge variant="success">Válido</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Document Preview */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileCheck className="w-5 h-5" />
                  Vista Previa del Contrato
                </CardTitle>
                <CardDescription>Convenio de Servicio Social Universitario</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Simulated PDF Preview */}
                <div className="border-2 border-dashed rounded-lg p-8 bg-white min-h-[600px]">
                  <div className="max-w-2xl mx-auto space-y-6">
                    <div className="text-center mb-8">
                      <h2 className="text-2xl font-bold mb-2">CONVENIO DE SERVICIO SOCIAL</h2>
                      <p className="text-sm text-muted-foreground">Universidad Nacional</p>
                    </div>

                    <div className="space-y-4 text-sm">
                      <p className="font-medium">DATOS DEL PRESTADOR</p>
                      <div className="grid grid-cols-2 gap-3 pl-4">
                        <div>
                          <p className="text-muted-foreground text-xs">Nombre:</p>
                          <p>Juan Pérez Martínez</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs">Matrícula:</p>
                          <p>A2021001234</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs">Carrera:</p>
                          <p>Ingeniería en Sistemas</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs">Semestre:</p>
                          <p>8vo Semestre</p>
                        </div>
                      </div>

                      <div className="border-t pt-4 mt-4">
                        <p className="font-medium">DATOS DE LA EMPRESA</p>
                        <div className="grid grid-cols-2 gap-3 pl-4 mt-2">
                          <div>
                            <p className="text-muted-foreground text-xs">Razón Social:</p>
                            <p>TechCorp S.A. de C.V.</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground text-xs">RFC:</p>
                            <p>TEC123456ABC</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground text-xs">Área:</p>
                            <p>Desarrollo de Software</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground text-xs">Supervisor:</p>
                            <p>Ing. María Rodríguez</p>
                          </div>
                        </div>
                      </div>

                      <div className="border-t pt-4 mt-4">
                        <p className="font-medium">PERIODO Y HORARIO</p>
                        <div className="pl-4 mt-2 space-y-2">
                          <p><span className="text-muted-foreground">Inicio:</span> 15 Enero 2024</p>
                          <p><span className="text-muted-foreground">Término:</span> 15 Julio 2024</p>
                          <p><span className="text-muted-foreground">Total de Horas:</span> 480 horas</p>
                          <p><span className="text-muted-foreground">Horario:</span> Lunes a Viernes, 9:00 - 14:00 hrs</p>
                        </div>
                      </div>

                      <div className="border-t pt-4 mt-4">
                        <p className="font-medium">ACTIVIDADES A REALIZAR</p>
                        <ul className="pl-8 mt-2 space-y-1 list-disc">
                          <li>Desarrollo de componentes frontend con React</li>
                          <li>Implementación de interfaces de usuario</li>
                          <li>Pruebas y documentación de código</li>
                          <li>Colaboración en proyectos del equipo</li>
                        </ul>
                      </div>

                      <div className="border-t pt-4 mt-6">
                        <p className="text-xs text-muted-foreground italic">
                          Este documento ha sido firmado digitalmente por todas las partes involucradas
                          y cuenta con validación criptográfica mediante tecnología blockchain.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button className="flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    Descargar PDF Original
                  </Button>
                  <Button variant="outline">
                    <Shield className="w-4 h-4 mr-2" />
                    Verificar Firma
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Verification Details */}
            <div className="space-y-6">
              {/* Digital Signature */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Firma Digital
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Algoritmo</p>
                      <Badge>RSA-2048</Badge>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Hash SHA-256</p>
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="font-mono text-xs break-all">
                          7d9f3a8e2b4c1f6d8e5a9b2c4f1e3d7a9b4c2e6f8d1a5b9c3e7f2d6a8b4c1a9e
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Blockchain TX</p>
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="font-mono text-xs break-all">
                          0x4f2a9c8e...3b7d1f4a
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Signatories */}
              <Card>
                <CardHeader>
                  <CardTitle>Firmantes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Juan Pérez</p>
                        <p className="text-xs text-muted-foreground">Alumno</p>
                        <div className="flex items-center gap-1 mt-1">
                          <CheckCircle2 className="w-3 h-3 text-green-600" />
                          <span className="text-xs text-green-600">Verificado</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-secondary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Ing. María Rodríguez</p>
                        <p className="text-xs text-muted-foreground">TechCorp - Supervisor</p>
                        <div className="flex items-center gap-1 mt-1">
                          <CheckCircle2 className="w-3 h-3 text-green-600" />
                          <span className="text-xs text-green-600">Verificado</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-accent" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Dr. Luis García</p>
                        <p className="text-xs text-muted-foreground">Universidad - Coordinador</p>
                        <div className="flex items-center gap-1 mt-1">
                          <CheckCircle2 className="w-3 h-3 text-green-600" />
                          <span className="text-xs text-green-600">Verificado</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Metadata */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Metadatos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Creado:</span>
                      <span>18 May 2026</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Modificado:</span>
                      <span>18 May 2026</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Versión:</span>
                      <span>1.0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Formato:</span>
                      <span>PDF/A-2b</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tamaño:</span>
                      <span>247 KB</span>
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
