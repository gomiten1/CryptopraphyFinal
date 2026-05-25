import { User, Lock, Bell, Shield, QrCode, Mail, Phone, CheckCircle2, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Sidebar from "./Sidebar";

export default function ConfiguracionAlumno({ onNavigate }: { onNavigate: (view: string) => void }) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar userType="alumno" onNavigate={onNavigate} currentView="settings" />

      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Configuración</h1>
            <p className="text-muted-foreground">Administra tu perfil y preferencias de seguridad</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Profile Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Información Personal
                  </CardTitle>
                  <CardDescription>Actualiza tus datos de perfil</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Nombre</label>
                      <Input defaultValue="Juan" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Apellidos</label>
                      <Input defaultValue="Pérez Martínez" />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Matrícula</label>
                    <Input defaultValue="A2021001234" disabled />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Correo Institucional</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input className="pl-10" defaultValue="juan.perez@universidad.edu.mx" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Teléfono</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input className="pl-10" defaultValue="+52 55 1234 5678" />
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Carrera</label>
                      <Input defaultValue="Ingeniería en Sistemas" disabled />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Semestre</label>
                      <Input defaultValue="8vo Semestre" disabled />
                    </div>
                  </div>

                </CardContent>
              </Card>

              {/* Security Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="w-5 h-5" />
                    Seguridad
                  </CardTitle>
                  <CardDescription>Administra la seguridad de tu cuenta</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Contraseña Actual</label>
                    <Input type="password" placeholder="••••••••" />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Nueva Contraseña</label>
                    <Input type="password" placeholder="••••••••" />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Confirmar Nueva Contraseña</label>
                    <Input type="password" placeholder="••••••••" />
                  </div>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex gap-3">
                      <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-blue-900 mb-1">Requisitos de Contraseña</p>
                        <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
                          <li>Mínimo 8 caracteres</li>
                          <li>Al menos una mayúscula</li>
                          <li>Al menos un número</li>
                          <li>Al menos un carácter especial</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                </CardContent>
              </Card>

              {/* Notifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    Notificaciones
                  </CardTitle>
                  <CardDescription>Configura tus preferencias de notificación</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Notificaciones por Correo</p>
                      <p className="text-sm text-muted-foreground">Recibe actualizaciones importantes</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Alertas de Seguridad</p>
                      <p className="text-sm text-muted-foreground">Notificaciones de actividad sospechosa</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Recordatorios de Horas</p>
                      <p className="text-sm text-muted-foreground">Recordatorios semanales</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Nuevas Vacantes</p>
                      <p className="text-sm text-muted-foreground">Alertas de oportunidades</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Verification Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Estado de Verificación
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Identidad Verificada</span>
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Correo Verificado</span>
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Teléfono Verificado</span>
                      <AlertCircle className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">QR Activo</span>
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* QR Management */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <QrCode className="w-5 h-5" />
                    Gestión de QR
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                      <QrCode className="w-24 h-24 text-primary" />
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Estado:</span>
                        <Badge variant="success">Activo</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Expira:</span>
                        <span>18 Jun 2026</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Verificaciones:</span>
                        <span>47</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full" onClick={() => onNavigate('qr-alumno')}>
                        Ver QR Completo
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Account Actions */}
              <Card className="border-yellow-200 bg-yellow-50">
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-yellow-900 mb-1">Zona de Peligro</p>
                      <p className="text-sm text-yellow-700 mb-3">
                        Acciones permanentes en tu cuenta
                      </p>
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
