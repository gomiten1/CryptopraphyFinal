import { X, Briefcase, CheckCircle2, MapPin, Clock, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";

interface ModalNuevaVacanteProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalNuevaVacante({ isOpen, onClose }: ModalNuevaVacanteProps) {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    title: '',
    area: '',
    description: '',
    requirements: '',
    hours: '480',
    slots: '2',
    location: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              {step === 'form' ? 'Nueva Vacante' : 'Vacante Publicada'}
            </CardTitle>
            <button
              onClick={onClose}
              className="p-2 hover:bg-accent rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {step === 'form' && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Título de la Vacante *</label>
                <Input
                  required
                  placeholder="Título de la vacante"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Área *</label>
                  <Input
                    required
                    placeholder="Área o especialidad"
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Ubicación *</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      required
                      className="pl-10"
                      placeholder="Ciudad"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Descripción *</label>
                <textarea
                  required
                  className="flex w-full rounded-lg border border-input bg-input-background px-3 py-2 ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]"
                  placeholder="Describe las actividades y responsabilidades"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Requisitos</label>
                <textarea
                  className="flex w-full rounded-lg border border-input bg-input-background px-3 py-2 ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 min-h-[80px]"
                  placeholder="Lista de conocimientos o habilidades"
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Horas Requeridas *</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      required
                      type="number"
                      className="pl-10"
                      value={formData.hours}
                      onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Cupos Disponibles *</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      required
                      type="number"
                      min="1"
                      className="pl-10"
                      value={formData.slots}
                      onChange={(e) => setFormData({ ...formData, slots: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                  Cancelar
                </Button>
                <Button type="submit" className="flex-1">
                  <Briefcase className="w-4 h-4 mr-2" />
                  Publicar Vacante
                </Button>
              </div>
            </form>
          )}

          {step === 'success' && (
            <div className="py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-center mb-2">¡Vacante Publicada!</h3>
              <p className="text-center text-muted-foreground mb-6">
                La vacante está ahora visible para estudiantes
              </p>

              <div className="p-4 bg-muted rounded-lg mb-6">
                <h4 className="font-semibold mb-3">{formData.title}</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">Área:</span>
                    <p className="font-medium">{formData.area}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Ubicación:</span>
                    <p className="font-medium">{formData.location}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Horas:</span>
                    <p className="font-medium">{formData.hours} hrs</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Cupos:</span>
                    <p className="font-medium">{formData.slots}</p>
                  </div>
                </div>
              </div>

              <Button onClick={onClose} className="w-full">
                Entendido
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
