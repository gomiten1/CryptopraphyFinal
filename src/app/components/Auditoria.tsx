import { useEffect, useMemo, useState } from "react";
import { Shield, Activity, Search, CheckCircle2, XCircle, AlertTriangle, Lock, QrCode, FileCheck, User, Eye, Loader2, RefreshCw } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Sidebar from "./Sidebar";
import supabase from "../lib/supabase";

type ContractRow = {
  id: string;
  alumno_id: string | null;
  empresa_id: string | null;
  vacante_id: string | null;
  estado: 'pendiente' | 'aprobado' | 'rechazado' | null;
  aprobado_en: string | null;
  aprobado_por: string | null;
  json_datos: Record<string, unknown> | null;
  hash_sha256: string | null;
  firma_digital: string | null;
  creado_en: string | null;
};

type VerifyContractResult = {
  verified?: boolean;
  matches?: {
    hash_sha256?: boolean;
    firma_digital?: boolean;
  };
  computed?: {
    hash_sha256?: string;
    firma_digital?: string;
  };
  stored?: {
    hash_sha256?: string;
    firma_digital?: string;
  };
  algorithm?: string;
  error?: string;
};

type ApproveContractResult = {
  approved?: boolean;
  already_approved?: boolean;
  horas_sumadas?: number;
  horas_aprobadas?: number;
  horas_objetivo?: number;
  estado?: string;
  error?: string;
};

