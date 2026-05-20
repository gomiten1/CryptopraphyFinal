import { useState } from "react";
import { Shield, User, Building2, GraduationCap, Lock, Mail, Eye, EyeOff } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

export default function LoginPage({ onNavigate }: { onNavigate: (view: string) => void }) {
  const [activeTab, setActiveTab] = useState<'alumno' | 'empresa' | 'admin'>('alumno');
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const handleLogin = () => {
    if (activeTab === 'alumno') onNavigate('dashboard-alumno');
    else if (activeTab === 'empresa') onNavigate('dashboard-empresa');
    else onNavigate('dashboard-admin');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Branding */}
        <div className="hidden lg:block">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">ServicioSeguro</h1>
              <p className="text-sm text-muted-foreground">Gestión Universitaria Segura</p>
            </div>
          </div>
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Bienvenido al sistema de servicio social
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Plataforma protegida con criptografía avanzada, firmas digitales y validación QR.
          </p>
          <div className="space-y-4">
            {[
              { icon: Shield, text: "Cifrado de datos end-to-end" },
              { icon: Lock, text: "Autenticación multifactor" },
              { icon: User, text: "Firma digital de contratos" }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-foreground">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Login Form */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-center mb-2">
              {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
            </CardTitle>
            <CardDescription className="text-center">
              Selecciona tu tipo de usuario
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* User Type Tabs */}
            <div className="grid grid-cols-3 gap-2 mb-6 p-1 bg-muted rounded-lg">
              <button
                onClick={() => setActiveTab('alumno')}
                className={`flex flex-col items-center gap-1 py-3 rounded-lg transition-all ${
                  activeTab === 'alumno' ? 'bg-white shadow-sm' : 'hover:bg-white/50'
                }`}
              >
                <GraduationCap className={`w-5 h-5 ${activeTab === 'alumno' ? 'text-primary' : 'text-muted-foreground'}`} />
                <span className={`text-xs font-medium ${activeTab === 'alumno' ? 'text-foreground' : 'text-muted-foreground'}`}>
                  Alumno
                </span>
              </button>
              <button
                onClick={() => setActiveTab('empresa')}
                className={`flex flex-col items-center gap-1 py-3 rounded-lg transition-all ${
                  activeTab === 'empresa' ? 'bg-white shadow-sm' : 'hover:bg-white/50'
                }`}
              >
                <Building2 className={`w-5 h-5 ${activeTab === 'empresa' ? 'text-primary' : 'text-muted-foreground'}`} />
                <span className={`text-xs font-medium ${activeTab === 'empresa' ? 'text-foreground' : 'text-muted-foreground'}`}>
                  Empresa
                </span>
              </button>
              <button
                onClick={() => setActiveTab('admin')}
                className={`flex flex-col items-center gap-1 py-3 rounded-lg transition-all ${
                  activeTab === 'admin' ? 'bg-white shadow-sm' : 'hover:bg-white/50'
                }`}
              >
                <Shield className={`w-5 h-5 ${activeTab === 'admin' ? 'text-primary' : 'text-muted-foreground'}`} />
                <span className={`text-xs font-medium ${activeTab === 'admin' ? 'text-foreground' : 'text-muted-foreground'}`}>
                  Admin
                </span>
              </button>
            </div>

            {/* Form */}
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
              {!isLogin && (
                <div>
                  <label className="text-sm font-medium mb-2 block">Nombre Completo</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input className="pl-10" placeholder="Juan Pérez" />
                  </div>
                </div>
              )}

              <div>
                <label className="text-sm font-medium mb-2 block">Correo Electrónico</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input type="email" className="pl-10" placeholder="correo@ejemplo.com" />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Contraseña</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    className="pl-10 pr-10"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {isLogin && (
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-muted-foreground">Recordarme</span>
                  </label>
                  <a href="#" className="text-primary hover:underline">
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
              )}

              <Button type="submit" className="w-full">
                {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
              </Button>

              <div className="text-center text-sm">
                <span className="text-muted-foreground">
                  {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
                </span>{' '}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-primary hover:underline font-medium"
                >
                  {isLogin ? 'Regístrate' : 'Inicia sesión'}
                </button>
              </div>
            </form>

            <div className="mt-6 pt-6 border-t">
              <button
                onClick={() => onNavigate('landing')}
                className="text-sm text-muted-foreground hover:text-foreground w-full text-center"
              >
                ← Volver al inicio
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
