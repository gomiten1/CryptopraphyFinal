import { Building2, Lock, Bell, Shield, Users, FileText, Mail, Phone, MapPin, CheckCircle2, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Sidebar from "./Sidebar";

export default function ConfiguracionEmpresa({ onNavigate }: { onNavigate: (view: string) => void }) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar userType="empresa" onNavigate={onNavigate} currentView="settings" />

      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Configuración de Empresa</h1>
            <p className="text-muted-foreground">Administra información institucional y preferencias</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Company Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="w-5 h-5" />
                    Información de la Empresa
                  </CardTitle>
                  <CardDescription>Datos generales de la organización</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Razón Social</label>
                    <Input defaultValue="TechCorp S.A. de C.V." />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">RFC</label>
                      <Input defaultValue="TEC123456ABC" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Sector</label>
                      <Input defaultValue="Tecnología" />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Dirección</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input className="pl-10" defaultValue="Av. Tecnológico 123, Col. Innovación, CP 64700" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Teléfono</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input className="pl-10" defaultValue="+52 81 1234 5678" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Correo Institucional</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input className="pl-10" defaultValue="contacto@techcorp.com" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Descripción</label>
                    <textarea
                      className="flex w-full rounded-lg border border-input bg-input-background px-3 py-2 ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]"
                      defaultValue="Empresa líder en desarrollo de software y soluciones tecnológicas innovadoras."
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button>Guardar Cambios</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Responsible Managers */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Responsables y Supervisores
                  </CardTitle>
                  <CardDescription>Personal autorizado para gestionar alumnos</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-4">
                    {[
                      { name: 'Ing. María Rodríguez', role: 'Coordinador Principal', email: 'maria.rodriguez@techcorp.com' },
                      { name: 'Lic. Carlos Méndez', role: 'Supervisor de Área', email: 'carlos.mendez@techcorp.com' },
                    ].map((person, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="font-medium text-primary">{person.name[0]}</span>
                          </div>
                          <div>
                            <p className="font-medium">{person.name}</p>
                            <p className="text-sm text-muted-foreground">{person.role} • {person.email}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">Editar</Button>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full">
                    <Users className="w-4 h-4 mr-2" />
                    Agregar Responsable
                  </Button>
                </CardContent>
              </Card>

              {/* Security */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="w-5 h-5" />
                    Seguridad de la Cuenta
                  </CardTitle>
                  <CardDescription>Configuración de acceso y seguridad</CardDescription>
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

                  <div className="flex justify-end">
                    <Button>Actualizar Contraseña</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Notifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    Preferencias de Notificación
                  </CardTitle>
                  <CardDescription>Gestiona cómo recibes actualizaciones</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Nuevas Solicitudes</p>
                      <p className="text-sm text-muted-foreground">Notificar cuando un alumno se postule</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Registro de Horas</p>
                      <p className="text-sm text-muted-foreground">Alertas de horas registradas</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Reportes Mensuales</p>
                      <p className="text-sm text-muted-foreground">Resumen de actividad</p>
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
                      <span className="text-sm">Empresa Verificada</span>
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">RFC Validado</span>
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Convenio Activo</span>
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Documentación</span>
                      <AlertCircle className="w-5 h-5 text-yellow-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Agreement Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Convenio Institucional
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Número de Convenio</p>
                      <p className="font-medium">CONV-2024-00156</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Fecha de Inicio</p>
                      <p className="font-medium">01 Enero 2024</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Vigencia</p>
                      <p className="font-medium">Hasta 31 Dic 2026</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Estado</p>
                      <Badge variant="success">Activo</Badge>
                    </div>
                    <Button variant="outline" className="w-full">
                      Ver Convenio
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Danger Zone */}
              <Card className="border-red-200 bg-red-50">
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-900 mb-1">Zona de Peligro</p>
                      <p className="text-sm text-red-700 mb-3">
                        Acciones permanentes sobre la cuenta empresarial
                      </p>
                      <Button variant="destructive" size="sm" className="w-full">
                        Cancelar Convenio
                      </Button>
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
