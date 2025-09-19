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
import { Clock, Plus, ChevronLeft, ChevronRight, User, Trash2, Check, X, List } from "lucide-react"
import data from "@/src/data/db"

export function AppointmentScheduleWireframe() {
  const { patients } = data
  const [currentDate, setCurrentDate] = useState(new Date(2024, 2, 19)) // March 19, 2024
  const [viewMode, setViewMode] = useState<"week" | "list">("week")
  const [isNewAppointmentOpen, setIsNewAppointmentOpen] = useState(false)
  const [isEditAppointmentOpen, setIsEditAppointmentOpen] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null)
  const [isPatientSearchOpen, setIsPatientSearchOpen] = useState(false)

  const timeSlots = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
  ]

  const generateWeekDays = () => {
    try {
      const startOfWeek = new Date(currentDate.getTime())
      const day = startOfWeek.getDay()
      const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1)
      startOfWeek.setDate(diff)

      const weekDays = []
      for (let i = 0; i < 5; i++) {
        const date = new Date(startOfWeek.getTime())
        date.setDate(startOfWeek.getDate() + i)

        const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]
        const dayName = dayNames[date.getDay()]
        const dayNumber = date.getDate()
        weekDays.push(`${dayName} ${dayNumber}`)
      }
      return weekDays
    } catch (error) {
      console.error("[v0] Error generating week days:", error)
      return ["Lun 18", "Mar 19", "Mié 20", "Jue 21", "Vie 22"]
    }
  }

  const days = generateWeekDays()

  const [appointments, setAppointments] = useState({
    "Mar 19": {
      "10:00": { id: 1, patient: "Ana García", type: "Seguimiento", status: "confirmed", patientId: "1" },
      "11:30": { id: 2, patient: "Carlos López", type: "Consulta", status: "pending", patientId: "2" },
      "15:00": { id: 3, patient: "María Rodríguez", type: "Revisión", status: "confirmed", patientId: "3" },
    },
    "Mié 20": {
      "09:30": { id: 4, patient: "Juan Pérez", type: "Urgente", status: "confirmed", patientId: "4" },
      "14:30": { id: 5, patient: "Luis Martín", type: "Consulta", status: "pending", patientId: "5" },
    },
    "Vie 22": {
      "10:30": { id: 6, patient: "Carmen Silva", type: "Quimioterapia", status: "confirmed", patientId: "6" },
      "16:00": { id: 7, patient: "Roberto Díaz", type: "Control", status: "pending", patientId: "7" },
    },
    "Lun 25": {
      "09:00": { id: 8, patient: "Elena Torres", type: "Consulta", status: "confirmed", patientId: "8" },
      "11:00": { id: 9, patient: "Miguel Ruiz", type: "Radioterapia", status: "confirmed", patientId: "9" },
    },
    "Mar 26": {
      "14:00": { id: 10, patient: "Isabel Moreno", type: "Seguimiento", status: "pending", patientId: "10" },
    },
  })

  const generateMonthDays = () => {
    try {
      const year = currentDate.getFullYear()
      const month = currentDate.getMonth()
      const firstDay = new Date(year, month, 1)
      const lastDay = new Date(year, month + 1, 0)
      const startDate = new Date(firstDay.getTime())
      startDate.setDate(startDate.getDate() - firstDay.getDay())

      const days = []
      const current = new Date(startDate.getTime())

      for (let i = 0; i < 42; i++) {
        const dayKey = current
          .toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "short",
          })
          .replace(".", "")

        const dayAppointments = appointments[dayKey] || {}
        const appointmentCount = Object.keys(dayAppointments).length

        days.push({
          date: new Date(current.getTime()),
          dayKey,
          isCurrentMonth: current.getMonth() === month,
          isToday: current.toDateString() === new Date().toDateString(),
          appointmentCount,
        })

        current.setDate(current.getDate() + 1)
      }

      return days
    } catch (error) {
      console.error("[v0] Error generating month days:", error)
      return []
    }
  }

  const getAllAppointments = () => {
    const allAppointments = []
    Object.entries(appointments).forEach(([day, dayAppointments]) => {
      Object.entries(dayAppointments).forEach(([time, appointment]) => {
        try {
          allAppointments.push({
            ...appointment,
            day,
            time,
            date: new Date(2024, 2, Number.parseInt(day.split(" ")[1]) || 19),
          })
        } catch (error) {
          console.error("[v0] Error processing appointment:", error)
        }
      })
    })
    return allAppointments.sort((a, b) => a.date.getTime() - b.date.getTime())
  }

  const handleNewAppointment = (formData: FormData) => {
    const data = Object.fromEntries(formData)
    console.log("[v0] Creating new appointment:", data)
    setIsNewAppointmentOpen(false)
  }

  const handleEditAppointment = (formData: FormData) => {
    const data = Object.fromEntries(formData)
    console.log("[v0] Editing appointment:", data)
    setIsEditAppointmentOpen(false)
    setSelectedAppointment(null)
  }

  const handleConfirmAppointment = (appointmentId: number) => {
    console.log("[v0] Confirming appointment:", appointmentId)
    // Update appointment status logic here
  }

  const handleCancelAppointment = (appointmentId: number) => {
    console.log("[v0] Cancelling appointment:", appointmentId)
    // Cancel appointment logic here
  }

  const handleDeleteAppointment = (appointmentId: number) => {
    console.log("[v0] Deleting appointment:", appointmentId)
    // Delete appointment logic here
  }

  const navigateMonth = (direction: "prev" | "next") => {
    try {
      const newDate = new Date(currentDate.getTime())
      newDate.setMonth(currentDate.getMonth() + (direction === "next" ? 1 : -1))
      setCurrentDate(newDate)
      console.log("[v0] Navigating to:", newDate.toLocaleDateString())
    } catch (error) {
      console.error("[v0] Error navigating month:", error)
    }
  }

  const handleTimeSlotClick = (day: string, time: string) => {
    const appointment = appointments[day]?.[time]
    if (appointment) {
      setSelectedAppointment(appointment)
      setIsEditAppointmentOpen(true)
    } else {
      // Open new appointment dialog with pre-filled time
      setIsNewAppointmentOpen(true)
      console.log("[v0] Creating appointment for:", day, time)
    }
  }

  const getTodayAppointments = () => {
    const today = "Mar 19" // Current day
    return appointments[today] ? Object.entries(appointments[today]).map(([time, apt]) => ({ time, ...apt })) : []
  }

  const getTotalStats = () => {
    const todayApts = getTodayAppointments()
    return {
      total: todayApts.length,
      confirmed: todayApts.filter((apt) => apt.status === "confirmed").length,
      pending: todayApts.filter((apt) => apt.status === "pending").length,
    }
  }

  const stats = getTotalStats()

  const handlePatientClick = (patient: any) => {
    console.log("[v0] Selected patient:", patient.name)
    // Find patient's appointments
    const patientAppointments = getAllAppointments().filter((apt) => apt.patient === patient.name)
    if (patientAppointments.length > 0) {
      setSelectedAppointment(patientAppointments[0])
      setIsEditAppointmentOpen(true)
    }
    setIsPatientSearchOpen(false)
  }

  return (
    <div className="space-y-6">
      {/* Controles del calendario */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <h2 className="text-xl font-semibold">
                  {currentDate.toLocaleDateString("es-ES", { month: "long", year: "numeric" })}
                </h2>
                <Button variant="outline" size="sm" onClick={() => navigateMonth("next")}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "week" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("week")}
                  className={viewMode === "week" ? "bg-[#00796B] hover:bg-[#004D40]" : ""}
                >
                  Semana
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={viewMode === "list" ? "bg-[#00796B] hover:bg-[#004D40]" : ""}
                >
                  <List className="h-4 w-4 mr-1" />
                  Lista
                </Button>
              </div>
            </div>

            <Dialog open={isNewAppointmentOpen} onOpenChange={setIsNewAppointmentOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[#FF5722] hover:bg-[#E64A19]">
                  <Plus className="h-4 w-4 mr-2" />
                  Nueva Cita
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
                          <SelectItem key={patient.id} value={patient.id.toString()}>
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
                      <Select name="time" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar hora" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
                        <SelectItem value="seguimiento">Seguimiento</SelectItem>
                        <SelectItem value="quimioterapia">Quimioterapia</SelectItem>
                        <SelectItem value="radioterapia">Radioterapia</SelectItem>
                        <SelectItem value="examenes">Exámenes</SelectItem>
                        <SelectItem value="urgente">Urgente</SelectItem>
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
          </div>
        </CardContent>
      </Card>

      {viewMode === "week" && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Vista de calendario semanal */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="text-base">Vista Semanal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <div className="min-w-[800px]">
                  {/* Header con días */}
                  <div className="grid grid-cols-6 gap-2 mb-4">
                    <div className="text-sm font-medium text-muted-foreground">Hora</div>
                    {days.map((day) => (
                      <div key={day} className="text-sm font-medium text-center p-2 border rounded">
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Grid de horarios */}
                  <div className="space-y-1">
                    {timeSlots.map((time) => (
                      <div key={time} className="grid grid-cols-6 gap-2">
                        <div className="text-sm text-muted-foreground py-2 px-1">{time}</div>
                        {days.map((day) => {
                          const appointment = appointments[day]?.[time]
                          return (
                            <div key={`${day}-${time}`} className="min-h-[40px] border rounded p-1">
                              {appointment ? (
                                <div
                                  className={`text-xs p-2 rounded cursor-pointer hover:opacity-80 ${
                                    appointment.status === "confirmed"
                                      ? "bg-primary/10 border-primary/20"
                                      : "bg-warning/10 border-warning/20"
                                  }`}
                                  onClick={() => handleTimeSlotClick(day, time)}
                                >
                                  <div className="font-medium truncate">{appointment.patient}</div>
                                  <div className="text-muted-foreground">{appointment.type}</div>
                                  <div className="flex gap-1 mt-1">
                                    {appointment.status === "pending" && (
                                      <>
                                        <Button
                                          size="sm"
                                          variant="ghost"
                                          className="h-4 w-4 p-0"
                                          onClick={(e) => {
                                            e.stopPropagation()
                                            handleConfirmAppointment(appointment.id)
                                          }}
                                        >
                                          <Check className="h-3 w-3 text-green-600" />
                                        </Button>
                                        <Button
                                          size="sm"
                                          variant="ghost"
                                          className="h-4 w-4 p-0"
                                          onClick={(e) => {
                                            e.stopPropagation()
                                            handleCancelAppointment(appointment.id)
                                          }}
                                        >
                                          <X className="h-3 w-3 text-red-600" />
                                        </Button>
                                      </>
                                    )}
                                  </div>
                                </div>
                              ) : (
                                <div
                                  className="h-full hover:bg-muted/50 rounded cursor-pointer flex items-center justify-center"
                                  onClick={() => handleTimeSlotClick(day, time)}
                                >
                                  <Plus className="h-4 w-4 text-muted-foreground opacity-0 hover:opacity-100" />
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Panel lateral con detalles */}
          <div className="space-y-4">
            {/* Resumen del día */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Hoy - Mar 19</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total citas:</span>
                  <Badge variant="secondary">{stats.total}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Confirmadas:</span>
                  <Badge variant="default">{stats.confirmed}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Pendientes:</span>
                  <Badge variant="outline" className="border-yellow-500 text-yellow-700">
                    {stats.pending}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Próximas citas */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Próximas Citas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {getTodayAppointments().map((apt) => (
                  <div
                    key={apt.id}
                    className="flex items-center gap-3 p-2 border rounded-lg hover:bg-gray-50 cursor-pointer"
                    onClick={() => {
                      setSelectedAppointment(apt)
                      setIsEditAppointmentOpen(true)
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{apt.time}</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{apt.patient}</div>
                      <div className="text-xs text-muted-foreground">{apt.type}</div>
                    </div>
                    <Badge variant={apt.status === "confirmed" ? "default" : "outline"} className="text-xs">
                      {apt.status === "confirmed" ? "Confirmada" : "Pendiente"}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Acciones rápidas */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Acciones Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start bg-transparent"
                  onClick={() => setIsNewAppointmentOpen(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Agendar Cita
                </Button>

                <Dialog open={isPatientSearchOpen} onOpenChange={setIsPatientSearchOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                      <User className="h-4 w-4 mr-2" />
                      Buscar Paciente
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Buscar Paciente</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Input placeholder="Buscar por nombre o ID..." />
                      <div className="space-y-2 max-h-60 overflow-y-auto">
                        {patients.slice(0, 5).map((patient) => (
                          <div
                            key={patient.id}
                            className="flex items-center justify-between p-2 border rounded hover:bg-gray-50 cursor-pointer"
                            onClick={() => handlePatientClick(patient)}
                          >
                            <div>
                              <div className="font-medium">{patient.name}</div>
                              <div className="text-sm text-gray-600">{patient.age} años</div>
                            </div>
                            <Button size="sm" variant="outline">
                              Ver Citas
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {viewMode === "list" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Lista de Citas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {getAllAppointments().map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => {
                    setSelectedAppointment(appointment)
                    setIsEditAppointmentOpen(true)
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-sm font-medium">{appointment.day}</div>
                      <div className="text-xs text-muted-foreground">{appointment.time}</div>
                    </div>
                    <div>
                      <div className="font-medium">{appointment.patient}</div>
                      <div className="text-sm text-muted-foreground">{appointment.type}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={appointment.status === "confirmed" ? "default" : "outline"}>
                      {appointment.status === "confirmed" ? "Confirmada" : "Pendiente"}
                    </Badge>
                    {appointment.status === "pending" && (
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleConfirmAppointment(appointment.id)
                          }}
                        >
                          <Check className="h-4 w-4 text-green-600" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleCancelAppointment(appointment.id)
                          }}
                        >
                          <X className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Edit Appointment Dialog */}
      <Dialog open={isEditAppointmentOpen} onOpenChange={setIsEditAppointmentOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Editar Cita - {selectedAppointment?.patient}</DialogTitle>
          </DialogHeader>
          {selectedAppointment && (
            <form action={handleEditAppointment} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="editDate">Fecha</Label>
                  <Input id="editDate" name="date" type="date" required />
                </div>
                <div>
                  <Label htmlFor="editTime">Hora</Label>
                  <Select name="time" defaultValue={selectedAppointment.time} required>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="editType">Tipo de Cita</Label>
                <Select name="type" defaultValue={selectedAppointment.type} required>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="consulta">Consulta</SelectItem>
                    <SelectItem value="control">Control</SelectItem>
                    <SelectItem value="seguimiento">Seguimiento</SelectItem>
                    <SelectItem value="quimioterapia">Quimioterapia</SelectItem>
                    <SelectItem value="radioterapia">Radioterapia</SelectItem>
                    <SelectItem value="examenes">Exámenes</SelectItem>
                    <SelectItem value="urgente">Urgente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="editStatus">Estado</Label>
                <Select name="status" defaultValue={selectedAppointment.status} required>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="confirmed">Confirmada</SelectItem>
                    <SelectItem value="pending">Pendiente</SelectItem>
                    <SelectItem value="cancelled">Cancelada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1">
                  Guardar Cambios
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => {
                    handleDeleteAppointment(selectedAppointment.id)
                    setIsEditAppointmentOpen(false)
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Leyenda */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-primary/20 border border-primary/40 rounded"></div>
              <span className="text-sm">Cita Confirmada</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-warning/20 border border-warning/40 rounded"></div>
              <span className="text-sm">Cita Pendiente</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-muted border rounded"></div>
              <span className="text-sm">Horario Disponible</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
