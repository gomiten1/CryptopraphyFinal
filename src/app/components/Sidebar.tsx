import { Shield, LayoutDashboard, User, Building2, Briefcase, FileText, QrCode, Settings, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

interface SidebarProps {
  userType: 'alumno' | 'empresa' | 'admin';
  onNavigate: (view: string) => void;
  currentView: string;
}

export default function Sidebar({ userType, onNavigate, currentView }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = {
    alumno: [
      { icon: LayoutDashboard, label: 'Dashboard', view: 'dashboard-alumno' },
      { icon: Briefcase, label: 'Vacantes', view: 'vacantes-alumno' },
      { icon: FileText, label: 'Mi Contrato', view: 'contrato' },
      { icon: QrCode, label: 'Mi QR', view: 'qr-alumno' },
      { icon: Settings, label: 'Configuración', view: 'settings' },
    ],
    empresa: [
      { icon: LayoutDashboard, label: 'Dashboard', view: 'dashboard-empresa' },
      { icon: Briefcase, label: 'Mis Vacantes', view: 'vacantes-empresa' },
      { icon: User, label: 'Alumnos', view: 'alumnos-empresa' },
      { icon: Settings, label: 'Configuración', view: 'settings' },
    ],
    admin: [
      { icon: LayoutDashboard, label: 'Dashboard', view: 'dashboard-admin' },
      { icon: User, label: 'Alumnos', view: 'alumnos-admin' },
      { icon: Building2, label: 'Empresas', view: 'empresas-admin' },
      { icon: Briefcase, label: 'Vacantes', view: 'vacantes-admin' },
      { icon: FileText, label: 'Auditoría', view: 'auditoria' },
      { icon: Settings, label: 'Configuración', view: 'settings' },
    ]
  };

  const items = menuItems[userType];

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 rounded-lg bg-primary text-white flex items-center justify-center"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-transform lg:translate-x-0 z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } w-64 flex flex-col`}
      >
        {/* Header */}
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-sidebar-accent flex items-center justify-center">
              <Shield className="w-6 h-6 text-sidebar-accent-foreground" />
            </div>
            <div>
              <h1 className="font-semibold">ServicioSeguro</h1>
              <p className="text-xs opacity-80">
                {userType === 'alumno' ? 'Estudiante' : userType === 'empresa' ? 'Empresa' : 'Administrador'}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {items.map((item) => (
            <button
              key={item.view}
              onClick={() => {
                onNavigate(item.view);
                if (window.innerWidth < 1024) setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                currentView === item.view
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'hover:bg-sidebar-accent/50 text-sidebar-foreground/80 hover:text-sidebar-foreground'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border">
          <Button
            variant="ghost"
            className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent"
            onClick={() => onNavigate('login')}
          >
            <LogOut className="w-5 h-5 mr-3" />
            Cerrar Sesión
          </Button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
