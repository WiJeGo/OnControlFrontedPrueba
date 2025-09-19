"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Badge } from "@/src/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/src/components/ui/dialog"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Textarea } from "@/src/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import {
  Calendar,
  Users,
  Activity,
  TrendingUp,
  AlertTriangle,
  Thermometer,
  Heart,
  Droplets,
  Bell,
  TrendingDown,
} from "lucide-react"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import data from "@/src/data/db"

interface DashboardWireframeProps {
  onViewPatient?: (patientName: string) => void
  onNavigateToAppointments?: () => void
  onNavigateToAlerts?: (alertId?: string) => void
}

export function DashboardWireframe({
  onViewPatient,
  onNavigateToAppointments,
  onNavigateToAlerts,
}: DashboardWireframeProps) {
  const { patients, appointments, vitalSigns, notifications, quickActions } = data
  const [isNewPatientOpen, setIsNewPatientOpen] = useState(false)
  const [isNewAppointmentOpen, setIsNewAppointmentOpen] = useState(false)
  const [isNewTreatmentOpen, setIsNewTreatmentOpen] = useState(false)
  const [selectedNotifications, setSelectedNotifications] = useState(notifications)
  const [isVitalSignsDetailOpen, setIsVitalSignsDetailOpen] = useState(false)
  const [selectedVitalType, setSelectedVitalType] = useState<string>("")

  const iotVitalSigns = [
    {
      type: "Temperatura Corporal",
      value: "38.2°C",
      status: "ALERTA",
      color: "destructive",
      icon: Thermometer,
      threshold: { min: 36.1, max: 37.2 },
      current: 38.2,
      patient: "Ana García",
      lastUpdate: "hace 2 min",
      trend: "up",
      data: [
        { time: "00:00", value: 36.8 },
        { time: "04:00", value: 37.1 },
        { time: "08:00", value: 37.5 },
        { time: "12:00", value: 37.8 },
        { time: "16:00", value: 38.2 },
      ],
    },
    {
      type: "Oxígeno en Sangre",
      value: "94%",
      status: "PRECAUCIÓN",
      color: "warning",
      icon: Droplets,
      threshold: { min: 95, max: 100 },
      current: 94,
      patient: "Carlos López",
      lastUpdate: "hace 5 min",
      trend: "down",
      data: [
        { time: "00:00", value: 98 },
        { time: "04:00", value: 97 },
        { time: "08:00", value: 96 },
        { time: "12:00", value: 95 },
        { time: "16:00", value: 94 },
      ],
    },
    {
      type: "Ritmo Cardíaco",
      value: "105 bpm",
      status: "ALERTA",
      color: "destructive",
      icon: Heart,
      threshold: { min: 60, max: 100 },
      current: 105,
      patient: "María Rodríguez",
      lastUpdate: "hace 1 min",
      trend: "up",
      data: [
        { time: "00:00", value: 72 },
        { time: "04:00", value: 78 },
        { time: "08:00", value: 85 },
        { time: "12:00", value: 95 },
        { time: "16:00", value: 105 },
      ],
    },
  ]

  const criticalAlerts = [
    {
      id: "alert-1",
      patient: "Ana García",
      type: "Temperatura",
      value: "38.2°C",
      severity: "high",
      time: "hace 2 min",
      message: "Temperatura corporal por encima del umbral normal",
    },
    {
      id: "alert-2",
      patient: "María Rodríguez",
      type: "Ritmo Cardíaco",
      value: "105 bpm",
      severity: "high",
      time: "hace 1 min",
      message: "Taquicardia detectada - Ritmo cardíaco elevado",
    },
    {
      id: "alert-3",
      patient: "Carlos López",
      type: "Oxígeno",
      value: "94%",
      severity: "medium",
      time: "hace 5 min",
      message: "Saturación de oxígeno por debajo del rango óptimo",
    },
  ]

  const handleNewPatient = (formData: FormData) => {
    console.log("[v0] New patient:", Object.fromEntries(formData))
    setIsNewPatientOpen(false)
  }

  const handleNewAppointment = (formData: FormData) => {
    console.log("[v0] New appointment:", Object.fromEntries(formData))
    setIsNewAppointmentOpen(false)
  }

  const handleNewTreatment = (formData: FormData) => {
    console.log("[v0] New treatment:", Object.fromEntries(formData))
    setIsNewTreatmentOpen(false)
  }

  const markNotificationAsRead = (notifId: string) => {
    setSelectedNotifications((prev) => prev.map((notif) => (notif.id === notifId ? { ...notif, read: true } : notif)))
  }

  const openVitalSignsDetail = (vitalType: string) => {
    setSelectedVitalType(vitalType)
    setIsVitalSignsDetailOpen(true)
  }

  const handleAlertAction = (alertId: string, action: "acknowledge" | "contact" | "schedule") => {
    console.log(`[v0] Alert ${alertId} - Action: ${action}`)
    // Handle alert actions
  }

  const renderQuickActionButton = (action: any) => {
    const iconMap = {
      Users: Users,
      Calendar: Calendar,
      Activity: Activity,
      TrendingUp: TrendingUp,
    }
    const IconComponent = iconMap[action.icon as keyof typeof iconMap]

    if (action.label === "Nuevo Paciente") {
      return (
        <Dialog open={isNewPatientOpen} onOpenChange={setIsNewPatientOpen}>
          <DialogTrigger asChild>
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <IconComponent className="h-4 w-4 mr-2" />
              {action.label}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Registrar Nuevo Paciente</DialogTitle>
            </DialogHeader>
            <form action={handleNewPatient} className="space-y-4">
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
              <div>
                <Label htmlFor="dni">DNI</Label>
                <Input id="dni" name="dni" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
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
              <div>
                <Label htmlFor="phone">Teléfono</Label>
                <Input id="phone" name="phone" required />
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
              <Button type="submit" className="w-full">
                Registrar Paciente
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      )
    }

    if (action.label === "Nueva Cita") {
      return (
        <Dialog open={isNewAppointmentOpen} onOpenChange={setIsNewAppointmentOpen}>
          <DialogTrigger asChild>
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <IconComponent className="h-4 w-4 mr-2" />
              {action.label}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Programar Nueva Cita</DialogTitle>
            </DialogHeader>
            <form action={handleNewAppointment} className="space-y-4">
              <div>
                <Label htmlFor="patientSelect">Paciente</Label>
                <Select name="patientId" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar paciente" />
                  </SelectTrigger>
                  <SelectContent>
                    {patients.map((patient) => (
                      <SelectItem key={patient.id} value={patient.id}>
                        {patient.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
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
                Programar Cita
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      )
    }

    if (action.label === "Nuevo Tratamiento") {
      return (
        <Dialog open={isNewTreatmentOpen} onOpenChange={setIsNewTreatmentOpen}>
          <DialogTrigger asChild>
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <IconComponent className="h-4 w-4 mr-2" />
              {action.label}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
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
                      <SelectItem key={patient.id} value={patient.id}>
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
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">Fecha Inicio</Label>
                  <Input id="startDate" name="startDate" type="date" required />
                </div>
                <div>
                  <Label htmlFor="cycles">Ciclos</Label>
                  <Input id="cycles" name="cycles" type="number" placeholder="6" />
                </div>
              </div>
              <div>
                <Label htmlFor="medication">Medicamento Principal</Label>
                <Input id="medication" name="medication" placeholder="Ej: Doxorubicina" />
              </div>
              <div>
                <Label htmlFor="treatmentNotes">Protocolo/Notas</Label>
                <Textarea id="treatmentNotes" name="notes" placeholder="Detalles del protocolo de tratamiento..." />
              </div>
              <Button type="submit" className="w-full">
                Crear Tratamiento
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      )
    }

    return (
      <Button className="w-full justify-start bg-transparent" variant="outline">
        <IconComponent className="h-4 w-4 mr-2" />
        {action.label}
      </Button>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#00796B]">{appointments.length}</div>
              <div className="text-sm text-gray-600">Citas Hoy</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#00796B]">{patients.length}</div>
              <div className="text-sm text-gray-600">Pacientes Activos</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#FF5722]">{criticalAlerts.length}</div>
              <div className="text-sm text-gray-600">Alertas Críticas</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#004D40]">12</div>
              <div className="text-sm text-gray-600">Sensores IoT</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-700">
            <Bell className="h-5 w-5" />
            Alertas Críticas de Signos Vitales
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {criticalAlerts.map((alert) => (
            <div
              key={alert.id}
              className="flex items-center justify-between p-3 bg-white border border-red-200 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-3 h-3 rounded-full ${alert.severity === "high" ? "bg-red-500" : "bg-yellow-500"}`}
                ></div>
                <div>
                  <div className="font-medium text-red-900">
                    {alert.patient} - {alert.type}
                  </div>
                  <div className="text-sm text-red-700">{alert.message}</div>
                  <div className="text-xs text-red-600">{alert.time}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={alert.severity === "high" ? "destructive" : "secondary"}>{alert.value}</Badge>
                <Button
                  size="sm"
                  className="bg-red-600 hover:bg-red-700"
                  onClick={() =>
                    onNavigateToAlerts
                      ? onNavigateToAlerts(alert.id)
                      : console.log(`[v0] Navigating to alert ${alert.id}`)
                  }
                >
                  Ver Alerta
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Próximos Pacientes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Próximos Pacientes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {appointments.slice(0, 3).map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                onClick={() =>
                  onViewPatient
                    ? onViewPatient(appointment.patientName)
                    : console.log(`[v0] Navigating to patient: ${appointment.patientName}`)
                }
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium">{appointment.patientName}</div>
                    <div className="text-sm text-gray-600">
                      {appointment.time} - {appointment.type}
                    </div>
                  </div>
                </div>
                <Badge variant="outline">{appointment.status}</Badge>
              </div>
            ))}
            <Button
              variant="outline"
              className="w-full bg-transparent"
              onClick={() =>
                onNavigateToAppointments ? onNavigateToAppointments() : console.log("[v0] Navigating to appointments")
              }
            >
              <Calendar className="h-4 w-4 mr-2" />
              Ver Agenda Completa
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Monitoreo IoT - Signos Vitales
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {iotVitalSigns.map((vital, index) => {
              const IconComponent = vital.icon
              return (
                <div
                  key={index}
                  className={`p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                    vital.color === "destructive"
                      ? "border-red-200 bg-red-50"
                      : vital.color === "warning"
                        ? "border-yellow-200 bg-yellow-50"
                        : "border-green-200 bg-green-50"
                  }`}
                  onClick={() => openVitalSignsDetail(vital.type)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <IconComponent
                        className={`h-4 w-4 ${
                          vital.color === "destructive"
                            ? "text-red-600"
                            : vital.color === "warning"
                              ? "text-yellow-600"
                              : "text-green-600"
                        }`}
                      />
                      <span className="text-sm font-medium">{vital.type}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {vital.trend === "up" ? (
                        <TrendingUp className="h-3 w-3 text-red-500" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-red-500" />
                      )}
                      <Badge
                        variant={
                          vital.color === "destructive"
                            ? "destructive"
                            : vital.color === "warning"
                              ? "secondary"
                              : "default"
                        }
                      >
                        {vital.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div
                        className={`text-2xl font-bold ${
                          vital.color === "destructive"
                            ? "text-red-600"
                            : vital.color === "warning"
                              ? "text-yellow-600"
                              : "text-green-600"
                        }`}
                      >
                        {vital.value}
                      </div>
                      <div className="text-xs text-gray-600">{vital.patient}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-500">{vital.lastUpdate}</div>
                      <div className="text-xs text-gray-500">
                        Rango: {vital.threshold.min} - {vital.threshold.max}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
            <Button variant="outline" className="w-full bg-transparent" onClick={() => setIsVitalSignsDetailOpen(true)}>
              <Activity className="h-4 w-4 mr-2" />
              Ver Todos los Sensores
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 gap-6">
        {/* Notificaciones Importantes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Notificaciones del Sistema
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {selectedNotifications.map((notif) => (
              <div
                key={notif.id}
                className={`flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 ${notif.read ? "opacity-60" : ""}`}
                onClick={() => markNotificationAsRead(notif.id)}
              >
                <div
                  className={`w-2 h-2 rounded-full mt-2 ${
                    notif.type === "warning" ? "bg-yellow-500" : notif.type === "info" ? "bg-blue-500" : "bg-green-500"
                  }`}
                ></div>
                <div className="flex-1">
                  <div className="text-sm">{notif.message}</div>
                  <div className="text-xs text-gray-500">hace {notif.time}</div>
                </div>
                {!notif.read && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Dialog open={isVitalSignsDetailOpen} onOpenChange={setIsVitalSignsDetailOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Monitoreo Detallado de Signos Vitales IoT</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {iotVitalSigns.map((vital, index) => {
              const IconComponent = vital.icon
              return (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <IconComponent className="h-5 w-5" />
                      {vital.type} - {vital.patient}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Valor Actual:</span>
                          <span
                            className={`text-lg font-bold ${
                              vital.color === "destructive"
                                ? "text-red-600"
                                : vital.color === "warning"
                                  ? "text-yellow-600"
                                  : "text-green-600"
                            }`}
                          >
                            {vital.value}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Estado:</span>
                          <Badge
                            variant={
                              vital.color === "destructive"
                                ? "destructive"
                                : vital.color === "warning"
                                  ? "secondary"
                                  : "default"
                            }
                          >
                            {vital.status}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Rango Normal:</span>
                          <span className="text-sm">
                            {vital.threshold.min} - {vital.threshold.max}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Última Actualización:</span>
                          <span className="text-sm">{vital.lastUpdate}</span>
                        </div>
                      </div>
                      <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={vital.data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="time" />
                            <YAxis />
                            <Tooltip />
                            <Area
                              type="monotone"
                              dataKey="value"
                              stroke={
                                vital.color === "destructive"
                                  ? "#dc2626"
                                  : vital.color === "warning"
                                    ? "#d97706"
                                    : "#059669"
                              }
                              fill={
                                vital.color === "destructive"
                                  ? "#fecaca"
                                  : vital.color === "warning"
                                    ? "#fed7aa"
                                    : "#a7f3d0"
                              }
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
