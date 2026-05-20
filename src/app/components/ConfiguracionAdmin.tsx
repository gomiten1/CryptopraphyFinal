import { Settings, Shield, Lock, Bell, Users, Database, Key, Globe, AlertCircle, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Sidebar from "./Sidebar";

export default function ConfiguracionAdmin({ onNavigate }: { onNavigate: (view: string) => void }) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar userType="admin" onNavigate={onNavigate} currentView="settings" />

      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Configuración del Sistema</h1>
            <p className="text-muted-foreground">Administración general de la plataforma</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* General Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Configuración General
                  </CardTitle>
                  <CardDescription>Parámetros principales del sistema</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Nombre de la Institución</label>
                    <Input defaultValue="Universidad Nacional" />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Horas Requeridas</label>
                      <Input type="number" defaultValue="480" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Periodo Académico</label>
                      <Input defaultValue="2024-2026" />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Correo Institucional</label>
                    <Input defaultValue="servicio.social@universidad.edu.mx" />
                  </div>

                  <div className="flex justify-end">
                    <Button>Guardar Cambios</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Security Configuration */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Configuración de Seguridad
                  </CardTitle>
                  <CardDescription>Parámetros criptográficos y de seguridad</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Cifrado AES-256</p>
                      <p className="text-sm text-muted-foreground">Protección de datos sensibles</p>
                    </div>
                    <Badge variant="success" className="gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Activo
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Firma Digital RSA-2048</p>
                      <p className="text-sm text-muted-foreground">Contratos digitales</p>
                    </div>
                    <Badge variant="success" className="gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Activo
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Validación QR HMAC-SHA256</p>
                      <p className="text-sm text-muted-foreground">Códigos QR seguros</p>
                    </div>
                    <Badge variant="success" className="gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Activo
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Blockchain Verification</p>
                      <p className="text-sm text-muted-foreground">Validación descentralizada</p>
                    </div>
                    <Badge variant="success" className="gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Activo
                    </Badge>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Tiempo de Expiración de QR (días)</label>
                    <Input type="number" defaultValue="30" />
                  </div>
                </CardContent>
              </Card>

              {/* Roles and Permissions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Roles y Permisos
                  </CardTitle>
                  <CardDescription>Gestión de acceso por tipo de usuario</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { role: 'Administrador', users: 3, permissions: 'Acceso completo' },
                      { role: 'Empresa', users: 156, permissions: 'Gestión de vacantes y alumnos' },
                      { role: 'Alumno', users: 2547, permissions: 'Visualización y postulación' },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">{item.role}</p>
                          <p className="text-sm text-muted-foreground">{item.permissions}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant="outline">{item.users} usuarios</Badge>
                          <Button variant="ghost" size="sm">Editar</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Authentication */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="w-5 h-5" />
                    Autenticación
                  </CardTitle>
                  <CardDescription>Configuración de acceso y contraseñas</CardDescription>
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

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Autenticación de Dos Factores (2FA)</p>
                      <p className="text-sm text-muted-foreground">Seguridad adicional</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
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
                    Notificaciones del Sistema
                  </CardTitle>
                  <CardDescription>Alertas y reportes automáticos</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Alertas de Seguridad</p>
                      <p className="text-sm text-muted-foreground">Notificar actividad sospechosa</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Reportes Semanales</p>
                      <p className="text-sm text-muted-foreground">Resumen de actividad</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Nuevas Empresas</p>
                      <p className="text-sm text-muted-foreground">Pendientes de verificación</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* System Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="w-5 h-5" />
                    Estado del Sistema
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Base de Datos</span>
                      <Badge variant="success">Operativa</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Servidor</span>
                      <Badge variant="success">En Línea</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Blockchain</span>
                      <Badge variant="success">Sincronizado</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Último Backup</span>
                      <span className="text-sm text-muted-foreground">Hace 2h</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* API Keys */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="w-5 h-5" />
                    Claves API
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Clave Pública</p>
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="font-mono text-xs break-all">
                          pk_live_abc123def456ghi789
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Clave Privada</p>
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="font-mono text-xs">
                          sk_live_•••••••••••••••
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">
                      Regenerar Claves
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Integration */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    Integraciones
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="text-sm">Blockchain</span>
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="text-sm">SMTP</span>
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="text-sm">SMS</span>
                      <AlertCircle className="w-5 h-5 text-yellow-600" />
                    </div>
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
                        Acciones permanentes sobre el sistema
                      </p>
                      <div className="space-y-2">
                        <Button variant="outline" size="sm" className="w-full text-red-700 border-red-300 hover:bg-red-100">
                          Resetear Configuración
                        </Button>
                        <Button variant="destructive" size="sm" className="w-full">
                          Limpiar Base de Datos
                        </Button>
                      </div>
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
