"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import { Switch } from "@/src/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/src/components/ui/dialog"
import { Textarea } from "@/src/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import {
  User,
  HelpCircle,
  Shield,
  Camera,
  LogOut,
  Settings,
  Bell,
  Database,
  Download,
  BookOpen,
  MessageCircle,
} from "lucide-react"

export function ConfigurationWireframe() {
  const [profileData, setProfileData] = useState({
    firstName: "Dr. Juan",
    lastName: "Pérez García",
    specialty: "Endocrinología",
    license: "28/123456",
    phone: "+34 123 456 789",
    email: "dr.perez@hospital.com",
    hospital: "Hospital General",
    department: "Endocrinología",
    experience: "15",
    languages: "Español, Inglés",
  })

  const [securitySettings, setSecuritySettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    dataBackup: true,
  })

  const [isChangePhotoOpen, setIsChangePhotoOpen] = useState(false)
  const [isContactSupportOpen, setIsContactSupportOpen] = useState(false)
  const [isReportProblemOpen, setIsReportProblemOpen] = useState(false)
  const [isDataExportOpen, setIsDataExportOpen] = useState(false)
  const [isHelpContentOpen, setIsHelpContentOpen] = useState(false)
  const [helpContentType, setHelpContentType] = useState<"guide" | "faq">("guide")

  const helpContent = {
    guide: {
      title: "Guía de Usuario - OnControl",
      sections: [
        {
          title: "Primeros Pasos",
          content:
            "Bienvenido a OnControl, el sistema de gestión médica especializado para oncólogos. Esta guía te ayudará a familiarizarte con las funciones principales del sistema.",
        },
        {
          title: "Dashboard Principal",
          content:
            "El dashboard muestra un resumen de tus pacientes, citas del día, signos vitales críticos y acciones rápidas. Utiliza las tarjetas de acceso rápido para navegar entre módulos.",
        },
        {
          title: "Gestión de Pacientes",
          content:
            "Registra nuevos pacientes, actualiza historiales médicos, sube documentos y gestiona tratamientos oncológicos. Todos los datos están protegidos con cifrado de extremo a extremo.",
        },
        {
          title: "Sistema de Citas",
          content:
            "Programa citas, gestiona horarios y recibe notificaciones automáticas. El sistema soporta diferentes tipos de citas: consultas, quimioterapia, radioterapia y seguimientos.",
        },
        {
          title: "Monitoreo IoT",
          content:
            "Los sensores IoT de cada paciente envían datos de signos vitales en tiempo real. El sistema genera alertas automáticas cuando se superan los umbrales de normalidad.",
        },
      ],
    },
    faq: {
      title: "Preguntas Frecuentes",
      sections: [
        {
          title: "¿Cómo registro un nuevo paciente?",
          content:
            "Ve al módulo de Gestión de Pacientes y haz clic en 'Registrar Paciente'. Completa todos los campos obligatorios incluyendo DNI/RUC y datos de contacto.",
        },
        {
          title: "¿Qué hacer si los signos vitales muestran una alerta?",
          content:
            "Las alertas rojas requieren atención inmediata. Contacta al paciente y programa una cita urgente. El sistema guarda un historial de todas las alertas.",
        },
        {
          title: "¿Cómo funciona el sistema de backup?",
          content:
            "Los datos se respaldan automáticamente cada 24 horas en servidores seguros. Puedes exportar datos manualmente desde Configuración > Preferencias.",
        },
        {
          title: "¿Puedo acceder desde dispositivos móviles?",
          content:
            "Sí, OnControl es completamente responsive y funciona en tablets y smartphones. Mantén tu sesión segura cerrándola al terminar.",
        },
        {
          title: "¿Cómo cambio mi contraseña?",
          content:
            "Ve a Configuración > Seguridad > Cambiar Contraseña. Usa una contraseña fuerte con al menos 8 caracteres, números y símbolos.",
        },
      ],
    },
  }

  const handleProfileUpdate = (formData: FormData) => {
    const data = Object.fromEntries(formData)
    console.log("[v0] Updating profile:", data)
    setProfileData((prev) => ({ ...prev, ...data }))
  }

  const handlePasswordChange = (formData: FormData) => {
    const data = Object.fromEntries(formData)
    console.log("[v0] Changing password:", { ...data, currentPassword: "***", newPassword: "***" })
  }

  const handlePhotoChange = (formData: FormData) => {
    console.log("[v0] Changing profile photo:", Object.fromEntries(formData))
    setIsChangePhotoOpen(false)
  }

  const handleContactSupport = (formData: FormData) => {
    console.log("[v0] Contacting support:", Object.fromEntries(formData))
    setIsContactSupportOpen(false)
  }

  const handleReportProblem = (formData: FormData) => {
    console.log("[v0] Reporting problem:", Object.fromEntries(formData))
    setIsReportProblemOpen(false)
  }

  const handleDataExport = (formData: FormData) => {
    console.log("[v0] Exporting data:", Object.fromEntries(formData))
    setIsDataExportOpen(false)
  }

  const handleLogout = () => {
    console.log("[v0] Logging out user")
    // Logout logic would go here
  }

  const handleCloseSession = (sessionId: string) => {
    console.log("[v0] Closing session:", sessionId)
  }

  const toggleSecuritySetting = (setting: keyof typeof securitySettings) => {
    setSecuritySettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }))
    console.log("[v0] Toggled security setting:", setting, !securitySettings[setting])
  }

  const openHelpContent = (type: "guide" | "faq") => {
    setHelpContentType(type)
    setIsHelpContentOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Panel de configuración principal */}
        <Card className="lg:col-span-2">
          <CardContent className="pt-6">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="profile">Perfil</TabsTrigger>
                <TabsTrigger value="security">Seguridad</TabsTrigger>
                <TabsTrigger value="preferences">Preferencias</TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="mt-6 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Información Personal
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center">
                        <User className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <div className="space-y-2">
                        <Dialog open={isChangePhotoOpen} onOpenChange={setIsChangePhotoOpen}>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-[#FF5722] text-white border-[#FF5722] hover:bg-[#E64A19]"
                            >
                              <Camera className="h-4 w-4 mr-2" />
                              Cambiar Foto
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Cambiar Foto de Perfil</DialogTitle>
                            </DialogHeader>
                            <form action={handlePhotoChange} className="space-y-4">
                              <div>
                                <Label htmlFor="photoFile">Seleccionar Imagen</Label>
                                <Input id="photoFile" name="photo" type="file" accept="image/*" required />
                              </div>
                              <div className="text-sm text-muted-foreground">JPG, PNG o GIF. Máximo 2MB.</div>
                              <Button type="submit" className="w-full">
                                Subir Foto
                              </Button>
                            </form>
                          </DialogContent>
                        </Dialog>
                        <div className="text-sm text-muted-foreground">JPG, PNG o GIF. Máximo 2MB.</div>
                      </div>
                    </div>

                    <form action={handleProfileUpdate} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">Nombre</Label>
                          <Input id="firstName" name="firstName" defaultValue={profileData.firstName} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Apellidos</Label>
                          <Input id="lastName" name="lastName" defaultValue={profileData.lastName} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="specialty">Especialidad</Label>
                          <Input id="specialty" name="specialty" defaultValue={profileData.specialty} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="license">Número de Colegiado</Label>
                          <Input id="license" name="license" defaultValue={profileData.license} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Teléfono</Label>
                          <Input id="phone" name="phone" defaultValue={profileData.phone} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" name="email" defaultValue={profileData.email} />
                        </div>
                      </div>
                      <Button type="submit" className="bg-[#00796B] hover:bg-[#004D40]">
                        Guardar Cambios
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Información Profesional</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <form action={handleProfileUpdate} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="hospital">Centro Médico</Label>
                          <Input id="hospital" name="hospital" defaultValue={profileData.hospital} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="department">Departamento</Label>
                          <Input id="department" name="department" defaultValue={profileData.department} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="experience">Años de Experiencia</Label>
                          <Input id="experience" name="experience" defaultValue={profileData.experience} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="languages">Idiomas</Label>
                          <Input id="languages" name="languages" defaultValue={profileData.languages} />
                        </div>
                      </div>
                      <Button type="submit" className="bg-[#00796B] hover:bg-[#004D40]">
                        Actualizar Información
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Seguridad y Privacidad
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="p-3 border rounded-lg">
                        <div className="font-medium mb-2">Cambiar Contraseña</div>
                        <form action={handlePasswordChange} className="space-y-3">
                          <div className="space-y-2">
                            <Label htmlFor="currentPassword">Contraseña Actual</Label>
                            <Input id="currentPassword" name="currentPassword" type="password" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="newPassword">Nueva Contraseña</Label>
                            <Input id="newPassword" name="newPassword" type="password" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                            <Input id="confirmPassword" name="confirmPassword" type="password" required />
                          </div>
                          <Button type="submit" size="sm" className="bg-[#00796B] hover:bg-[#004D40]">
                            Actualizar Contraseña
                          </Button>
                        </form>
                      </div>

                      <div className="p-3 border rounded-lg">
                        <div className="font-medium mb-2">Sesiones Activas</div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>Navegador actual</span>
                            <span className="text-green-600">Activa</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span>Tablet - hace 2 días</span>
                            <Button variant="outline" size="sm" onClick={() => handleCloseSession("tablet-session")}>
                              Cerrar
                            </Button>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span>Móvil - hace 1 semana</span>
                            <Button variant="outline" size="sm" onClick={() => handleCloseSession("mobile-session")}>
                              Cerrar
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="preferences" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      Preferencias del Sistema
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="p-3 border rounded-lg">
                        <div className="font-medium mb-2 flex items-center gap-2">
                          <Bell className="h-4 w-4" />
                          Notificaciones
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="text-sm">Notificaciones por Email</div>
                            <Switch
                              checked={securitySettings.emailNotifications}
                              onCheckedChange={() => toggleSecuritySetting("emailNotifications")}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="text-sm">Notificaciones SMS</div>
                            <Switch
                              checked={securitySettings.smsNotifications}
                              onCheckedChange={() => toggleSecuritySetting("smsNotifications")}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="p-3 border rounded-lg">
                        <div className="font-medium mb-2 flex items-center gap-2">
                          <Database className="h-4 w-4" />
                          Gestión de Datos
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="text-sm">Backup Automático</div>
                            <Switch
                              checked={securitySettings.dataBackup}
                              onCheckedChange={() => toggleSecuritySetting("dataBackup")}
                            />
                          </div>
                          <Dialog open={isDataExportOpen} onOpenChange={setIsDataExportOpen}>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" className="w-full bg-transparent">
                                <Download className="h-4 w-4 mr-2" />
                                Exportar Datos
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Exportar Datos del Sistema</DialogTitle>
                              </DialogHeader>
                              <form action={handleDataExport} className="space-y-4">
                                <div>
                                  <Label htmlFor="exportType">Tipo de Exportación</Label>
                                  <Select name="exportType" required>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Seleccionar tipo" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="patients">Datos de Pacientes</SelectItem>
                                      <SelectItem value="appointments">Citas</SelectItem>
                                      <SelectItem value="treatments">Tratamientos</SelectItem>
                                      <SelectItem value="all">Todos los Datos</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <Label htmlFor="format">Formato</Label>
                                  <Select name="format" required>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Seleccionar formato" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="csv">CSV</SelectItem>
                                      <SelectItem value="excel">Excel</SelectItem>
                                      <SelectItem value="pdf">PDF</SelectItem>
                                      <SelectItem value="json">JSON</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <Label htmlFor="dateRange">Rango de Fechas</Label>
                                  <div className="grid grid-cols-2 gap-2">
                                    <Input name="startDate" type="date" />
                                    <Input name="endDate" type="date" />
                                  </div>
                                </div>
                                <Button type="submit" className="w-full">
                                  Exportar Datos
                                </Button>
                              </form>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Panel lateral de soporte */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <HelpCircle className="h-4 w-4" />
                Centro de Ayuda
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start bg-transparent"
                onClick={() => openHelpContent("guide")}
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Guía de Usuario
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start bg-transparent"
                onClick={() => openHelpContent("faq")}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Preguntas Frecuentes
              </Button>

              <Dialog open={isContactSupportOpen} onOpenChange={setIsContactSupportOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <HelpCircle className="h-4 w-4 mr-2" />
                    Contactar Soporte
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Contactar Soporte Técnico</DialogTitle>
                  </DialogHeader>
                  <form action={handleContactSupport} className="space-y-4">
                    <div>
                      <Label htmlFor="supportSubject">Asunto</Label>
                      <Input id="supportSubject" name="subject" required />
                    </div>
                    <div>
                      <Label htmlFor="priority">Prioridad</Label>
                      <Select name="priority" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar prioridad" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Baja</SelectItem>
                          <SelectItem value="medium">Media</SelectItem>
                          <SelectItem value="high">Alta</SelectItem>
                          <SelectItem value="urgent">Urgente</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="supportMessage">Mensaje</Label>
                      <Textarea id="supportMessage" name="message" placeholder="Describe tu consulta..." required />
                    </div>
                    <Button type="submit" className="w-full">
                      Enviar Consulta
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>

              <Dialog open={isReportProblemOpen} onOpenChange={setIsReportProblemOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <HelpCircle className="h-4 w-4 mr-2" />
                    Reportar Problema
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Reportar Problema</DialogTitle>
                  </DialogHeader>
                  <form action={handleReportProblem} className="space-y-4">
                    <div>
                      <Label htmlFor="problemType">Tipo de Problema</Label>
                      <Select name="type" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bug">Error del Sistema</SelectItem>
                          <SelectItem value="performance">Problema de Rendimiento</SelectItem>
                          <SelectItem value="ui">Problema de Interfaz</SelectItem>
                          <SelectItem value="data">Problema con Datos</SelectItem>
                          <SelectItem value="other">Otro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="problemDescription">Descripción del Problema</Label>
                      <Textarea
                        id="problemDescription"
                        name="description"
                        placeholder="Describe el problema en detalle..."
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="stepsToReproduce">Pasos para Reproducir</Label>
                      <Textarea
                        id="stepsToReproduce"
                        name="steps"
                        placeholder="1. Hacer clic en...&#10;2. Navegar a...&#10;3. El error ocurre cuando..."
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Reportar Problema
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <Button variant="destructive" size="sm" className="w-full" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Cerrar Sesión
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={isHelpContentOpen} onOpenChange={setIsHelpContentOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{helpContent[helpContentType].title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {helpContent[helpContentType].sections.map((section, index) => (
              <div key={index} className="space-y-2">
                <h3 className="font-semibold text-lg">{section.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-end pt-4">
            <Button onClick={() => setIsHelpContentOpen(false)}>Cerrar</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
