import { Shield, Activity, Search, Filter, Download, CheckCircle2, XCircle, AlertTriangle, Lock, QrCode, FileCheck, User, Eye } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Sidebar from "./Sidebar";

export default function Auditoria({ onNavigate }: { onNavigate: (view: string) => void }) {
  const logs = [
    { id: 1, type: 'qr_verification', user: 'Juan Pérez', action: 'QR verificado exitosamente', status: 'success', timestamp: '2026-05-18 14:35:22', ip: '192.168.1.100', hash: 'a3f8b2c9e1d4f7a5' },
    { id: 2, type: 'contract_sign', user: 'Ana Martínez', action: 'Contrato digital firmado', status: 'success', timestamp: '2026-05-18 14:30:15', ip: '192.168.1.101', hash: '7d9f3a8e2b4c1f6d' },
    { id: 3, type: 'login_failed', user: 'Unknown', action: 'Intento de acceso fallido', status: 'warning', timestamp: '2026-05-18 14:25:08', ip: '192.168.1.102', hash: null },
    { id: 4, type: 'qr_verification', user: 'Carlos López', action: 'QR verificado exitosamente', status: 'success', timestamp: '2026-05-18 14:20:45', ip: '192.168.1.103', hash: '9c3e7f2d6a8b4c1a' },
    { id: 5, type: 'company_verify', user: 'Admin', action: 'Empresa TechCorp verificada', status: 'success', timestamp: '2026-05-18 14:15:30', ip: '192.168.1.1', hash: '4f2a9c8e3b7d1f4a' },
    { id: 6, type: 'contract_verify', user: 'Sistema', action: 'Validación blockchain de contrato', status: 'success', timestamp: '2026-05-18 14:10:12', ip: '192.168.1.1', hash: 'b5c8d2e6f9a1b3c7' },
    { id: 7, type: 'data_export', user: 'Admin', action: 'Exportación de datos de alumnos', status: 'info', timestamp: '2026-05-18 14:05:55', ip: '192.168.1.1', hash: null },
    { id: 8, type: 'qr_invalid', user: 'María García', action: 'QR inválido detectado', status: 'error', timestamp: '2026-05-18 14:00:33', ip: '192.168.1.104', hash: null },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'qr_verification':
      case 'qr_invalid':
        return QrCode;
      case 'contract_sign':
      case 'contract_verify':
        return FileCheck;
      case 'login_failed':
        return Lock;
      case 'company_verify':
        return Shield;
      default:
        return Activity;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <Badge variant="success" className="gap-1"><CheckCircle2 className="w-3 h-3" />Exitoso</Badge>;
      case 'warning':
        return <Badge variant="warning" className="gap-1"><AlertTriangle className="w-3 h-3" />Advertencia</Badge>;
      case 'error':
        return <Badge variant="destructive" className="gap-1"><XCircle className="w-3 h-3" />Error</Badge>;
      default:
        return <Badge variant="outline">Info</Badge>;
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar userType="admin" onNavigate={onNavigate} currentView="auditoria" />

      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Auditoría y Seguridad</h1>
              <p className="text-muted-foreground">Registro completo de eventos del sistema</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filtros Avanzados
              </Button>
              <Button>
                <Download className="w-4 h-4 mr-2" />
                Exportar Logs
              </Button>
            </div>
          </div>

          {/* Security Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="border-l-4 border-l-green-600">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <p className="text-2xl font-bold mb-1">
                  {logs.filter(l => l.status === 'success').length}
                </p>
                <p className="text-sm text-muted-foreground">Eventos Exitosos</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-yellow-600">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-yellow-100 flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
                <p className="text-2xl font-bold mb-1">
                  {logs.filter(l => l.status === 'warning').length}
                </p>
                <p className="text-sm text-muted-foreground">Advertencias</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-red-600">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center">
                    <XCircle className="w-6 h-6 text-red-600" />
                  </div>
                </div>
                <p className="text-2xl font-bold mb-1">
                  {logs.filter(l => l.status === 'error').length}
                </p>
                <p className="text-sm text-muted-foreground">Errores Críticos</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-primary">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <p className="text-2xl font-bold mb-1">100%</p>
                <p className="text-sm text-muted-foreground">Nivel de Seguridad</p>
              </CardContent>
            </Card>
          </div>

          {/* Search */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input className="pl-10" placeholder="Buscar por usuario, acción, IP o hash..." />
              </div>
            </CardContent>
          </Card>

          {/* Event Types */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <QrCode className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Verificaciones QR</p>
                    <p className="text-sm text-muted-foreground">
                      {logs.filter(l => l.type.includes('qr')).length} eventos
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                    <FileCheck className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="font-medium">Contratos</p>
                    <p className="text-sm text-muted-foreground">
                      {logs.filter(l => l.type.includes('contract')).length} eventos
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Lock className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium">Accesos</p>
                    <p className="text-sm text-muted-foreground">
                      {logs.filter(l => l.type.includes('login')).length} eventos
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Verificaciones</p>
                    <p className="text-sm text-muted-foreground">
                      {logs.filter(l => l.type.includes('verify')).length} eventos
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Audit Log */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Registro de Auditoría
              </CardTitle>
              <CardDescription>Timeline completo de eventos de seguridad</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {logs.map((log) => {
                  const Icon = getIcon(log.type);
                  return (
                    <div key={log.id} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-accent/5 transition-colors">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        log.status === 'success' ? 'bg-green-100' :
                        log.status === 'warning' ? 'bg-yellow-100' :
                        log.status === 'error' ? 'bg-red-100' : 'bg-blue-100'
                      }`}>
                        <Icon className={`w-5 h-5 ${
                          log.status === 'success' ? 'text-green-600' :
                          log.status === 'warning' ? 'text-yellow-600' :
                          log.status === 'error' ? 'text-red-600' : 'text-blue-600'
                        }`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <p className="font-medium mb-1">{log.action}</p>
                            <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <User className="w-3 h-3" />
                                {log.user}
                              </span>
                              <span>•</span>
                              <span>{log.timestamp}</span>
                              <span>•</span>
                              <span className="font-mono text-xs">IP: {log.ip}</span>
                              {log.hash && (
                                <>
                                  <span>•</span>
                                  <span className="font-mono text-xs">Hash: {log.hash}</span>
                                </>
                              )}
                            </div>
                          </div>
                          {getStatusBadge(log.status)}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  );
                })}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-6">
                <p className="text-sm text-muted-foreground">
                  Mostrando {logs.length} de {logs.length} eventos
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled>Anterior</Button>
                  <Button variant="outline" size="sm">Siguiente</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
