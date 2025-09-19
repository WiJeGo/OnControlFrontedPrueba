"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Badge } from "@/src/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/src/components/ui/dialog"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Textarea } from "@/src/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { Plus, Calendar, AlertTriangle, Pill, FileText, Edit, Clock } from "lucide-react"
import data from "@/src/data/db"

export function TreatmentTrackingWireframe() {
  const { treatments, patients } = data
  const [selectedTreatmentIndex, setSelectedTreatmentIndex] = useState(0)
  const [isNewTreatmentOpen, setIsNewTreatmentOpen] = useState(false)
  const [isUpdateTreatmentOpen, setIsUpdateTreatmentOpen] = useState(false)
  const [isScheduleVisitOpen, setIsScheduleVisitOpen] = useState(false)
  const [isAddSymptomOpen, setIsAddSymptomOpen] = useState(false)
  const [isAddMedicationOpen, setIsAddMedicationOpen] = useState(false)

  const selectedTreatment = treatments[selectedTreatmentIndex]

  const handleNewTreatment = (formData: FormData) => {
    console.log("[v0] Creating new treatment:", Object.fromEntries(formData))
    setIsNewTreatmentOpen(false)
  }

  const handleUpdateTreatment = (formData: FormData) => {
    console.log("[v0] Updating treatment:", Object.fromEntries(formData))
    setIsUpdateTreatmentOpen(false)
  }

  const handleScheduleVisit = (formData: FormData) => {
    console.log("[v0] Scheduling visit:", Object.fromEntries(formData))
    setIsScheduleVisitOpen(false)
  }

  const handleAddSymptom = (formData: FormData) => {
    console.log("[v0] Adding symptom:", Object.fromEntries(formData))
    setIsAddSymptomOpen(false)
  }

  const handleAddMedication = (formData: FormData) => {
    console.log("[v0] Adding medication:", Object.fromEntries(formData))
    setIsAddMedicationOpen(false)
  }

  const handleMedicationStatusChange = (medicationName: string, newStatus: string) => {
    console.log("[v0] Changing medication status:", medicationName, newStatus)
  }

  const handleTimelineItemClick = (item: any) => {
    console.log("[v0] Viewing timeline item details:", item)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista de tratamientos activos */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Tratamientos Activos</CardTitle>
              <Dialog open={isNewTreatmentOpen} onOpenChange={setIsNewTreatmentOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="bg-[#FF5722] hover:bg-[#E64A19]">
                    <Plus className="h-4 w-4 mr-2" />
                    Nuevo
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Crear Nuevo Tratamiento</DialogTitle>
                  </DialogHeader>
                  <form action={handleNewTreatment} className="space-y-4">
                    <div>
                      <Label htmlFor="treatmentPatient">Paciente</Label>
                      <Select name="patientId" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar paciente" />
                        </SelectTrigger>
                        <SelectContent>
                          {patients.map((patient) => (
                            <SelectItem key={patient.id} value={patient.id.toString()}>
                              {patient.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="treatmentType">Tipo de Tratamiento</Label>
                      <Select name="treatmentType" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="quimioterapia">Quimioterapia</SelectItem>
                          <SelectItem value="radioterapia">Radioterapia</SelectItem>
                          <SelectItem value="inmunoterapia">Inmunoterapia</SelectItem>
                          <SelectItem value="cirugia">Cirugía</SelectItem>
                          <SelectItem value="hormonal">Terapia Hormonal</SelectItem>
                          <SelectItem value="paliativo">Cuidado Paliativo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="startDate">Fecha de Inicio</Label>
                        <Input id="startDate" name="startDate" type="date" required />
                      </div>
                      <div>
                        <Label htmlFor="duration">Duración Estimada</Label>
                        <Input id="duration" name="duration" placeholder="6 meses" required />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="cycles">Número de Ciclos</Label>
                        <Input id="cycles" name="cycles" type="number" placeholder="6" />
                      </div>
                      <div>
                        <Label htmlFor="priority">Prioridad</Label>
                        <Select name="priority" required>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar prioridad" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="high">Alta</SelectItem>
                            <SelectItem value="medium">Media</SelectItem>
                            <SelectItem value="low">Baja</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="protocol">Protocolo de Tratamiento</Label>
                      <Textarea id="protocol" name="protocol" placeholder="Detalles del protocolo médico..." />
                    </div>
                    <div>
                      <Label htmlFor="objectives">Objetivos del Tratamiento</Label>
                      <Textarea id="objectives" name="objectives" placeholder="Objetivos terapéuticos..." />
                    </div>
                    <Button type="submit" className="w-full">
                      Crear Tratamiento
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {treatments.map((treatment, i) => (
              <div
                key={i}
                className={`p-3 border rounded-lg cursor-pointer hover:bg-muted/50 ${
                  i === selectedTreatmentIndex ? "ring-2 ring-[#00796B]" : ""
                }`}
                onClick={() => setSelectedTreatmentIndex(i)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium text-sm">{treatment.patient}</div>
                  <Badge
                    variant={
                      treatment.priority === "high"
                        ? "destructive"
                        : treatment.priority === "medium"
                          ? "default"
                          : "secondary"
                    }
                    className={treatment.priority === "medium" ? "bg-[#00796B]" : ""}
                  >
                    {treatment.status}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground mb-2">{treatment.treatment}</div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  Próxima: {treatment.nextVisit}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Detalle del tratamiento seleccionado */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>
                  {selectedTreatment.patient} - {selectedTreatment.treatment}
                </CardTitle>
                <CardDescription>
                  Iniciado: {selectedTreatment.startDate} | Duración estimada: {selectedTreatment.duration}
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Dialog open={isScheduleVisitOpen} onOpenChange={setIsScheduleVisitOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      Programar
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Programar Visita - {selectedTreatment.patient}</DialogTitle>
                    </DialogHeader>
                    <form action={handleScheduleVisit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="visitDate">Fecha</Label>
                          <Input id="visitDate" name="date" type="date" required />
                        </div>
                        <div>
                          <Label htmlFor="visitTime">Hora</Label>
                          <Input id="visitTime" name="time" type="time" required />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="visitType">Tipo de Visita</Label>
                        <Select name="type" required>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="control">Control de Tratamiento</SelectItem>
                            <SelectItem value="aplicacion">Aplicación de Medicamento</SelectItem>
                            <SelectItem value="evaluacion">Evaluación de Respuesta</SelectItem>
                            <SelectItem value="seguimiento">Seguimiento</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="visitNotes">Notas</Label>
                        <Textarea id="visitNotes" name="notes" placeholder="Observaciones para la visita..." />
                      </div>
                      <Button type="submit" className="w-full">
                        Programar Visita
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>

                <Dialog open={isUpdateTreatmentOpen} onOpenChange={setIsUpdateTreatmentOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="bg-[#00796B] hover:bg-[#004D40]">
                      <Edit className="h-4 w-4 mr-2" />
                      Actualizar
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Actualizar Tratamiento</DialogTitle>
                    </DialogHeader>
                    <form action={handleUpdateTreatment} className="space-y-4">
                      <div>
                        <Label htmlFor="updateStatus">Estado del Tratamiento</Label>
                        <Select name="status" defaultValue={selectedTreatment.status} required>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Activo">Activo</SelectItem>
                            <SelectItem value="Pausado">Pausado</SelectItem>
                            <SelectItem value="Completado">Completado</SelectItem>
                            <SelectItem value="Suspendido">Suspendido</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="updateProgress">Progreso (%)</Label>
                        <Input id="updateProgress" name="progress" type="number" min="0" max="100" placeholder="75" />
                      </div>
                      <div>
                        <Label htmlFor="updateNotes">Notas de Actualización</Label>
                        <Textarea
                          id="updateNotes"
                          name="notes"
                          placeholder="Cambios en el tratamiento, respuesta del paciente, etc."
                        />
                      </div>
                      <div>
                        <Label htmlFor="nextVisitDate">Próxima Visita</Label>
                        <Input id="nextVisitDate" name="nextVisit" type="date" />
                      </div>
                      <Button type="submit" className="w-full">
                        Actualizar Tratamiento
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="plan" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="plan">Plan</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
                <TabsTrigger value="symptoms">Síntomas</TabsTrigger>
              </TabsList>

              <TabsContent value="plan" className="mt-4 space-y-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Plan de Tratamiento Actual</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium flex items-center gap-2">
                            <Pill className="h-4 w-4" />
                            Medicamentos
                          </h4>
                          <Dialog open={isAddMedicationOpen} onOpenChange={setIsAddMedicationOpen}>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline">
                                <Plus className="h-4 w-4 mr-1" />
                                Agregar
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Agregar Medicamento</DialogTitle>
                              </DialogHeader>
                              <form action={handleAddMedication} className="space-y-4">
                                <div>
                                  <Label htmlFor="medName">Nombre del Medicamento</Label>
                                  <Input id="medName" name="name" required />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label htmlFor="dosage">Dosis</Label>
                                    <Input id="dosage" name="dosage" placeholder="50mg" required />
                                  </div>
                                  <div>
                                    <Label htmlFor="frequency">Frecuencia</Label>
                                    <Select name="frequency" required>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Seleccionar" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="diario">Diario</SelectItem>
                                        <SelectItem value="cada-12h">Cada 12 horas</SelectItem>
                                        <SelectItem value="cada-8h">Cada 8 horas</SelectItem>
                                        <SelectItem value="semanal">Semanal</SelectItem>
                                        <SelectItem value="quincenal">Quincenal</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                                <div>
                                  <Label htmlFor="instructions">Instrucciones</Label>
                                  <Textarea
                                    id="instructions"
                                    name="instructions"
                                    placeholder="Tomar con alimentos..."
                                  />
                                </div>
                                <Button type="submit" className="w-full">
                                  Agregar Medicamento
                                </Button>
                              </form>
                            </DialogContent>
                          </Dialog>
                        </div>
                        {selectedTreatment.medications.map((med, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between p-2 border rounded hover:bg-gray-50"
                          >
                            <div className="flex-1">
                              <div className="font-medium text-sm">{med.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {med.dosage} - {med.frequency}
                              </div>
                            </div>
                            <Select
                              defaultValue={med.status}
                              onValueChange={(value) => handleMedicationStatusChange(med.name, value)}
                            >
                              <SelectTrigger className="w-24 h-8">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Activo">Activo</SelectItem>
                                <SelectItem value="Pausado">Pausado</SelectItem>
                                <SelectItem value="Suspendido">Suspendido</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-medium flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          Controles
                        </h4>
                        {selectedTreatment.controls.map((control, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between p-2 border rounded hover:bg-gray-50 cursor-pointer"
                            onClick={() => console.log("[v0] Scheduling control:", control.test)}
                          >
                            <div>
                              <div className="font-medium text-sm">{control.test}</div>
                              <div className="text-xs text-muted-foreground">{control.frequency}</div>
                            </div>
                            <div className="text-xs text-muted-foreground">{control.nextDate}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="timeline" className="mt-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Línea de Tiempo Médica
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedTreatment.timeline.map((item, i) => (
                        <div
                          key={i}
                          className="flex gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded"
                          onClick={() => handleTimelineItemClick(item)}
                        >
                          <div className="flex flex-col items-center">
                            <div
                              className={`w-3 h-3 rounded-full ${
                                item.status === "completed" ? "bg-green-500" : "bg-yellow-500"
                              }`}
                            ></div>
                            {i < selectedTreatment.timeline.length - 1 && (
                              <div className="w-px h-8 bg-border mt-2"></div>
                            )}
                          </div>
                          <div className="flex-1 pb-4">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium text-sm">{item.event}</span>
                              <span className="text-xs text-muted-foreground">{item.date}</span>
                            </div>
                            <div className="text-sm text-muted-foreground">{item.details}</div>
                            <Badge variant="outline" className="mt-2 text-xs">
                              {item.type === "visit"
                                ? "Consulta"
                                : item.type === "medication"
                                  ? "Medicación"
                                  : "Laboratorio"}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="symptoms" className="mt-4">
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        Síntomas Reportados
                      </CardTitle>
                      <Dialog open={isAddSymptomOpen} onOpenChange={setIsAddSymptomOpen}>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline">
                            <Plus className="h-4 w-4 mr-1" />
                            Reportar
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Reportar Nuevo Síntoma</DialogTitle>
                          </DialogHeader>
                          <form action={handleAddSymptom} className="space-y-4">
                            <div>
                              <Label htmlFor="symptomName">Síntoma</Label>
                              <Input id="symptomName" name="name" placeholder="Náuseas, fatiga, dolor..." required />
                            </div>
                            <div>
                              <Label htmlFor="severity">Severidad</Label>
                              <Select name="severity" required>
                                <SelectTrigger>
                                  <SelectValue placeholder="Seleccionar severidad" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="low">Leve</SelectItem>
                                  <SelectItem value="medium">Moderado</SelectItem>
                                  <SelectItem value="high">Severo</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label htmlFor="frequency">Frecuencia</Label>
                              <Select name="frequency" required>
                                <SelectTrigger>
                                  <SelectValue placeholder="Seleccionar frecuencia" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="ocasional">Ocasional</SelectItem>
                                  <SelectItem value="frecuente">Frecuente</SelectItem>
                                  <SelectItem value="constante">Constante</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label htmlFor="description">Descripción</Label>
                              <Textarea id="description" name="description" placeholder="Detalles del síntoma..." />
                            </div>
                            <div>
                              <Label htmlFor="reportDate">Fecha de Reporte</Label>
                              <Input id="reportDate" name="reportedDate" type="date" required />
                            </div>
                            <Button type="submit" className="w-full">
                              Reportar Síntoma
                            </Button>
                          </form>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {selectedTreatment.symptoms.map((symptom, i) => (
                      <div
                        key={i}
                        className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                        onClick={() => console.log("[v0] Viewing symptom details:", symptom)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{symptom.name}</span>
                          <Badge
                            variant={
                              symptom.severity === "high"
                                ? "destructive"
                                : symptom.severity === "medium"
                                  ? "default"
                                  : "secondary"
                            }
                            className={symptom.severity === "medium" ? "bg-[#FF5722]" : ""}
                          >
                            {symptom.severity === "high" ? "Alto" : symptom.severity === "medium" ? "Medio" : "Bajo"}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mb-2">{symptom.description}</div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>Reportado: {symptom.reportedDate}</span>
                          <span>Frecuencia: {symptom.frequency}</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
