"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { Bell, AlertTriangle, Info, CheckCircle, Clock, Filter } from "lucide-react"

interface Notification {
  id: number
  type: "warning" | "info" | "success"
  message: string
  time: string
  read: boolean
}

export function NotificationsWireframe() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [filter, setFilter] = useState<"all" | "unread" | "warning" | "info" | "success">("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const response = await fetch("/db.json")
        const data = await response.json()
        setNotifications(data.notifications || [])
      } catch (error) {
        console.error("[v0] Error loading notifications:", error)
        // Fallback data if db.json is not accessible
        setNotifications([
          {
            id: 1,
            type: "warning",
            message: "Paciente Juan Pérez requiere seguimiento urgente",
            time: "2 min",
            read: false,
          },
          {
            id: 2,
            type: "info",
            message: "Nuevos resultados de laboratorio disponibles",
            time: "15 min",
            read: false,
          },
          {
            id: 3,
            type: "success",
            message: "Tratamiento de María García completado exitosamente",
            time: "1 hora",
            read: true,
          },
          {
            id: 4,
            type: "warning",
            message: "Paciente Ana Martínez requiere revisión médica",
            time: "5 min",
            read: false,
          },
          {
            id: 5,
            type: "info",
            message: "Nuevos resultados de laboratorio disponibles para Roberto Silva",
            time: "30 min",
            read: false,
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    loadNotifications()
  }, [])

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-orange-500" />
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  const getNotificationBadgeColor = (type: string) => {
    switch (type) {
      case "warning":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "info":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "success":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const filteredNotifications = notifications.filter((notification) => {
    if (filter === "all") return true
    if (filter === "unread") return !notification.read
    return notification.type === filter
  })

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-[#00796B]">Todas las Notificaciones</h2>
        </div>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00796B] mx-auto"></div>
          <p className="mt-2 text-gray-600">Cargando notificaciones...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bell className="h-8 w-8 text-[#00796B]" />
          <h2 className="text-3xl font-bold text-[#00796B]">Todas las Notificaciones</h2>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="ml-2">
              {unreadCount} sin leer
            </Badge>
          )}
        </div>
        {unreadCount > 0 && (
          <Button onClick={markAllAsRead} variant="outline" size="sm">
            Marcar todas como leídas
          </Button>
        )}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700 mr-2">Filtrar:</span>
            <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>
              Todas ({notifications.length})
            </Button>
            <Button variant={filter === "unread" ? "default" : "outline"} size="sm" onClick={() => setFilter("unread")}>
              Sin leer ({unreadCount})
            </Button>
            <Button
              variant={filter === "warning" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("warning")}
            >
              Advertencias ({notifications.filter((n) => n.type === "warning").length})
            </Button>
            <Button variant={filter === "info" ? "default" : "outline"} size="sm" onClick={() => setFilter("info")}>
              Información ({notifications.filter((n) => n.type === "info").length})
            </Button>
            <Button
              variant={filter === "success" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("success")}
            >
              Éxito ({notifications.filter((n) => n.type === "success").length})
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No hay notificaciones que coincidan con el filtro seleccionado</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          filteredNotifications.map((notification) => (
            <Card
              key={notification.id}
              className={`transition-all hover:shadow-md ${
                !notification.read ? "border-l-4 border-l-[#00796B] bg-blue-50/30" : ""
              }`}
            >
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">{getNotificationIcon(notification.type)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <p
                          className={`text-sm ${!notification.read ? "font-semibold text-gray-900" : "text-gray-700"}`}
                        >
                          {notification.message}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className={getNotificationBadgeColor(notification.type)}>
                            {notification.type === "warning" && "Advertencia"}
                            {notification.type === "info" && "Información"}
                            {notification.type === "success" && "Éxito"}
                          </Badge>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Clock className="h-3 w-3" />
                            <span>hace {notification.time}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                            className="text-xs"
                          >
                            Marcar como leída
                          </Button>
                        )}
                        {notification.read && (
                          <Badge variant="secondary" className="text-xs">
                            Leída
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Summary */}
      {filteredNotifications.length > 0 && (
        <Card className="bg-gray-50">
          <CardContent className="pt-6">
            <div className="text-sm text-gray-600 text-center">
              Mostrando {filteredNotifications.length} de {notifications.length} notificaciones
              {filter !== "all" && ` (filtro: ${filter})`}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
