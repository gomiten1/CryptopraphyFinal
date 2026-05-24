import { useState } from "react";
import { Shield, User, Building2, GraduationCap, Lock, Mail, Eye, EyeOff } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

import supabase from '../lib/supabase'

export default function LoginPage({ onNavigate }: { onNavigate: (view: string) => void }) {
  const [activeTab, setActiveTab] = useState<'alumno' | 'empresa' | 'admin'>('alumno');
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  // Authenticate or register with Supabase and redirect by role
  const handleSubmit = async () => {
    setLoading(true)
    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error

        const user = data.user
        if (!user) throw new Error('No user returned from Supabase')

        const { data: profile, error: pErr } = await supabase
          .from('profiles')
          .select('rol')
          .eq('id', user.id)
          .single()

        if (pErr) {
          console.warn('profiles lookup failed:', pErr.message)
        }

        const role = profile?.rol || 'alumno'
        if (role === 'alumno') onNavigate('dashboard-alumno')
        else if (role === 'empresa') onNavigate('dashboard-empresa')
        else onNavigate('dashboard-admin')
        return
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            rol: activeTab,
          },
        },
      })

      if (error) throw error

      const user = data.user
      if (data.session && user) {
        const { data: profile, error: pErr } = await supabase
          .from('profiles')
          .select('rol')
          .eq('id', user.id)
          .single()

        if (pErr) {
          console.warn('profiles lookup failed:', pErr.message)
        }

        const role = profile?.rol || 'alumno'
        if (role === 'alumno') onNavigate('dashboard-alumno')
        else if (role === 'empresa') onNavigate('dashboard-empresa')
        else onNavigate('dashboard-admin')
      } else {
        alert('Cuenta creada. Confirma tu correo para completar el registro y luego inicia sesión.')
        setIsLogin(true)
      }
    } catch (err: any) {
      if (!isLogin && String(err?.message || '').toLowerCase().includes('user returned from supabase')) {
        alert('Cuenta creada. Confirma tu correo para completar el registro y luego inicia sesión.')
        setIsLogin(true)
        return
      }

      alert(err.message || 'Error iniciando sesión')
    } finally {
      setLoading(false)
    }
  }

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
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
              {!isLogin && (
                <div>
                  <label className="text-sm font-medium mb-2 block">Nombre Completo</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input value={fullName} onChange={(e) => setFullName(e.target.value)} className="pl-10" placeholder="Juan Pérez" />
                  </div>
                </div>
              )}

              <div>
                <label className="text-sm font-medium mb-2 block">Correo Electrónico</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input value={email} onChange={(e: any) => setEmail(e.target.value)} type="email" className="pl-10" placeholder="correo@ejemplo.com" />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Contraseña</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    value={password}
                    onChange={(e: any) => setPassword(e.target.value)}
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

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Procesando...' : isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
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
