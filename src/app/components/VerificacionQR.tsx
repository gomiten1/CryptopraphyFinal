import { useEffect, useRef, useState } from "react";
import { QrCode, CheckCircle2, Shield, User, Calendar, Scan, XCircle, Loader2, RefreshCw, Download } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import Sidebar from "./Sidebar";
import supabase from "../lib/supabase";

type ProfileRow = {
  id: string;
  full_name: string | null;
  rol: string | null;
  metadata: Record<string, unknown> | null;
};

type QrPayload = {
  token: string;
};

type QrTokenRow = {
  id: string;
  alumno_id: string | null;
  empresa_id: string | null;
  vacante_id: string | null;
  token: string;
  payload: Record<string, unknown> | null;
  creado_en: string | null;
  validado_en: string | null;
  validado_por: string | null;
};

type VacancyRow = {
  id: string;
  titulo: string;
  descripcion: string | null;
  empresa_id: string | null;
  cupo_disponible: number | null;
};

export default function VerificacionQR({ onNavigate }: { onNavigate: (view: string) => void }) {
  const [profile, setProfile] = useState<ProfileRow | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingTokens, setLoadingTokens] = useState(false);
  const [loadingVacancies, setLoadingVacancies] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [empresaId, setEmpresaId] = useState('');
  const [selectedVacancyId, setSelectedVacancyId] = useState('');
  const [vacancies, setVacancies] = useState<VacancyRow[]>([]);
  const [token, setToken] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [generatedAt, setGeneratedAt] = useState<string | null>(null);
  const [qrTokens, setQrTokens] = useState<QrTokenRow[]>([]);
  const qrCodeRef = useRef<HTMLDivElement | null>(null);

  const loadQrTokens = async (alumnoId: string) => {
    setLoadingTokens(true);

    const { data, error: tokensError } = await supabase
      .from('qr_tokens')
      .select('id, alumno_id, empresa_id, vacante_id, token, payload, creado_en, validado_en, validado_por')
      .eq('alumno_id', alumnoId)
      .order('creado_en', { ascending: false });

    if (tokensError) {
      setError(tokensError.message);
      setQrTokens([]);
    } else {
      setQrTokens((data ?? []) as QrTokenRow[]);
    }

    setLoadingTokens(false);
  };

  useEffect(() => {
    const loadProfile = async () => {
      setLoadingProfile(true);
      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData.session?.user?.id;

      if (!userId) {
        setError('No hay sesión activa. Inicia sesión para generar tu QR.');
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
        void loadQrTokens((data as ProfileRow).id);
      }

      setLoadingProfile(false);
    };

    loadProfile();
  }, []);

  useEffect(() => {
    const loadVacancies = async () => {
      setLoadingVacancies(true);

      const { data, error: vacanciesError } = await supabase
        .from('vacantes')
        .select('id,titulo,descripcion,empresa_id,cupo_disponible')
        .eq('activo', true)
        .gt('cupo_disponible', 0)
        .order('creado_en', { ascending: false });

      if (vacanciesError) {
        setError(vacanciesError.message);
        setVacancies([]);
      } else {
        setVacancies((data ?? []) as VacancyRow[]);
      }

      setLoadingVacancies(false);
    };

    loadVacancies();
  }, []);

  const handleGenerateQr = async () => {
    setGenerating(true);
    setError(null);

    try {
      const alumnoId = profile?.id;
      if (!alumnoId) {
        throw new Error('No se encontró tu perfil de alumno.');
      }

      if (!empresaId.trim()) {
        throw new Error('Ingresa el ID de la empresa receptora.');
      }

      if (!selectedVacancyId.trim()) {
        throw new Error('Selecciona una vacante para generar el QR asociado.');
      }

      const { data, error: invokeError } = await supabase.functions.invoke<QrPayload>('crypto-qr', {
        body: {
          alumno_id: alumnoId,
          empresa_id: empresaId.trim(),
          vacante_id: selectedVacancyId,
        },
      });

      if (invokeError) {
        throw invokeError;
      }

      if (!data?.token) {
        throw new Error('La función no devolvió un token válido.');
      }

      setToken(data.token);
      setGeneratedAt(new Date().toLocaleString('es-MX'));
      if (profile?.id) {
        await loadQrTokens(profile.id);
      }
    } catch (invokeError) {
      setError(invokeError instanceof Error ? invokeError.message : 'No se pudo generar el QR');
    } finally {
      setGenerating(false);
    }
  };

  const handleVacancyChange = (vacancyId: string) => {
    setSelectedVacancyId(vacancyId);

    if (!vacancyId) {
      setEmpresaId('');
      return;
    }

    const selectedVacancy = vacancies.find((vacancy) => vacancy.id === vacancyId);
    setEmpresaId(selectedVacancy?.empresa_id ?? '');
  };

  const handleDownloadQr = () => {
    if (!token) {
      setError('Genera primero un QR para poder descargarlo.');
      return;
    }

    const svgElement = qrCodeRef.current?.querySelector('svg');
    if (!svgElement) {
      setError('No se encontró el QR para descargarlo.');
      return;
    }

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgElement);
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const objectUrl = URL.createObjectURL(svgBlob);
    const downloadLink = document.createElement('a');
    downloadLink.href = objectUrl;
    downloadLink.download = `qr-token-${new Date().toISOString().replace(/[:.]/g, '-')}.svg`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    downloadLink.remove();
    URL.revokeObjectURL(objectUrl);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar userType="alumno" onNavigate={onNavigate} currentView="qr-alumno" />

      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Mi Código QR Seguro</h1>
            <p className="text-muted-foreground">Identificación verificable con criptografía</p>
          </div>

          {error && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
              {error}
            </div>
          )}

          <div className="grid lg:grid-cols-2 gap-6">
            {/* QR Code Display */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <QrCode className="w-5 h-5" />
                  Código QR
                </CardTitle>
                <CardDescription>Válido para verificación de identidad</CardDescription>
              </CardHeader>
              <CardContent>
                {/* QR Code Visual */}
                <div className="relative">
                  <div className="aspect-square bg-white rounded-xl p-8 border-4 border-primary/20 mb-6">
                    <div className="w-full h-full bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-lg flex items-center justify-center relative overflow-hidden p-4">
                      {token ? (
                        <div ref={qrCodeRef} className="bg-white rounded-xl p-4 shadow-lg ring-1 ring-black/5">
                          <QRCodeSVG
                            value={token}
                            size={240}
                            level="M"
                            includeMargin={true}
                            bgColor="#FFFFFF"
                            fgColor="#111827"
                          />
                        </div>
                      ) : (
                        <div className="w-32 h-32 bg-white rounded-lg flex items-center justify-center shadow-lg">
                          <Shield className="w-16 h-16 text-primary" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <Badge variant={token ? 'default' : 'secondary'} className="gap-1">
                      {token ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                      {token ? 'QR generado' : 'Pendiente'}
                    </Badge>
                  </div>
                </div>
                    <Badge variant="default" className="mt-2">Verificado</Badge>
                {/* QR Info */}
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground mb-2">Token cifrado</p>
                    <p className="font-mono text-xs break-all min-h-10">
                      {token || 'Genera el QR para ver aquí el token cifrado.'}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1" onClick={handleDownloadQr} disabled={!token}>
                      <Download className="w-4 h-4 mr-2" />
                      Descargar QR
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Generado</p>
                      <p className="font-medium">{generatedAt || 'Pendiente'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Empresa receptora</p>
                      <p className="font-medium break-all">{empresaId || 'No definida'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Alumno</p>
                      <p className="font-medium break-all">{profile?.full_name || profile?.id || 'Cargando...'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Estado</p>
                      <p className="font-medium">{token ? 'Listo para escanear' : 'Sin generar'}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Selecciona una vacante publicada</p>
                      <Select value={selectedVacancyId} onValueChange={handleVacancyChange} disabled={loadingVacancies}>
                        <SelectTrigger>
                          <SelectValue placeholder={loadingVacancies ? 'Cargando vacantes...' : 'Elige una vacante'} />
                        </SelectTrigger>
                        <SelectContent>
                          {vacancies.map((vacancy) => (
                            <SelectItem key={vacancy.id} value={vacancy.id}>
                              {vacancy.titulo} {vacancy.empresa_id ? `· ${vacancy.empresa_id}` : ''}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">ID de la empresa receptora</p>
                      <Input
                        value={empresaId}
                        onChange={(e) => {
                          setSelectedVacancyId('');
                          setEmpresaId(e.target.value);
                        }}
                        placeholder="UUID de la empresa"
                      />
                    </div>
                    <div className="flex gap-3">
                      <Button className="flex-1" onClick={handleGenerateQr} disabled={generating || loadingProfile}>
                        {generating ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Scan className="w-4 h-4 mr-2" />}
                        Generar QR cifrado
                      </Button>
                      <Button variant="outline" className="flex-1" onClick={handleGenerateQr} disabled={generating || loadingProfile}>
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Regenerar
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Verification Details */}
            <div className="space-y-6">
              {/* Student Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Información del Alumno
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <User className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{profile?.full_name || 'Nombre no registrado'}</h3>
                      <p className="text-sm text-muted-foreground">{profile?.id || 'Matrícula no registrada'}</p>
                      <Badge variant="default" className="mt-2">Verificado</Badge>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Carrera:</span>
                      <span className="font-medium">{profile?.metadata?.career ? String(profile.metadata.career) : 'No registrado'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Semestre:</span>
                      <span className="font-medium">{profile?.metadata?.semester ? String(profile.metadata.semester) : 'No registrado'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Empresa:</span>
                      <span className="font-medium break-all">{empresaId || 'Pendiente de selección'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Estado:</span>
                      <Badge variant={token ? 'default' : 'secondary'}>{token ? 'Activo' : 'Pendiente'}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Cryptographic Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Detalles Criptográficos
                  </CardTitle>
                  <CardDescription>Información de seguridad del QR</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Algoritmo</p>
                      <Badge>AES-256-GCM</Badge>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Contenido cifrado</p>
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="font-mono text-xs break-all">{token || 'Aquí aparecerá el payload cifrado generado por crypto-qr.'}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Timestamp</p>
                      <p className="font-mono text-sm">{generatedAt || 'Pendiente'}</p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Nonce</p>
                      <p className="font-mono text-sm">{token ? token.split('.')[0] : 'Pendiente'}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Verification History */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Historial de QR
                  </CardTitle>
                  <CardDescription>Estado real de tus QR generados y si ya fueron validados por la empresa.</CardDescription>
                </CardHeader>
                <CardContent>
                  {loadingTokens ? (
                    <div className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">Cargando historial...</div>
                  ) : qrTokens.length === 0 ? (
                    <div className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">Aún no has generado QR para validar.</div>
                  ) : (
                    <div className="space-y-3">
                      {qrTokens.map((item) => (
                        <div key={item.id} className="rounded-lg border p-4 space-y-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge variant={item.validado_en ? 'default' : 'secondary'}>{item.validado_en ? 'Validado' : 'Pendiente'}</Badge>
                            <span className="text-sm font-medium break-all">Empresa: {item.empresa_id || 'No registrada'}</span>
                          </div>
                          <p className="text-xs text-muted-foreground break-all font-mono">{item.token}</p>
                          <p className="text-xs text-muted-foreground">Generado: {item.creado_en || 'No registrado'}</p>
                          <p className="text-xs text-muted-foreground">Validado: {item.validado_en || 'Aún no validado'}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Security Tips */}
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-blue-900 mb-1">Consejos de Seguridad</p>
                      <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
                        <li>No compartas capturas de tu QR</li>
                        <li>Regenera tu código si sospechas compromiso</li>
                        <li>Verifica el dominio al escanear</li>
                      </ul>
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