export default function Auditoria({ onNavigate }: { onNavigate: (view: string) => void }) {
  const [contracts, setContracts] = useState<ContractRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [verifyingId, setVerifyingId] = useState<string | null>(null);
  const [approvingId, setApprovingId] = useState<string | null>(null);
  const [verificationById, setVerificationById] = useState<Record<string, VerifyContractResult>>({});
  const [approvalById, setApprovalById] = useState<Record<string, ApproveContractResult>>({});

  const loadContracts = async () => {
    setLoading(true);
    setError(null);

    const { data, error: fetchError } = await supabase
      .from('contratos_eventos')
      .select('id, alumno_id, empresa_id, vacante_id, estado, aprobado_en, aprobado_por, json_datos, hash_sha256, firma_digital, creado_en')
      .order('creado_en', { ascending: false });

    if (fetchError) {
      setError(fetchError.message);
      setContracts([]);
    } else {
      setContracts((data ?? []) as ContractRow[]);
    }

    setLoading(false);
  };

  const handleApproveContract = async (contract: ContractRow) => {
    setApprovingId(contract.id);
    setError(null);

    try {
      const { data, error: invokeError } = await supabase.functions.invoke<ApproveContractResult>('approve-contract', {
        body: { contract_id: contract.id },
      });

      if (invokeError) {
        throw invokeError;
      }

      const nextResult = data ?? { approved: false, error: 'No response from approve-contract' };

      setApprovalById((current) => ({
        ...current,
        [contract.id]: nextResult,
      }));

      if (nextResult.approved) {
        setContracts((current) =>
          current.map((item) =>
            item.id === contract.id
              ? {
                  ...item,
                  estado: 'aprobado',
                  aprobado_en: new Date().toISOString(),
                }
              : item,
          ),
        );
      }
    } catch (invokeError) {
      setApprovalById((current) => ({
        ...current,
        [contract.id]: {
          approved: false,
          error: invokeError instanceof Error ? invokeError.message : 'No se pudo aprobar el contrato',
        },
      }));
    } finally {
      setApprovingId(null);
    }
  };

  useEffect(() => {
    loadContracts();
  }, []);

  const handleVerifyContract = async (contract: ContractRow) => {
    setVerifyingId(contract.id);
    setError(null);

    try {
      const { data, error: invokeError } = await supabase.functions.invoke<VerifyContractResult>('verify-contract', {
        body: { record: contract },
      });

      if (invokeError) {
        throw invokeError;
      }

      setVerificationById((current) => ({
        ...current,
        [contract.id]: data ?? { verified: false, error: 'No response from verify-contract' },
      }));
    } catch (invokeError) {
      setVerificationById((current) => ({
        ...current,
        [contract.id]: {
          verified: false,
          error: invokeError instanceof Error ? invokeError.message : 'No se pudo verificar el contrato',
        },
      }));
    } finally {
      setVerifyingId(null);
    }
  };

  const filteredContracts = contracts.filter((contract) => {
    const term = search.toLowerCase();
    return [
      contract.id,
      contract.alumno_id ?? '',
      contract.empresa_id ?? '',
      contract.hash_sha256 ?? '',
      contract.firma_digital ?? '',
      JSON.stringify(contract.json_datos ?? {}),
    ].some((value) => value.toLowerCase().includes(term));
  });

  const stats = useMemo(() => {
    const verified = contracts.filter((contract) => verificationById[contract.id]?.verified === true).length;
    const invalid = contracts.filter((contract) => verificationById[contract.id]?.verified === false && verificationById[contract.id]).length;
    return { verified, invalid, total: contracts.length };
  }, [contracts, verificationById]);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar userType="admin" onNavigate={onNavigate} currentView="auditoria" />

      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Auditoría y Seguridad</h1>
              <p className="text-muted-foreground">Contratos reales desde Supabase y validación criptográfica</p>
            </div>
            <Button onClick={loadContracts}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refrescar
            </Button>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="border-l-4 border-l-green-600">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <p className="text-2xl font-bold mb-1">{stats.verified}</p>
                <p className="text-sm text-muted-foreground">Contratos Verificados</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-yellow-600">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-yellow-100 flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
                <p className="text-2xl font-bold mb-1">{stats.invalid}</p>
                <p className="text-sm text-muted-foreground">Verificaciones Fallidas</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-red-600">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center">
                    <XCircle className="w-6 h-6 text-red-600" />
                  </div>
                </div>
                <p className="text-2xl font-bold mb-1">{contracts.length === 0 ? 0 : contracts.length - stats.verified - stats.invalid}</p>
                <p className="text-sm text-muted-foreground">Pendientes de Verificación</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-primary">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <p className="text-2xl font-bold mb-1">{contracts.length === 0 ? '0%' : `${Math.round((stats.verified / contracts.length) * 100)}%`}</p>
                <p className="text-sm text-muted-foreground">Nivel de Integridad</p>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input className="pl-10" placeholder="Buscar por alumno, empresa, hash o firma..." value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <QrCode className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Contratos</p>
                    <p className="text-sm text-muted-foreground">{contracts.length} registros</p>
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
                    <p className="font-medium">Verificados</p>
                    <p className="text-sm text-muted-foreground">{stats.verified} eventos</p>
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
                    <p className="font-medium">Fallback</p>
                    <p className="text-sm text-muted-foreground">{stats.invalid} inconsistencias</p>
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
                    <p className="font-medium">Integridad</p>
                    <p className="text-sm text-muted-foreground">{contracts.length === 0 ? '0%' : `${Math.round((stats.verified / contracts.length) * 100)}%`}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Registro de Auditoría
              </CardTitle>
              <CardDescription>Contratos almacenados en la base y comprobación de hash/firma</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="py-16 flex items-center justify-center text-muted-foreground">
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Cargando contratos...
                </div>
              ) : error ? (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
                  <p className="font-medium mb-1">No fue posible cargar la auditoría</p>
                  <p className="text-sm">{error}</p>
                </div>
              ) : filteredContracts.length === 0 ? (
                <div className="py-16 text-center text-muted-foreground">
                  No hay contratos para auditar.
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredContracts.map((contract) => {
                    const result = verificationById[contract.id];
                    const approval = approvalById[contract.id];
                    const statusBadge = result
                      ? result.verified
                        ? <Badge variant="success" className="gap-1"><CheckCircle2 className="w-3 h-3" />Íntegro</Badge>
                        : <Badge variant="destructive" className="gap-1"><XCircle className="w-3 h-3" />Alterado</Badge>
                      : <Badge variant="outline">Sin verificar</Badge>;

                    const approvalBadge = contract.estado === 'aprobado'
                      ? <Badge variant="success">Aprobado</Badge>
                      : contract.estado === 'rechazado'
                        ? <Badge variant="destructive">Rechazado</Badge>
                        : <Badge variant="secondary">Pendiente admin</Badge>;

                    return (
                      <div key={contract.id} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-accent/5 transition-colors">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-blue-100">
                          <FileCheck className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2 gap-4">
                            <div className="flex-1 min-w-0">
                              <p className="font-medium mb-1">Contrato {contract.id.slice(0, 8)}</p>
                              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <User className="w-3 h-3" />
                                  {contract.alumno_id || 'Alumno no disponible'}
                                </span>
                                <span>•</span>
                                <span>{contract.creado_en || 'Sin fecha'}</span>
                                <span>•</span>
                                <span className="font-mono text-xs">Hash: {contract.hash_sha256?.slice(0, 16) ?? 'Pendiente'}</span>
                                <span>•</span>
                                {approvalBadge}
                              </div>
                              {result?.error && <p className="text-sm text-red-600 mt-2">{result.error}</p>}
                              {approval?.error && <p className="text-sm text-red-600 mt-2">{approval.error}</p>}
                              {result?.matches && (
                                <p className="text-xs text-muted-foreground mt-2">
                                  Hash {result.matches.hash_sha256 ? 'coincide' : 'no coincide'} · Firma {result.matches.firma_digital ? 'coincide' : 'no coincide'}
                                </p>
                              )}
                              {approval?.approved && (
                                <p className="text-xs text-green-700 mt-2">
                                  {approval.already_approved
                                    ? `Contrato ya aprobado previamente. Horas acumuladas: ${approval.horas_aprobadas ?? 0}`
                                    : `Aprobado. Se sumaron ${approval.horas_sumadas ?? 0} horas. Acumulado: ${approval.horas_aprobadas ?? 0}/${approval.horas_objetivo ?? 480}`}
                                </p>
                              )}
                            </div>
                            {statusBadge}
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleVerifyContract(contract)} disabled={verifyingId === contract.id}>
                            {verifyingId === contract.id ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Eye className="w-4 h-4 mr-2" />}
                            Verificar
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleApproveContract(contract)}
                            disabled={approvingId === contract.id || contract.estado === 'aprobado'}
                          >
                            {approvingId === contract.id ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <CheckCircle2 className="w-4 h-4 mr-2" />}
                            {contract.estado === 'aprobado' ? 'Ya aprobado' : 'Aprobar y aplicar'}
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="flex items-center justify-between mt-6">
                <p className="text-sm text-muted-foreground">
                  Mostrando {filteredContracts.length} de {contracts.length} contratos
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
