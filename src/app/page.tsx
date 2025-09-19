"use client"

import { useState } from "react"
import { Header } from "@/src/components/layout/header"
import { LoginForm } from "@/src/components/auth/login-form"
import { RegisterForm } from "@/src/components/auth/register-form"
import { DashboardWireframe } from "@/src/components/wireframes/dashboard-wireframe"
import { PatientManagementWireframe } from "@/src/components/wireframes/patient-management-wireframe"
import { AppointmentScheduleWireframe } from "@/src/components/wireframes/appointment-schedule-wireframe"
import { TreatmentTrackingWireframe } from "@/src/components/wireframes/treatment-tracking-wireframe"
import { AlertsWireframe } from "@/src/components/wireframes/alerts-wireframe"
import { ConfigurationWireframe } from "@/src/components/wireframes/configuration-wireframe"
import { NotificationsWireframe } from "@/src/components/wireframes/notifications-wireframe"

export default function MedicalSystemPage() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "register">("login")
  const [currentUser, setCurrentUser] = useState<any>(null)

  const handleLogin = (email: string, password: string) => {
    // Simulación de login - en producción conectar con API
    console.log("[v0] Login attempt:", { email, password })
    setCurrentUser({ email, name: "Dr. María González" })
    setIsAuthenticated(true)
  }

  const handleRegister = (userData: any) => {
    // Simulación de registro - en producción conectar con API
    console.log("[v0] Register attempt:", userData)
    setCurrentUser({ email: userData.email, name: userData.name })
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setCurrentUser(null)
    setActiveTab("dashboard")
  }

  const handleShowConfiguration = () => {
    console.log("[v0] Navigating to configuration")
    setActiveTab("configuration")
  }

  const handleShowAllNotifications = () => {
    console.log("[v0] Navigating to all notifications")
    setActiveTab("notifications")
  }

  const handleViewPatient = (patientName: string) => {
    console.log("[v0] Navigating to patient:", patientName)
    setActiveTab("patients")
    // In a real app, you would also set a patient ID or filter
  }

  const handleNavigateToAppointments = () => {
    console.log("[v0] Navigating to appointments from dashboard")
    setActiveTab("appointments")
  }

  const handleNavigateToAlerts = (alertId?: string) => {
    console.log("[v0] Navigating to alerts from dashboard", alertId)
    setActiveTab("alerts")
  }

  if (!isAuthenticated) {
    if (authMode === "login") {
      return <LoginForm onLogin={handleLogin} onSwitchToRegister={() => setAuthMode("register")} />
    } else {
      return <RegisterForm onRegister={handleRegister} onSwitchToLogin={() => setAuthMode("login")} />
    }
  }

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <DashboardWireframe
            onViewPatient={handleViewPatient}
            onNavigateToAppointments={handleNavigateToAppointments}
            onNavigateToAlerts={handleNavigateToAlerts}
          />
        )
      case "patients":
        return <PatientManagementWireframe />
      case "appointments":
        return <AppointmentScheduleWireframe />
      case "treatments":
        return <TreatmentTrackingWireframe />
      case "alerts":
        return <AlertsWireframe onViewPatient={handleViewPatient} />
      case "configuration":
        return <ConfigurationWireframe />
      case "notifications":
        return <NotificationsWireframe />
      default:
        return <DashboardWireframe onViewPatient={handleViewPatient} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        currentUser={currentUser}
        onLogout={handleLogout}
        onShowConfiguration={handleShowConfiguration}
        onShowAllNotifications={handleShowAllNotifications}
      />

      <main className="max-w-7xl mx-auto px-6 py-6">{renderContent()}</main>
    </div>
  )
}
