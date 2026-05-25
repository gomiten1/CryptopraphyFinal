import { useEffect, useState } from "react";
import { QrCode, Shield, CheckCircle2, XCircle, Loader2, Scan, User, Building2 } from "lucide-react";
import Sidebar from "./Sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import supabase from "../lib/supabase";

type ProfileRow = {
  id: string;
  full_name: string | null;
  rol: string | null;
  metadata: Record<string, unknown> | null;
};

type VerifyQrResult = {
  verified?: boolean;
  payload?: {
    alumno_id?: string;
    empresa_id?: string;
    purpose?: string;
    issued_at?: string;
    nonce?: string;
  };
  matches?: {
    alumno_id?: boolean;
    empresa_id?: boolean;
  };
  algorithm?: string;
  error?: string;
};

export default function ValidarQrEmpresa({ onNavigate }: { onNavigate: (view: string) => void }) {
  const [profile, setProfile] = useState<ProfileRow | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [token, setToken] = useState('');
  const [result, setResult] = useState<VerifyQrResult | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      setLoadingProfile(true);
      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData.session?.user?.id;

      if (!userId) {
        setError('No hay sesión activa. Inicia sesión para validar QR.');
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

  const handleVerify = async () => {
    setVerifying(true);
    setError(null);

    try {
      if (!token.trim()) {
        throw new Error('Pega el token QR cifrado para validarlo.');
      }

      if (!profile?.id) {
        throw new Error('No se pudo obtener el ID de la empresa.');
      }

      const { data, error: invokeError } = await supabase.functions.invoke<VerifyQrResult>('verify-qr', {
        body: {
          token: token.trim(),
          expected_empresa_id: profile.id,
        },
      });

      if (invokeError) {
        throw invokeError;
      }

      setResult(data ?? { verified: false, error: 'No response from verify-qr' });
    } catch (invokeError) {
      setResult(null);
      setError(invokeError instanceof Error ? invokeError.message : 'No se pudo validar el QR');
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar userType="empresa" onNavigate={onNavigate} currentView="qr-validacion-empresa" />

      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-5xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Validación de QR</h1>
            <p className="text-muted-foreground">Decodifica y valida el QR del alumno contra tu empresa</p>
          </div>

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
              {error}
            </div>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scan className="w-5 h-5" />
                Escaneo y Validación
              </CardTitle>
              <CardDescription>Usa el token generado por el alumno y valida que pertenezca a tu empresa</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Empresa activa</p>
                  <div className="flex items-center gap-3 p-4 border rounded-lg bg-muted/30">
                    <Building2 className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">{profile?.full_name || 'Cargando...'}</p>
                      <p className="text-xs text-muted-foreground font-mono">{profile?.id || 'Sin sesión'}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Estado</p>
                  <div className="flex items-center gap-3 p-4 border rounded-lg bg-muted/30">
                    {result?.verified ? <CheckCircle2 className="w-5 h-5 text-green-600" /> : <XCircle className="w-5 h-5 text-muted-foreground" />}
                    <div>
                      <p className="font-medium">{result?.verified ? 'QR válido' : 'Pendiente'}</p>
                      <p className="text-xs text-muted-foreground">{result?.algorithm || 'AES-256-GCM'}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Token QR cifrado</p>
                <Input
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  placeholder="Pega aquí el token cifrado del alumno"
                />
              </div>

              <div className="flex gap-3">
                <Button onClick={handleVerify} disabled={verifying || loadingProfile}>
                  {verifying ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Shield className="w-4 h-4 mr-2" />}
                  Validar QR
                </Button>
                <Button variant="outline" onClick={() => setToken('')} disabled={verifying || loadingProfile}>
                  Limpiar
                </Button>
              </div>
            </CardContent>
          </Card>

          {result && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <QrCode className="w-5 h-5" />
                  Resultado de Validación
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  {result.verified ? <Badge variant="success">Válido</Badge> : <Badge variant="destructive">Inválido</Badge>}
                  <Badge variant="outline">{result.algorithm || 'AES-256-GCM'}</Badge>
                </div>

                <div className="grid gap-4 md:grid-cols-2 text-sm">
                  <div className="p-4 border rounded-lg">
                    <p className="text-muted-foreground mb-2">Alumno</p>
                    <p className="font-medium break-all flex items-center gap-2"><User className="w-4 h-4" />{result.payload?.alumno_id || 'N/D'}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-muted-foreground mb-2">Empresa</p>
                    <p className="font-medium break-all flex items-center gap-2"><Building2 className="w-4 h-4" />{result.payload?.empresa_id || 'N/D'}</p>
                  </div>
                </div>

                <div className="text-sm space-y-1">
                  <p><span className="text-muted-foreground">Coincidencia alumno:</span> {result.matches?.alumno_id ? 'Sí' : 'No'}</p>
                  <p><span className="text-muted-foreground">Coincidencia empresa:</span> {result.matches?.empresa_id ? 'Sí' : 'No'}</p>
                  <p><span className="text-muted-foreground">Propósito:</span> {result.payload?.purpose || 'N/D'}</p>
                  <p><span className="text-muted-foreground">Emitido:</span> {result.payload?.issued_at || 'N/D'}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}