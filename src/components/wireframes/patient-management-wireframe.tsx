"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Badge } from "@/src/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/src/components/ui/dialog"
import { Label } from "@/src/components/ui/label"
import { Textarea } from "@/src/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { Search, Filter, Plus, FileText, Activity, Calendar, Edit, Eye, Download } from "lucide-react"
import data from "@/src/data/db"

export function PatientManagementWireframe() {
  const { patients } = data
  const [selectedPatientId, setSelectedPatientId] = useState(patients[0]?.id)
  const [searchTerm, setSearchTerm] = useState("")
  const [isEditPatientOpen, setIsEditPatientOpen] = useState(false)
  const [isNewAppointmentOpen, setIsNewAppointmentOpen] = useState(false)
  const [isAddDocumentOpen, setIsAddDocumentOpen] = useState(false)
  const [isAddLabResultOpen, setIsAddLabResultOpen] = useState(false)

  const selectedPatient = patients.find((p) => p.id === selectedPatientId) || patients[0]

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.medicalHistory[0]?.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toString().includes(searchTerm),
  )

  const handleEditPatient = (formData: FormData) => {
    console.log("[v0] Editing patient:", Object.fromEntries(formData))
    setIsEditPatientOpen(false)
  }

  const handleNewAppointment = (formData: FormData) => {
    console.log("[v0] New appointment for patient:", Object.fromEntries(formData))
    setIsNewAppointmentOpen(false)
  }

  const handleAddDocument = (formData: FormData) => {
    console.log("[v0] Adding document:", Object.fromEntries(formData))
    setIsAddDocumentOpen(false)
  }

  const handleAddLabResult = (formData: FormData) => {
    console.log("[v0] Adding lab result:", Object.fromEntries(formData))
    setIsAddLabResultOpen(false)
  }

  const handleDownloadDocument = (docName: string) => {
    console.log("[v0] Downloading document:", docName)
  }

  return (
    <div className="space-y-6">
      {/* Barra de búsqueda y filtros */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por nombre, diagnóstico o ID..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-[#00796B] hover:bg-[#004D40]">
                    <Plus className="h-4 w-4 mr-2" />
                    Nuevo Paciente
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Registrar Nuevo Paciente</DialogTitle>
                  </DialogHeader>
                  <form action={handleEditPatient} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">Nombres</Label>
                        <Input id="firstName" name="firstName" required />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Apellidos</Label>
                        <Input id="lastName" name="lastName" required />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="dni">DNI</Label>
                        <Input id="dni" name="dni" required />
                      </div>
                      <div>
                        <Label htmlFor="age">Edad</Label>
                        <Input id="age" name="age" type="number" required />
                      </div>
                      <div>
                        <Label htmlFor="gender">Género</Label>
                        <Select name="gender" required>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="M">Masculino</SelectItem>
                            <SelectItem value="F">Femenino</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Teléfono</Label>
                        <Input id="phone" name="phone" required />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="cancerType">Tipo de Cáncer</Label>
                      <Select name="cancerType" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mama">Cáncer de Mama</SelectItem>
                          <SelectItem value="pulmon">Cáncer de Pulmón</SelectItem>
                          <SelectItem value="colon">Cáncer de Colon</SelectItem>
                          <SelectItem value="prostata">Cáncer de Próstata</SelectItem>
                          <SelectItem value="leucemia">Leucemia</SelectItem>
                          <SelectItem value="linfoma">Linfoma</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="allergies">Alergias</Label>
                      <Input id="allergies" name="allergies" placeholder="Separar con comas" />
                    </div>
                    <div>
                      <Label htmlFor="notes">Notas Iniciales</Label>
                      <Textarea id="notes" name="notes" placeholder="Observaciones médicas iniciales..." />
                    </div>
                    <Button type="submit" className="w-full">
                      Registrar Paciente
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista de Pacientes */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Lista de Pacientes</CardTitle>
            <CardDescription>
              {filteredPatients.length} pacientes {searchTerm ? "encontrados" : "registrados"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {filteredPatients.map((patient) => (
              <div
                key={patient.id}
                className={`p-3 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                  patient.id === selectedPatientId ? "ring-2 ring-[#00796B]" : ""
                }`}
                onClick={() => setSelectedPatientId(patient.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium">{patient.name}</div>
                  <Badge
                    variant={patient.status === "Activo" ? "default" : "secondary"}
                    className={patient.status === "Activo" ? "bg-[#00796B]" : ""}
                  >
                    {patient.status}
                  </Badge>
                </div>
                <div className="text-sm text-gray-600">
                  {patient.age} años • {patient.gender}
                </div>
                <div className="text-sm text-gray-600">{patient.medicalHistory[0]?.diagnosis || "Sin diagnóstico"}</div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Perfil del Paciente Seleccionado */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{selectedPatient.name} - Perfil del Paciente</CardTitle>
                <CardDescription>
                  ID: PAT-{selectedPatient.id.toString().padStart(3, "0")} | Edad: {selectedPatient.age} años | Última
                  visita: {selectedPatient.lastVisit}
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Dialog open={isNewAppointmentOpen} onOpenChange={setIsNewAppointmentOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      Agendar Cita
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Agendar Cita para {selectedPatient.name}</DialogTitle>
                    </DialogHeader>
                    <form action={handleNewAppointment} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="date">Fecha</Label>
                          <Input id="date" name="date" type="date" required />
                        </div>
                        <div>
                          <Label htmlFor="time">Hora</Label>
                          <Input id="time" name="time" type="time" required />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="appointmentType">Tipo de Cita</Label>
                        <Select name="type" required>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="consulta">Consulta</SelectItem>
                            <SelectItem value="control">Control</SelectItem>
                            <SelectItem value="quimioterapia">Quimioterapia</SelectItem>
                            <SelectItem value="radioterapia">Radioterapia</SelectItem>
                            <SelectItem value="examenes">Exámenes</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="notes">Notas</Label>
                        <Textarea id="notes" name="notes" placeholder="Observaciones adicionales..." />
                      </div>
                      <Button type="submit" className="w-full">
                        Agendar Cita
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>

                <Dialog open={isEditPatientOpen} onOpenChange={setIsEditPatientOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="bg-[#00796B] hover:bg-[#004D40]">
                      <Edit className="h-4 w-4 mr-2" />
                      Editar
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Editar Paciente - {selectedPatient.name}</DialogTitle>
                    </DialogHeader>
                    <form action={handleEditPatient} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="editName">Nombre Completo</Label>
                          <Input id="editName" name="name" defaultValue={selectedPatient.name} required />
                        </div>
                        <div>
                          <Label htmlFor="editAge">Edad</Label>
                          <Input id="editAge" name="age" type="number" defaultValue={selectedPatient.age} required />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="editPhone">Teléfono</Label>
                          <Input id="editPhone" name="phone" defaultValue={selectedPatient.phone} required />
                        </div>
                        <div>
                          <Label htmlFor="editEmail">Email</Label>
                          <Input id="editEmail" name="email" type="email" defaultValue={selectedPatient.email} />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="editAllergies">Alergias</Label>
                        <Input
                          id="editAllergies"
                          name="allergies"
                          defaultValue={selectedPatient.allergies.join(", ")}
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        Guardar Cambios
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="history" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="history">Historial</TabsTrigger>
                <TabsTrigger value="documents">Documentos</TabsTrigger>
                <TabsTrigger value="labs">Laboratorios</TabsTrigger>
                <TabsTrigger value="evolution">Evolución</TabsTrigger>
              </TabsList>

              <TabsContent value="history" className="mt-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Información Personal</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Teléfono:</span>
                        <span>{selectedPatient.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Email:</span>
                        <span>{selectedPatient.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tipo de Sangre:</span>
                        <span>{selectedPatient.bloodType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Alergias:</span>
                        <span>
                          {selectedPatient.allergies.length > 0 ? selectedPatient.allergies.join(", ") : "Ninguna"}
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Diagnóstico Actual</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Badge className="mb-2 bg-[#00796B]">{selectedPatient.medicalHistory[0]?.diagnosis}</Badge>
                      <div className="text-sm text-gray-600">{selectedPatient.medicalHistory[0]?.notes}</div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Historial de Consultas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {selectedPatient.medicalHistory.map((visit, i) => (
                        <div
                          key={i}
                          className="flex gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                          onClick={() => console.log("[v0] Viewing visit details:", visit)}
                        >
                          <div className="w-2 h-2 bg-[#00796B] rounded-full mt-2"></div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium">{visit.diagnosis}</span>
                              <span className="text-sm text-gray-600">{visit.date}</span>
                            </div>
                            <div className="text-sm text-gray-600">Tratamiento: {visit.treatment}</div>
                            <div className="text-sm text-gray-600">{visit.notes}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="documents" className="mt-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Documentos del Paciente</h3>
                  <Dialog open={isAddDocumentOpen} onOpenChange={setIsAddDocumentOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Subir Documento
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Subir Nuevo Documento</DialogTitle>
                      </DialogHeader>
                      <form action={handleAddDocument} className="space-y-4">
                        <div>
                          <Label htmlFor="docName">Nombre del Documento</Label>
                          <Input id="docName" name="name" required />
                        </div>
                        <div>
                          <Label htmlFor="docType">Tipo</Label>
                          <Select name="type" required>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccionar tipo" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="informe">Informe Médico</SelectItem>
                              <SelectItem value="laboratorio">Resultado de Laboratorio</SelectItem>
                              <SelectItem value="imagen">Imagen Médica</SelectItem>
                              <SelectItem value="receta">Receta</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="docFile">Archivo</Label>
                          <Input id="docFile" name="file" type="file" accept=".pdf,.jpg,.png,.doc,.docx" required />
                        </div>
                        <Button type="submit" className="w-full">
                          Subir Documento
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: "Informe médico inicial", date: selectedPatient.lastVisit, type: "PDF" },
                    { name: "Resultados laboratorio", date: "2024-01-10", type: "PDF" },
                    { name: "Receta médica", date: selectedPatient.lastVisit, type: "PDF" },
                    { name: "Radiografía", date: "2024-01-12", type: "IMG" },
                  ].map((doc, i) => (
                    <Card key={i} className="cursor-pointer hover:bg-gray-50">
                      <CardContent className="pt-4">
                        <div className="flex items-center gap-3">
                          <FileText className="h-8 w-8 text-gray-400" />
                          <div className="flex-1">
                            <div className="font-medium">{doc.name}</div>
                            <div className="text-sm text-gray-600">
                              {doc.date} • {doc.type}
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => console.log("[v0] Viewing document:", doc.name)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => handleDownloadDocument(doc.name)}>
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="labs" className="mt-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Resultados de Laboratorio</h3>
                  <Dialog open={isAddLabResultOpen} onOpenChange={setIsAddLabResultOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Agregar Resultado
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Agregar Resultado de Laboratorio</DialogTitle>
                      </DialogHeader>
                      <form action={handleAddLabResult} className="space-y-4">
                        <div>
                          <Label htmlFor="testName">Nombre del Examen</Label>
                          <Input id="testName" name="testName" required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="result">Resultado</Label>
                            <Input id="result" name="result" required />
                          </div>
                          <div>
                            <Label htmlFor="unit">Unidad</Label>
                            <Input id="unit" name="unit" placeholder="mg/dL, %, etc." />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="status">Estado</Label>
                          <Select name="status" required>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccionar estado" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="normal">Normal</SelectItem>
                              <SelectItem value="elevado">Elevado</SelectItem>
                              <SelectItem value="bajo">Bajo</SelectItem>
                              <SelectItem value="critico">Crítico</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="labDate">Fecha del Examen</Label>
                          <Input id="labDate" name="date" type="date" required />
                        </div>
                        <Button type="submit" className="w-full">
                          Agregar Resultado
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="space-y-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Últimos Resultados</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div
                          className="text-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                          onClick={() => console.log("[v0] Viewing HbA1c history")}
                        >
                          <div className="text-2xl font-bold text-green-600">6.8%</div>
                          <div className="text-sm text-gray-600">HbA1c</div>
                          <div className="text-xs text-green-600">Normal</div>
                        </div>
                        <div
                          className="text-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                          onClick={() => console.log("[v0] Viewing glucose history")}
                        >
                          <div className="text-2xl font-bold text-yellow-600">145</div>
                          <div className="text-sm text-gray-600">Glucosa</div>
                          <div className="text-xs text-yellow-600">Elevada</div>
                        </div>
                        <div
                          className="text-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                          onClick={() => console.log("[v0] Viewing cholesterol history")}
                        >
                          <div className="text-2xl font-bold text-green-600">180</div>
                          <div className="text-sm text-gray-600">Colesterol</div>
                          <div className="text-xs text-green-600">Normal</div>
                        </div>
                        <div
                          className="text-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                          onClick={() => console.log("[v0] Viewing creatinine history")}
                        >
                          <div className="text-2xl font-bold text-green-600">0.9</div>
                          <div className="text-sm text-gray-600">Creatinina</div>
                          <div className="text-xs text-green-600">Normal</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="evolution" className="mt-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Activity className="h-4 w-4" />
                      Evolución del Tratamiento
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="h-64 border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-medium">Signos Vitales - Últimos 30 días</h4>
                          <div className="flex gap-2 text-xs">
                            <div className="flex items-center gap-1">
                              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                              <span>Temperatura</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                              <span>Oxígeno</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                              <span>Ritmo Cardíaco</span>
                            </div>
                          </div>
                        </div>
                        <div
                          className="relative h-48 bg-gray-50 rounded border cursor-pointer hover:bg-gray-100"
                          onClick={() => console.log("[v0] Opening detailed vital signs chart")}
                        >
                          {/* Simulated chart grid */}
                          <div className="absolute inset-0 grid grid-cols-7 grid-rows-6 gap-0">
                            {Array.from({ length: 42 }).map((_, i) => (
                              <div key={i} className="border-r border-b border-gray-200 border-opacity-30"></div>
                            ))}
                          </div>
                          {/* Simulated data points and lines */}
                          <svg className="absolute inset-0 w-full h-full">
                            {/* Temperature line (red) */}
                            <polyline
                              fill="none"
                              stroke="#ef4444"
                              strokeWidth="2"
                              points="20,140 60,138 100,142 140,139 180,141 220,137 260,140"
                            />
                            {/* Oxygen line (blue) */}
                            <polyline
                              fill="none"
                              stroke="#3b82f6"
                              strokeWidth="2"
                              points="20,60 60,58 100,62 140,59 180,61 220,57 260,60"
                            />
                            {/* Heart rate line (green) */}
                            <polyline
                              fill="none"
                              stroke="#22c55e"
                              strokeWidth="2"
                              points="20,100 60,105 100,95 140,98 180,102 220,97 260,100"
                            />
                            {/* Data points */}
                            {[20, 60, 100, 140, 180, 220, 260].map((x, i) => (
                              <g key={i}>
                                <circle cx={x} cy={140 - i * 0.5} r="3" fill="#ef4444" />
                                <circle cx={x} cy={60 - i * 0.5} r="3" fill="#3b82f6" />
                                <circle cx={x} cy={100 + i * 1} r="3" fill="#22c55e" />
                              </g>
                            ))}
                          </svg>
                          {/* Y-axis labels */}
                          <div className="absolute left-2 top-2 text-xs text-gray-500">100</div>
                          <div className="absolute left-2 top-1/2 text-xs text-gray-500">80</div>
                          <div className="absolute left-2 bottom-2 text-xs text-gray-500">35</div>
                          {/* X-axis labels */}
                          <div className="absolute bottom-1 left-4 text-xs text-gray-500">Sem 1</div>
                          <div className="absolute bottom-1 right-4 text-xs text-gray-500">Sem 4</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div
                          className="text-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                          onClick={() => console.log("[v0] Viewing temperature details")}
                        >
                          <div className="text-2xl font-bold text-red-600">36.5°C</div>
                          <div className="text-sm text-gray-600">Temperatura</div>
                          <div className="text-xs text-green-600">Normal</div>
                        </div>
                        <div
                          className="text-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                          onClick={() => console.log("[v0] Viewing oxygen details")}
                        >
                          <div className="text-2xl font-bold text-blue-600">98%</div>
                          <div className="text-sm text-gray-600">Oxígeno en Sangre</div>
                          <div className="text-xs text-green-600">Normal</div>
                        </div>
                        <div
                          className="text-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                          onClick={() => console.log("[v0] Viewing heart rate details")}
                        >
                          <div className="text-2xl font-bold text-green-600">85 bpm</div>
                          <div className="text-sm text-gray-600">Ritmo Cardíaco</div>
                          <div className="text-xs text-yellow-600">Elevado</div>
                        </div>
                      </div>
                    </div>
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
