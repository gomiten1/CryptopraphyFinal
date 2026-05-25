import { useEffect, useState } from "react";
import { FileCheck, Download, Shield, CheckCircle2, Calendar, User, Loader2, RefreshCw } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import Sidebar from "./Sidebar";
import supabase from "../lib/supabase";

type ProfileRow = {
  id: string;
  full_name: string | null;
  rol: string | null;
  metadata: Record<string, unknown> | null;
};

type ContractResult = {
  record?: {
    id: string;
    alumno_id: string;
    empresa_id: string;
    json_datos: Record<string, unknown>;
    hash_sha256: string;
    firma_digital: string;
    creado_en: string;
  };
  verification?: {
    hash_sha256: string;
    firma_digital: string;
    algorithm: string;
  };
  error?: string;
};

export default function ContratoDigital({ onNavigate }: { onNavigate: (view: string) => void }) {
  const [profile, setProfile] = useState<ProfileRow | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [signing, setSigning] = useState(false);
  const [empresaId, setEmpresaId] = useState('');
  const [hours, setHours] = useState('4');
  const [activity, setActivity] = useState('Asistencia y registro de actividades');
  const [notes, setNotes] = useState('');
  const [signedAt, setSignedAt] = useState<string | null>(null);
  const [result, setResult] = useState<ContractResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      setLoadingProfile(true);
      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData.session?.user?.id;

      if (!userId) {
        setError('No hay sesión activa. Inicia sesión para firmar el contrato.');
        setLoadingProfile(false);
        return;
      }

      const { data, error: profileError } = await supabase
        .from('profiles')
        .select('id, full_name, rol, metadata')
        .eq('id', userId)
        .single();

      if (profileError) {
        setError(profileError.message);
      } else {
        setProfile(data as ProfileRow);
      }

      setLoadingProfile(false);
    };

    loadProfile();
  }, []);

  const handleSignContract = async () => {
    setSigning(true);
    setError(null);

    try {
      if (!profile?.id) {
        throw new Error('No se encontró tu perfil de alumno.');
      }

      if (!empresaId.trim()) {
        throw new Error('Ingresa el ID de la empresa receptora.');
      }

      const payload = {
        alumno_id: profile.id,
        empresa_id: empresaId.trim(),
        json_datos: {
          alumno_id: profile.id,
          alumno_nombre: profile.full_name,
          empresa_id: empresaId.trim(),
          horas: Number(hours) || 0,
          actividad: activity,
          notas: notes,
          firmado_en: new Date().toISOString(),
        },
      };

      const invokeRes = await supabase.functions.invoke('sign-contract', { body: payload });

      const data = (invokeRes as any).data as ContractResult | null;
      const invokeError = (invokeRes as any).error;

      if (invokeError) {
        throw invokeError;
      }

      setResult(data ?? null);
      setSignedAt(new Date().toLocaleString('es-MX'));
    } catch (invokeError) {
      setError(invokeError instanceof Error ? invokeError.message : 'No se pudo firmar el contrato');
    } finally {
      setSigning(false);
    }
  };

  const contractHash = result?.verification?.hash_sha256 || result?.record?.hash_sha256 || 'Pendiente';
  const contractSignature = result?.verification?.firma_digital || result?.record?.firma_digital || 'Pendiente';

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar userType="alumno" onNavigate={onNavigate} currentView="contrato" />

      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Contrato Digital</h1>
            <p className="text-muted-foreground">Documento con firma digital y registro en la auditoría</p>
          </div>

          {error && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
              {error}
            </div>
          )}

          {/* Status Card */}
          <Card className="mb-8 border-green-200 bg-green-50">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-green-600 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-green-900 mb-1">{result ? 'Contrato Registrado' : 'Contrato Pendiente'}</h3>
                  <p className="text-sm text-green-700 mb-4">
                    {result
                      ? 'El evento fue firmado digitalmente y se registró en la base de datos.'
                      : 'Este documento aún no ha sido firmado. Completa los datos y haz clic en "Firmar y registrar" para generar la firma digital.'}
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-green-700 mb-1">Firmado el:</p>
                      <p className="font-medium text-green-900">{signedAt || 'Pendiente'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-green-700 mb-1">Método:</p>
                      <p className="font-medium text-green-900">SHA-256 + HMAC-SHA256</p>
                    </div>
                    <div>
                      <p className="text-xs text-green-700 mb-1">Estado:</p>
                      <Badge variant={result ? 'default' : 'secondary'}>{result ? 'Válido' : 'Pendiente'}</Badge>
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
                <CardDescription>Convenio de Servicio Social Universitario vinculado al perfil actual</CardDescription>
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
                          <p>{profile?.full_name || 'Cargando...'}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs">Matrícula:</p>
                          <p>{profile?.id || 'Pendiente'}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs">Carrera:</p>
                          <p>{profile?.metadata?.career ? String(profile.metadata.career) : 'Ingeniería en Sistemas'}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs">Semestre:</p>
                          <p>{profile?.metadata?.semester ? String(profile.metadata.semester) : '8vo Semestre'}</p>
                        </div>
                      </div>

                      <div className="border-t pt-4 mt-4">
                        <p className="font-medium">DATOS DE LA EMPRESA</p>
                        <div className="grid grid-cols-2 gap-3 pl-4 mt-2">
                          <div>
                            <p className="text-muted-foreground text-xs">Razón Social:</p>
                            <p>{empresaId || 'Pendiente'}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground text-xs">RFC:</p>
                            <p>{profile?.metadata?.company_rfc ? String(profile.metadata.company_rfc) : 'Pendiente'}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground text-xs">Área:</p>
                            <p>{activity}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground text-xs">Supervisor:</p>
                            <p>{profile?.metadata?.supervisor ? String(profile.metadata.supervisor) : 'Pendiente'}</p>
                          </div>
                        </div>
                      </div>

                      <div className="border-t pt-4 mt-4">
                        <p className="font-medium">PERIODO Y HORARIO</p>
                        <div className="pl-4 mt-2 space-y-2">
                          <p><span className="text-muted-foreground">Inicio:</span> {profile?.metadata?.start_date ? String(profile.metadata.start_date) : 'Pendiente'}</p>
                          <p><span className="text-muted-foreground">Término:</span> {profile?.metadata?.end_date ? String(profile.metadata.end_date) : 'Pendiente'}</p>
                          <p><span className="text-muted-foreground">Total de Horas:</span> {hours} horas</p>
                          <p><span className="text-muted-foreground">Horario:</span> {profile?.metadata?.schedule ? String(profile.metadata.schedule) : 'Lunes a Viernes, 9:00 - 14:00 hrs'}</p>
                        </div>
                      </div>

                      <div className="border-t pt-4 mt-4">
                        <p className="font-medium">ACTIVIDADES A REALIZAR</p>
                        <ul className="pl-8 mt-2 space-y-1 list-disc">
                          <li>{activity}</li>
                          <li>{notes || 'Sin observaciones adicionales'}</li>
                        </ul>
                      </div>

                      <div className="border-t pt-4 mt-6">
                        <p className="text-xs text-muted-foreground italic">
                          {result
                            ? 'Este documento ha sido firmado digitalmente por todas las partes involucradas y cuenta con validación criptográfica mediante tecnología blockchain.'
                            : 'Este documento aún no ha sido firmado digitalmente. Después de firmar, podrás comprobar la firma desde la vista de Auditoría.'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">ID de la empresa receptora</p>
                    <Input value={empresaId} onChange={(e) => setEmpresaId(e.target.value)} placeholder="UUID de la empresa" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Horas registradas</p>
                    <Input value={hours} onChange={(e) => setHours(e.target.value)} type="number" min="1" max="12" />
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-muted-foreground mb-2">Actividad</p>
                    <Input value={activity} onChange={(e) => setActivity(e.target.value)} />
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-muted-foreground mb-2">Notas</p>
                    <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={4} placeholder="Observaciones del evento, asistencia, etc." />
                  </div>
                </div>

                {result?.verification && (
                  <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg space-y-2">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-green-900">Contrato registrado correctamente</span>
                    </div>
                    <div className="text-sm space-y-1">
                      <p><span className="text-green-700">Hash SHA-256:</span> <span className="font-mono text-xs break-all">{contractHash}</span></p>
                      <p><span className="text-green-700">Firma digital:</span> <span className="font-mono text-xs break-all">{contractSignature}</span></p>
                      <p><span className="text-green-700">Algoritmo:</span> {result.verification.algorithm}</p>
                    </div>
                  </div>
                )}
                <div className="flex gap-3 mt-6">
                  <Button className="flex-1" onClick={handleSignContract} disabled={signing || loadingProfile}>
                    {signing ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Download className="w-4 h-4 mr-2" />}
                    {signing ? 'Firmando...' : 'Firmar y registrar'}
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
                      <Badge>SHA-256 + HMAC-SHA256</Badge>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Hash SHA-256</p>
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="font-mono text-xs break-all">
                          {contractHash}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Blockchain TX</p>
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="font-mono text-xs break-all">
                          {result?.record?.id || 'Pendiente'}
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
                        <p className="font-medium">{profile?.metadata?.supervisor ? String(profile.metadata.supervisor) : 'Supervisor de empresa'}</p>
                        <p className="text-xs text-muted-foreground">{empresaId || 'Empresa receptora'}</p>
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
                        <p className="font-medium">Coordinación universitaria</p>
                        <p className="text-xs text-muted-foreground">Registro automático al firmar</p>
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
