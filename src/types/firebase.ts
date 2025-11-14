// Firebase data types aligned with the Firestore structure

export interface DoctorProfile {
  uid: string
  name: string
  email: string
  specialty: string
  license: string
  phone: string
  dni?: string
  ruc?: string
  documentType: "dni" | "ruc"
  createdAt: Date
  updatedAt: Date
}

export interface Patient {
  id: string
  name: string
  age: number
  gender: "Masculino" | "Femenino"
  phone: string
  email: string
  bloodType: string
  allergies: string[]
  lastVisit: Date
  status: "Activo" | "Inactivo" | "Cancelado"
  medicalHistory: MedicalHistoryEntry[]
  diagnosis?: string
  createdAt: Date
  updatedAt: Date
}

export interface MedicalHistoryEntry {
  date: Date
  diagnosis: string
  treatment: string
  notes: string
}

export interface Appointment {
  id: string
  patientId: string
  patientName: string
  date: Date
  time: string
  type: "Consulta" | "Seguimiento" | "Procedimiento" | "Emergencia"
  status: "Programada" | "Completada" | "Cancelada" | "No Presentó"
  notes: string
  createdAt: Date
  updatedAt: Date
}

export interface Alert {
  id: string
  patientId: string
  patientName: string
  type: "warning" | "critical" | "info"
  message: string
  severity: "low" | "medium" | "high" | "critical"
  status: "pending" | "acknowledged" | "resolved"
  createdAt: Date
  updatedAt: Date
  acknowledgedAt?: Date
}

export interface AlertThresholds {
  temperatureHigh: number
  temperatureLow: number
  bloodPressureHigh: number
  bloodPressureLow: number
  heartRateHigh: number
  heartRateLow: number
  oxygenLow: number
  glucoseLow: number
  glucoseHigh: number
}

export interface Treatment {
  id: string
  patientId: string
  patientName: string
  treatmentName: string
  status: "En progreso" | "Completado" | "Suspendido" | "En pausa"
  priority: "low" | "medium" | "high" | "critical"
  startDate: Date
  endDate?: Date
  duration: string
  medications: Medication[]
  controls: LabControl[]
  symptoms: Symptom[]
  nextVisit: Date
  createdAt: Date
  updatedAt: Date
}

export interface Medication {
  name: string
  dosage: string
  frequency: string
  status: "Activo" | "Pausado" | "Finalizado"
}

export interface LabControl {
  test: string
  frequency: string
  nextDate: Date
}

export interface Symptom {
  name: string
  description: string
  severity: "low" | "medium" | "high"
  frequency: string
  reportedDate: Date
}

export interface FirebaseUser {
  uid: string
  email: string | null
  displayName: string | null
}
