import { User, Mail, Phone, GraduationCap, FileText, Upload, CheckCircle2, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { useState } from "react";

export default function FormularioRegistro({ onNavigate }: { onNavigate: (view: string) => void }) {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    matricula: '',
    carrera: '',
    semestre: '',
    email: '',
    telefono: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => onNavigate('landing')} className="flex items-center gap-2 hover:opacity-80">
            <div>
              <h1 className="text-xl font-bold text-foreground">Feria de servicio social</h1>
              <p className="text-sm text-muted-foreground">Universidad Nacional</p>
            </div>
          </button>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {step === 'form' && (
          <>
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-3">Registro al proyecto</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Completa este formulario para postularte al proyecto que elegiste. Te tomará solo unos minutos.
              </p>
            </div>

            {/* Selected Project */}
            <Card className="mb-8 border-l-4 border-l-primary">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <Badge variant="secondary" className="mb-2">Proyecto seleccionado</Badge>
                    <h3 className="text-xl font-bold mb-1">Desarrollador web frontend</h3>
                    <p className="text-sm text-muted-foreground">TechCorp • Tecnología • Ciudad de México</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <Card>
                <CardHeader>
                  <CardTitle>Tus datos personales</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Asegúrate de que toda la información sea correcta. La usaremos para contactarte.
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Nombre */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Nombre(s) <span className="text-destructive">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        required
                        className="pl-10"
                        placeholder="Escribe tu nombre"
                        value={formData.nombre}
                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Apellidos */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Apellidos <span className="text-destructive">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        required
                        className="pl-10"
                        placeholder="Escribe tus apellidos"
                        value={formData.apellidos}
                        onChange={(e) => setFormData({ ...formData, apellidos: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Matrícula y Carrera */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Número de matrícula <span className="text-destructive">*</span>
                      </label>
                      <div className="relative">
                        <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          required
                          className="pl-10"
                          placeholder="Ej: A2021001234"
                          value={formData.matricula}
                          onChange={(e) => setFormData({ ...formData, matricula: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Semestre actual <span className="text-destructive">*</span>
                      </label>
                      <div className="relative">
                        <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          required
                          className="pl-10"
                          placeholder="Ej: 8"
                          value={formData.semestre}
                          onChange={(e) => setFormData({ ...formData, semestre: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Carrera */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Carrera <span className="text-destructive">*</span>
                    </label>
                    <div className="relative">
                      <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        required
                        className="pl-10"
                        placeholder="Ej: Ingeniería en Sistemas Computacionales"
                        value={formData.carrera}
                        onChange={(e) => setFormData({ ...formData, carrera: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Correo electrónico <span className="text-destructive">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        required
                        type="email"
                        className="pl-10"
                        placeholder="tu.correo@universidad.edu.mx"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Te enviaremos toda la información importante a este correo
                    </p>
                  </div>

                  {/* Teléfono */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Teléfono celular <span className="text-destructive">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        required
                        type="tel"
                        className="pl-10"
                        placeholder="55 1234 5678"
                        value={formData.telefono}
                        onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Documentos */}
                  <div className="border-t pt-6">
                    <h3 className="font-semibold mb-4">Documentos requeridos</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Por favor, sube los siguientes archivos en formato PDF. El tamaño máximo por archivo es de 5 MB.
                    </p>
                    <div className="space-y-3">
                      <div className="border-2 border-dashed rounded-lg p-4 hover:border-primary transition-colors cursor-pointer">
                        <div className="flex items-center gap-3">
                          <Upload className="w-5 h-5 text-muted-foreground" />
                          <div className="flex-1">
                            <p className="text-sm font-medium">Comprobante de inscripción</p>
                            <p className="text-xs text-muted-foreground">Arrastra el archivo aquí o haz clic para seleccionar</p>
                          </div>
                        </div>
                      </div>
                      <div className="border-2 border-dashed rounded-lg p-4 hover:border-primary transition-colors cursor-pointer">
                        <div className="flex items-center gap-3">
                          <Upload className="w-5 h-5 text-muted-foreground" />
                          <div className="flex-1">
                            <p className="text-sm font-medium">Carta de presentación (opcional)</p>
                            <p className="text-xs text-muted-foreground">Si quieres compartir más sobre ti, este es un buen espacio</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Info Box */}
                  <div className="bg-secondary/20 border border-secondary/40 rounded-lg p-4">
                    <div className="flex gap-3">
                      <AlertCircle className="w-5 h-5 text-foreground flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium mb-1">Antes de continuar</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Revisa que todos tus datos estén correctos. Una vez enviado el formulario, la organización recibirá tu solicitud y se pondrá en contacto contigo.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => onNavigate('catalogo')}
                      className="flex-1"
                    >
                      Volver al catálogo
                    </Button>
                    <Button type="submit" className="flex-1">
                      Enviar mi solicitud
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </form>
          </>
        )}

        {step === 'success' && (
          <div className="py-12 text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-4">¡Tu solicitud ha sido enviada!</h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Hemos recibido tu información correctamente. La organización revisará tu perfil y te contactaremos pronto.
            </p>

            <Card className="max-w-2xl mx-auto mb-8">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">¿Qué sigue ahora?</h3>
                <div className="space-y-4 text-left">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 font-bold">
                      1
                    </div>
                    <div>
                      <p className="font-medium">Revisión de tu solicitud</p>
                      <p className="text-sm text-muted-foreground">
                        La organización revisará tu perfil en los próximos 3 a 5 días hábiles.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 font-bold">
                      2
                    </div>
                    <div>
                      <p className="font-medium">Te contactaremos</p>
                      <p className="text-sm text-muted-foreground">
                        Recibirás un correo con la respuesta y los próximos pasos a seguir.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 font-bold">
                      3
                    </div>
                    <div>
                      <p className="font-medium">Comienza tu servicio</p>
                      <p className="text-sm text-muted-foreground">
                        Si tu solicitud es aceptada, te daremos toda la información para que inicies.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => onNavigate('catalogo')}>
                Explorar más proyectos
              </Button>
              <Button variant="outline" onClick={() => onNavigate('landing')}>
                Volver al inicio
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
