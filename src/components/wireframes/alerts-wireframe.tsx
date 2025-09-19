"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Badge } from "@/src/components/ui/badge"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Switch } from "@/src/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import { AlertTriangle, Activity, Thermometer, Heart, Droplets, Settings } from "lucide-react"
import { useState } from "react"

interface AlertsWireframeProps {
  onViewPatient?: (patientName: string) => void
}

export function AlertsWireframe({ onViewPatient }: AlertsWireframeProps) {
  const [alertSettings, setAlertSettings] = useState({
    temperature: { min: 36.0, max: 37.5, enabled: true },
    heartRate: { min: 60, max: 100, enabled: true },
    oxygenLevel: { min: 95, max: 100, enabled: true },
  })

  const [activeAlerts, setActiveAlerts] = useState([
    {
      id: 1,
      patient: "Juan Pérez",
      sensor: "SENSOR-001",
      type: "temperature",
      value: 39.2,
      threshold: 37.5,
      severity: "critical",
      timestamp: "2024-01-15 14:30:25",
      acknowledged: false,
      resolved: false,
    },
    {
      id: 2,
      patient: "María López",
      sensor: "SENSOR-002",
      type: "heartRate",
      value: 110,
      threshold: 100,
      severity: "warning",
      timestamp: "2024-01-15 14:25:10",
      acknowledged: false,
      resolved: false,
    },
    {
      id: 3,
      patient: "Carlos Ruiz",
      sensor: "SENSOR-003",
      type: "oxygenLevel",
      value: 92,
      threshold: 95,
      severity: "warning",
      timestamp: "2024-01-15 14:20:45",
      acknowledged: true,
      resolved: true,
    },
  ])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-500"
      case "warning":
        return "bg-yellow-500"
      case "info":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "temperature":
        return <Thermometer className="h-4 w-4" />
      case "heartRate":
        return <Heart className="h-4 w-4" />
      case "oxygenLevel":
        return <Droplets className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  const handleThresholdChange = (type: string, field: string, value: number) => {
    setAlertSettings((prev) => ({
      ...prev,
      [type]: {
        ...prev[type as keyof typeof prev],
        [field]: value,
      },
    }))
  }

  const handleAcknowledgeAlert = (alertId: number) => {
    console.log(`[v0] Acknowledging alert ${alertId}`)
    setActiveAlerts((prev) => prev.map((alert) => (alert.id === alertId ? { ...alert, acknowledged: true } : alert)))
  }

  const handleToggleResolved = (alertId: number) => {
    console.log(`[v0] Toggling resolved status for alert ${alertId}`)
    setActiveAlerts((prev) =>
      prev.map((alert) => (alert.id === alertId ? { ...alert, resolved: !alert.resolved } : alert)),
    )
  }

  const handleSaveSettings = () => {
    console.log("[v0] Saving alert settings:", alertSettings)
    alert("Configuración de umbrales guardada exitosamente")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-[#00796B]">Sistema de Alertas IoT</h2>
          <p className="text-gray-600">Monitoreo en tiempo real de sensores de pacientes</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="destructive" className="bg-red-500">
            {activeAlerts.filter((a) => a.severity === "critical" && !a.acknowledged).length} Alertas Críticas
          </Badge>
          <Badge variant="secondary" className="bg-yellow-500 text-white">
            {activeAlerts.filter((a) => a.severity === "warning" && !a.acknowledged).length} Advertencias
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active">Alertas Activas</TabsTrigger>
          <TabsTrigger value="settings">Configuración de Umbrales</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                Alertas Activas
              </CardTitle>
              <CardDescription>Alertas generadas por sensores IoT de pacientes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-4 rounded-lg border-l-4 ${
                      alert.severity === "critical"
                        ? "border-red-500 bg-red-50"
                        : alert.severity === "warning"
                          ? "border-yellow-500 bg-yellow-50"
                          : "border-blue-500 bg-blue-50"
                    } ${alert.resolved ? "opacity-60" : ""}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getAlertIcon(alert.type)}
                        <div>
                          <h4 className="font-semibold">{alert.patient}</h4>
                          <p className="text-sm text-gray-600">Sensor: {alert.sensor}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white ${getSeverityColor(alert.severity)}`}
                        >
                          {alert.severity.toUpperCase()}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{alert.timestamp}</p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm">
                        <span className="font-medium">Valor actual:</span> {alert.value}
                        {alert.type === "temperature" ? "°C" : alert.type === "oxygenLevel" ? "%" : " bpm"}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Umbral:</span> {alert.threshold}
                        {alert.type === "temperature" ? "°C" : alert.type === "oxygenLevel" ? "%" : " bpm"}
                      </p>
                    </div>
                    <div className="flex gap-2 mt-3">
                      {!alert.acknowledged && (
                        <Button size="sm" variant="outline" onClick={() => handleAcknowledgeAlert(alert.id)}>
                          Reconocer Alerta
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          onViewPatient
                            ? onViewPatient(alert.patient)
                            : console.log(`[v0] Navigating to patient: ${alert.patient}`)
                        }
                      >
                        Ver Paciente
                      </Button>
                      <Button
                        size="sm"
                        variant={alert.resolved ? "secondary" : "default"}
                        onClick={() => handleToggleResolved(alert.id)}
                      >
                        {alert.resolved ? "Marcar Sin Resolver" : "Marcar Como Resuelta"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Configuración de Umbrales
              </CardTitle>
              <CardDescription>Define los rangos normales para cada tipo de sensor</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Thermometer className="h-4 w-4" />
                    <Label className="text-base font-medium">Temperatura Corporal</Label>
                  </div>
                  <Switch
                    checked={alertSettings.temperature.enabled}
                    onCheckedChange={(checked) =>
                      setAlertSettings((prev) => ({
                        ...prev,
                        temperature: { ...prev.temperature, enabled: checked },
                      }))
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 ml-6">
                  <div>
                    <Label htmlFor="temp-min">Mínimo (°C)</Label>
                    <Input
                      id="temp-min"
                      type="number"
                      step="0.1"
                      value={alertSettings.temperature.min}
                      onChange={(e) => handleThresholdChange("temperature", "min", Number.parseFloat(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="temp-max">Máximo (°C)</Label>
                    <Input
                      id="temp-max"
                      type="number"
                      step="0.1"
                      value={alertSettings.temperature.max}
                      onChange={(e) => handleThresholdChange("temperature", "max", Number.parseFloat(e.target.value))}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4" />
                    <Label className="text-base font-medium">Ritmo Cardíaco</Label>
                  </div>
                  <Switch
                    checked={alertSettings.heartRate.enabled}
                    onCheckedChange={(checked) =>
                      setAlertSettings((prev) => ({
                        ...prev,
                        heartRate: { ...prev.heartRate, enabled: checked },
                      }))
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 ml-6">
                  <div>
                    <Label htmlFor="hr-min">Mínimo (bpm)</Label>
                    <Input
                      id="hr-min"
                      type="number"
                      value={alertSettings.heartRate.min}
                      onChange={(e) => handleThresholdChange("heartRate", "min", Number.parseInt(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="hr-max">Máximo (bpm)</Label>
                    <Input
                      id="hr-max"
                      type="number"
                      value={alertSettings.heartRate.max}
                      onChange={(e) => handleThresholdChange("heartRate", "max", Number.parseInt(e.target.value))}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Droplets className="h-4 w-4" />
                    <Label className="text-base font-medium">Nivel de Oxígeno</Label>
                  </div>
                  <Switch
                    checked={alertSettings.oxygenLevel.enabled}
                    onCheckedChange={(checked) =>
                      setAlertSettings((prev) => ({
                        ...prev,
                        oxygenLevel: { ...prev.oxygenLevel, enabled: checked },
                      }))
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 ml-6">
                  <div>
                    <Label htmlFor="ox-min">Mínimo (%)</Label>
                    <Input
                      id="ox-min"
                      type="number"
                      value={alertSettings.oxygenLevel.min}
                      onChange={(e) => handleThresholdChange("oxygenLevel", "min", Number.parseInt(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="ox-max">Máximo (%)</Label>
                    <Input
                      id="ox-max"
                      type="number"
                      value={alertSettings.oxygenLevel.max}
                      onChange={(e) => handleThresholdChange("oxygenLevel", "max", Number.parseInt(e.target.value))}
                    />
                  </div>
                </div>
              </div>

              <Button className="w-full bg-[#00796B] hover:bg-[#004D40]" onClick={handleSaveSettings}>
                Guardar Configuración
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
