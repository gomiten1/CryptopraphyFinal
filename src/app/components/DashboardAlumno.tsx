import { useEffect, useMemo, useState } from "react";
import { Clock, Building2, FileCheck, QrCode, Download, CheckCircle2, AlertCircle, TrendingUp, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import Sidebar from "./Sidebar";
import supabase from "../lib/supabase";

type ProfileRow = {
  id: string;
  full_name: string | null;
  rol: string | null;
  metadata: Record<string, unknown> | null;
};

type ProgressRow = {
  alumno_id: string;
  horas_aprobadas: number;
  horas_objetivo: number;
  ultimo_contrato_id: string | null;
  actualizado_en: string;
};

type ContractRow = {
  id: string;
  empresa_id: string | null;
  estado: 'pendiente' | 'aprobado' | 'rechazado' | null;
  hash_sha256: string | null;
  creado_en: string | null;
  aprobado_en: string | null;
  json_datos: Record<string, unknown> | null;
};

export default function DashboardAlumno({ onNavigate }: { onNavigate: (view: string) => void }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<ProfileRow | null>(null);
  const [progress, setProgress] = useState<ProgressRow | null>(null);
  const [latestContract, setLatestContract] = useState<ContractRow | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);

      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData.session?.user?.id;

      if (!userId) {
        setError('No hay sesión activa.');
        setLoading(false);
        return;
      }

      const [profileRes, progressRes, contractRes] = await Promise.all([
        supabase.from('profiles').select('id, full_name, rol, metadata').eq('id', userId).single(),
        supabase.from('servicio_social_progreso').select('alumno_id, horas_aprobadas, horas_objetivo, ultimo_contrato_id, actualizado_en').eq('alumno_id', userId).maybeSingle(),
        supabase
          .from('contratos_eventos')
          .select('id, empresa_id, estado, hash_sha256, creado_en, aprobado_en, json_datos')
          .eq('alumno_id', userId)
          .order('creado_en', { ascending: false })
          .limit(1)
          .maybeSingle(),
      ]);

      if (profileRes.error) {
        setError(profileRes.error.message);
      } else {
        setProfile((profileRes.data ?? null) as ProfileRow | null);
      }

      if (progressRes.error) {
        setError((current) => current ?? progressRes.error?.message ?? 'No se pudo cargar progreso');
      } else {
        setProgress((progressRes.data ?? null) as ProgressRow | null);
      }

      if (contractRes.error) {
        setError((current) => current ?? contractRes.error?.message ?? 'No se pudo cargar contrato');
      } else {
        setLatestContract((contractRes.data ?? null) as ContractRow | null);
      }

      setLoading(false);
    };

    loadData();
  }, []);

  const horasAprobadas = progress?.horas_aprobadas ?? 0;
  const horasObjetivo = progress?.horas_objetivo ?? 480;

  const progressPercent = useMemo(() => {
    if (!horasObjetivo || horasObjetivo <= 0) {
      return 0;
    }

    return Math.min(100, Math.max(0, Math.round((horasAprobadas / horasObjetivo) * 100)));
  }, [horasAprobadas, horasObjetivo]);

  const contractStatusLabel = latestContract?.estado === 'aprobado'
    ? 'Aprobado'
    : latestContract?.estado === 'rechazado'
      ? 'Rechazado'
      : latestContract
        ? 'Pendiente'
        : 'Pendiente';

  const contractStatusText = latestContract?.estado === 'aprobado'
    ? `Aprobado por administración el ${latestContract.aprobado_en ?? 'sin fecha'}`
    : latestContract?.estado === 'rechazado'
      ? 'Contrato rechazado por administración'
      : latestContract
        ? 'Contrato registrado y esperando validación de admin'
        : 'Sin contrato registrado todavía';

  const vacanteTitulo = latestContract?.json_datos?.vacante_titulo
    ? String(latestContract.json_datos.vacante_titulo)
    : 'No definida';

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar userType="alumno" onNavigate={onNavigate} currentView="dashboard-alumno" />

      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Mi Dashboard</h1>
            <p className="text-muted-foreground">Resumen general de tu servicio social</p>
          </div>

          {error && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
              {error}
            </div>
          )}

          {loading ? (
            <Card>
              <CardContent className="p-8 flex items-center text-muted-foreground">
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Cargando datos reales del servicio social...
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="grid md:grid-cols-4 gap-6 mb-8">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Clock className="w-6 h-6 text-primary" />
                      </div>
                      <Badge variant={horasAprobadas > 0 ? 'default' : 'secondary'}>{progressPercent}%</Badge>
                    </div>
                    <p className="text-2xl font-bold mb-1">{horasAprobadas} hrs</p>
                    <p className="text-sm text-muted-foreground">Horas aprobadas</p>
                    <div className="mt-4 bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: `${progressPercent}%` }}></div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Meta: {horasObjetivo} horas</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-secondary" />
                      </div>
                    </div>
                    <p className="text-xl font-bold mb-1 break-all">{latestContract?.empresa_id ?? 'No asignada'}</p>
                    <p className="text-sm text-muted-foreground">Empresa receptora</p>
                    <p className="text-xs text-muted-foreground mt-4">Vacante: {vacanteTitulo}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                        <FileCheck className="w-6 h-6 text-accent" />
                      </div>
                      <CheckCircle2 className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <p className="text-2xl font-bold mb-1">{contractStatusLabel}</p>
                    <p className="text-sm text-muted-foreground">Estado del Contrato</p>
                    <p className="text-xs text-muted-foreground mt-4">{contractStatusText}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-foreground" />
                      </div>
                    </div>
                    <p className="text-2xl font-bold mb-1">{Math.max(horasObjetivo - horasAprobadas, 0)} hrs</p>
                    <p className="text-sm text-muted-foreground">Horas restantes</p>
                    <Button variant="ghost" size="sm" className="mt-2 p-0 h-auto" onClick={() => onNavigate('vacantes-alumno')}>
                      Ver vacantes →
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Información del Alumno</CardTitle>
                      <CardDescription>Datos personales y académicos</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Nombre</p>
                          <p className="font-medium">{profile?.full_name ?? 'No registrado'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Matrícula</p>
                          <p className="font-medium">{profile?.id ?? 'No registrada'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Carrera</p>
                          <p className="font-medium">{profile?.metadata?.career ? String(profile.metadata.career) : 'No registrada'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Semestre</p>
                          <p className="font-medium">{profile?.metadata?.semester ? String(profile.metadata.semester) : 'No registrado'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Fecha de Inicio</p>
                          <p className="font-medium">{profile?.metadata?.start_date ? String(profile.metadata.start_date) : 'No registrada'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Fecha de Fin</p>
                          <p className="font-medium">{profile?.metadata?.end_date ? String(profile.metadata.end_date) : 'No registrada'}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Actividad Reciente</CardTitle>
                      <CardDescription>Historial de eventos y acciones</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {latestContract ? (
                        <div className="rounded-lg border p-4 text-sm">
                          <p className="font-medium mb-1">Contrato {latestContract.id.slice(0, 8)}</p>
                          <p className="text-muted-foreground">Registrado: {latestContract.creado_en ?? 'Sin fecha'}</p>
                          <p className="text-muted-foreground">Estado: {latestContract.estado ?? 'pendiente'}</p>
                        </div>
                      ) : (
                        <div className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
                          Aún no hay actividad registrada.
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <QrCode className="w-5 h-5" />
                        QR de Identificación
                      </CardTitle>
                      <CardDescription>Código seguro verificable</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="aspect-square bg-white rounded-lg p-4 mb-4">
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                          <QrCode className="w-32 h-32 text-primary" />
                        </div>
                      </div>
                      <Button className="w-full" onClick={() => onNavigate('qr-alumno')}>
                        Ver Detalles
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileCheck className="w-5 h-5" />
                        Contrato Digital
                      </CardTitle>
                      <CardDescription>Documento firmado digitalmente</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 bg-muted/40 border rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <CheckCircle2 className="w-5 h-5 text-muted-foreground" />
                            <span className="font-medium">{contractStatusLabel}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{contractStatusText}</p>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Firmado:</span>
                            <span>{latestContract?.creado_en ?? 'Pendiente'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Hash SHA-256:</span>
                            <span className="font-mono text-xs">{latestContract?.hash_sha256?.slice(0, 12) ?? 'No generado'}</span>
                          </div>
                        </div>
                        <Button variant="outline" className="w-full" onClick={() => onNavigate('contrato')}>
                          <Download className="w-4 h-4 mr-2" />
                          Ir al Contrato
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-yellow-200 bg-yellow-50">
                    <CardContent className="p-4">
                      <div className="flex gap-3">
                        <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-yellow-900 mb-1">Recordatorio</p>
                          <p className="text-sm text-yellow-700">
                            Tus horas sólo suman al progreso cuando admin aprueba el contrato.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
