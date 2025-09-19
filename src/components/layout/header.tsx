"use client"

import { Tabs, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import { Button } from "@/src/components/ui/button"
import { Badge } from "@/src/components/ui/badge"
import { Bell, User, LogOut, Settings, ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/src/components/ui/dropdown-menu"
import {useEffect, useRef, useState} from "react"

interface HeaderProps {
    activeTab: string
    onTabChange: (value: string) => void
    currentUser?: any
    onLogout?: () => void
    onShowConfiguration?: () => void
    onShowAllNotifications?: () => void
}

export function Header({
                           activeTab,
                           onTabChange,
                           currentUser,
                           onLogout,
                           onShowConfiguration,
                           onShowAllNotifications,
                       }: HeaderProps) {
    const [showNotifications, setShowNotifications] = useState(false)
    const [showUserConfig, setShowUserConfig] = useState(false)
    const notificationRef = useRef<HTMLDivElement>(null)
    const userMenuRef = useRef<HTMLDivElement>(null)

    const notifications = [
        { id: 1, type: "critical", message: "Paciente Juan Pérez - Temperatura crítica: 39.5°C", time: "Hace 2 min" },
        { id: 2, type: "warning", message: "Sensor de María López desconectado", time: "Hace 15 min" },
        { id: 3, type: "info", message: "Cita programada para mañana 10:00 AM", time: "Hace 1 hora" },
    ]

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
                setShowNotifications(false)
            }
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
                setShowUserConfig(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    const handleConfiguration = () => {
        console.log("[v0] Opening configuration")
        setShowUserConfig(false)
        if (onShowConfiguration) {
            onShowConfiguration()
        }
    }

    const handleShowAllNotifications = () => {
        console.log("[v0] Opening all notifications")
        setShowNotifications(false)
        if (onShowAllNotifications) {
            onShowAllNotifications()
        }
    }

    return (
        <header className="bg-[#00796B] border-b border-gray-200 shadow-sm relative">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <img src="/logoOnControl.png" alt="OnControl Logo" className="h-12 w-auto" />
                        <div>
                            <h1 className="text-2xl font-bold text-white">OnControl</h1>
                            <p className="text-gray-200">Sistema de Gestión Médica Oncológica</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative" ref={notificationRef}>
                            <Button
                                variant="outline"
                                size="sm"
                                className="bg-white text-[#00796B] border-white hover:bg-gray-100"
                                onClick={() => setShowNotifications(!showNotifications)}
                            >
                                <Bell className="h-4 w-4" />
                                <Badge variant="destructive" className="ml-1 bg-[#FF5722]">
                                    3
                                </Badge>
                            </Button>

                            {showNotifications && (
                                <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-md shadow-lg z-[10000]">
                                    <div className="p-3 border-b">
                                        <h3 className="font-semibold">Notificaciones</h3>
                                    </div>
                                    {notifications.map((notification) => (
                                        <div key={notification.id} className="p-3 hover:bg-gray-50 cursor-pointer">
                                            <div className="flex flex-col gap-1 w-full">
                                                <div className="flex items-center gap-2">
                                                    <div
                                                        className={`w-2 h-2 rounded-full ${
                                                            notification.type === "critical"
                                                                ? "bg-red-500"
                                                                : notification.type === "warning"
                                                                    ? "bg-yellow-500"
                                                                    : "bg-blue-500"
                                                        }`}
                                                    />
                                                    <span className="text-sm font-medium">{notification.message}</span>
                                                </div>
                                                <span className="text-xs text-gray-500 ml-4">{notification.time}</span>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="border-t">
                                        <div
                                            className="p-3 text-center text-sm text-[#00796B] cursor-pointer hover:bg-gray-50"
                                            onClick={handleShowAllNotifications}
                                        >
                                            Ver todas las notificaciones
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="relative" ref={userMenuRef}>
                            <Button
                                variant="outline"
                                size="sm"
                                className="bg-[#FF5722] text-white border-[#FF5722] hover:bg-[#E64A19]"
                                onClick={() => setShowUserConfig(!showUserConfig)}
                            >
                                <User className="h-4 w-4" />
                                {currentUser?.name || "Dr. María González"}
                                <ChevronDown className="h-3 w-3 ml-1" />
                            </Button>

                            {showUserConfig && (
                                <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-[10000]">
                                    <div className="p-3 border-b">
                                        <p className="font-medium">{currentUser?.name || "Dr. María González"}</p>
                                        <p className="text-sm text-gray-500">Oncólogo</p>
                                    </div>
                                    <div className="p-3 cursor-pointer hover:bg-gray-50 flex items-center" onClick={handleConfiguration}>
                                        <Settings className="h-4 w-4 mr-2" />
                                        Configuración
                                    </div>
                                    {onLogout && (
                                        <>
                                            <div className="border-t"></div>
                                            <div
                                                className="p-3 cursor-pointer text-red-600 hover:bg-gray-50 flex items-center"
                                                onClick={onLogout}
                                            >
                                                <LogOut className="h-4 w-4 mr-2" />
                                                Cerrar Sesión
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
                    <TabsList className="grid w-full grid-cols-5 bg-[#004D40]">
                        <TabsTrigger
                            value="dashboard"
                            className="data-[state=active]:bg-white data-[state=active]:text-[#00796B] text-white"
                        >
                            Dashboard
                        </TabsTrigger>
                        <TabsTrigger
                            value="patients"
                            className="data-[state=active]:bg-white data-[state=active]:text-[#00796B] text-white"
                        >
                            Pacientes
                        </TabsTrigger>
                        <TabsTrigger
                            value="appointments"
                            className="data-[state=active]:bg-white data-[state=active]:text-[#00796B] text-white"
                        >
                            Citas
                        </TabsTrigger>
                        <TabsTrigger
                            value="treatments"
                            className="data-[state=active]:bg-white data-[state=active]:text-[#00796B] text-white"
                        >
                            Tratamientos
                        </TabsTrigger>
                        <TabsTrigger
                            value="alerts"
                            className="data-[state=active]:bg-white data-[state=active]:text-[#00796B] text-white"
                        >
                            Alertas
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>
        </header>
    )
}
