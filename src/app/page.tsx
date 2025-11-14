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
import { useOnControlFirebase } from "@/src/hooks/use-oncontrol-firebase"

export default function Page() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [authMode, setAuthMode] = useState<"login" | "register">("login")

  const firebase = useOnControlFirebase()

  const handleLogin = async (email: string, password: string) => {
    try {
      await firebase.loginDoctor(email, password)
    } catch (err) {
      console.error("[v0] Login error:", err)
      throw err
    }
  }

  const handleRegister = async (userData: any) => {
    try {
      await firebase.registerDoctor(userData.email, userData.password, {
        name: userData.name,
        email: userData.email,
        specialty: userData.specialty,
        license: userData.license,
        phone: userData.phone,
        dni: userData.dni,
        ruc: userData.ruc,
        documentType: userData.documentType as "dni" | "ruc",
        createdAt: new Date(),
        updatedAt: new Date(),
      } as any)
    } catch (err) {
      console.error("[v0] Register error:", err)
      throw err
    }
  }

  const handleLogout = async () => {
    try {
      await firebase.logoutDoctor()
      setActiveTab("dashboard")
    } catch (err) {
      console.error("[v0] Logout error:", err)
    }
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
  }

  const handleNavigateToAppointments = () => {
    console.log("[v0] Navigating to appointments from dashboard")
    setActiveTab("appointments")
  }

  const handleNavigateToAlerts = (alertId?: string) => {
    console.log("[v0] Navigating to alerts from dashboard", alertId)
    setActiveTab("alerts")
  }

  if (firebase.loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#00796B]/10 mb-4">
            <div className="w-8 h-8 border-3 border-[#00796B] border-t-transparent rounded-full animate-spin" />
          </div>
          <p className="text-gray-600">Cargando aplicación...</p>
        </div>
      </div>
    )
  }

  if (!firebase.isAuthenticated) {
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
        currentUser={firebase.user ? { email: firebase.user.email, name: firebase.user.displayName } : null}
        onLogout={handleLogout}
        onShowConfiguration={handleShowConfiguration}
        onShowAllNotifications={handleShowAllNotifications}
      />

      <main className="max-w-7xl mx-auto px-6 py-6">{renderContent()}</main>
    </div>
  )
}
