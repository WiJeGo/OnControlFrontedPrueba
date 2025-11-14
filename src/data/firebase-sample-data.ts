// Sample data structure for Firebase registration
// Use this data to populate your Firestore database

import type { DoctorProfile, Patient, Appointment, Alert, Treatment, AlertThresholds } from "@/src/types/firebase"

// ============================================================================
// DOCTOR PROFILES (artifacts/{appId}/public/data/doctors/{uid})
// ============================================================================

export const sampleDoctorProfiles: Partial<DoctorProfile>[] = [
  {
    name: "Dr. María González",
    specialty: "oncologia-medica",
    license: "MED-12345678",
    phone: "+51987654321",
    dni: "12345678",
    documentType: "dni",
    email: "maria.gonzalez@hospital.com",
  },
  {
    name: "Dr. Carlos Mendoza",
    specialty: "oncologia-quirurgica",
    license: "MED-87654321",
    phone: "+51987654322",
    dni: "87654321",
    documentType: "dni",
    email: "carlos.mendoza@hospital.com",
  },
  {
    name: "Dr. Ana Rodríguez",
    specialty: "radio-oncologia",
    license: "MED-11223344",
    phone: "+51987654323",
    ruc: "20123456789",
    documentType: "ruc",
    email: "ana.rodriguez@hospital.com",
  },
]

// ============================================================================
// PATIENTS (artifacts/{appId}/users/{userId}/patients)
// ============================================================================

export const samplePatients: Partial<Patient>[] = [
  {
    name: "Juan Pérez García",
    age: 45,
    gender: "Masculino",
    phone: "+51987654101",
    email: "juan.perez@email.com",
    bloodType: "O+",
    allergies: ["Penicilina", "Mariscos"],
    status: "Activo",
    diagnosis: "Cáncer de pulmón estadio III",
    medicalHistory: [
      {
        date: new Date("2024-01-15"),
        diagnosis: "Hipertensión arterial",
        treatment: "Enalapril 10mg",
        notes: "Paciente responde bien al tratamiento",
      },
      {
        date: new Date("2024-02-20"),
        diagnosis: "Cáncer de pulmón - diagnóstico inicial",
        treatment: "Programación de quimioterapia",
        notes: "Candidato a tratamiento combinado",
      },
    ],
  },
  {
    name: "María García López",
    age: 32,
    gender: "Femenino",
    phone: "+51987654102",
    email: "maria.garcia@email.com",
    bloodType: "A+",
    allergies: [],
    status: "Activo",
    diagnosis: "Diabetes tipo 2 con complicaciones oncológicas",
    medicalHistory: [
      {
        date: new Date("2024-01-10"),
        diagnosis: "Diabetes tipo 2",
        treatment: "Metformina 500mg",
        notes: "Control glucémico estable",
      },
    ],
  },
  {
    name: "Carlos López Ramírez",
    age: 55,
    gender: "Masculino",
    phone: "+51987654103",
    email: "carlos.lopez@email.com",
    bloodType: "B+",
    allergies: ["Aspirina"],
    status: "Activo",
    diagnosis: "Cáncer colorrectal estadio II",
    medicalHistory: [
      {
        date: new Date("2024-01-12"),
        diagnosis: "Evaluación oncológica",
        treatment: "Inicio protocolo de tratamiento",
        notes: "Paciente aceptable para cirugía",
      },
    ],
  },
  {
    name: "Ana Martínez Flores",
    age: 60,
    gender: "Femenino",
    phone: "+51987654104",
    email: "ana.martinez@email.com",
    bloodType: "AB+",
    allergies: ["Sulfonamidas"],
    status: "Activo",
    diagnosis: "Cáncer de mama HER2 positivo",
    medicalHistory: [
      {
        date: new Date("2024-01-18"),
        diagnosis: "Cáncer de mama",
        treatment: "Herceptin + Taxol",
        notes: "Respuesta favorable al tratamiento inicial",
      },
    ],
  },
  {
    name: "Roberto Silva Mendez",
    age: 38,
    gender: "Masculino",
    phone: "+51987654105",
    email: "roberto.silva@email.com",
    bloodType: "O-",
    allergies: ["Ibuprofeno", "Látex"],
    status: "Activo",
    diagnosis: "Linfoma no-Hodgkin",
    medicalHistory: [
      {
        date: new Date("2024-01-16"),
        diagnosis: "Linfoma B difuso de células grandes",
        treatment: "Rituximab + CHOP",
        notes: "Síntomas mejorando con tratamiento",
      },
    ],
  },
]

// ============================================================================
// APPOINTMENTS (artifacts/{appId}/users/{userId}/appointments)
// ============================================================================

export const sampleAppointments: Partial<Appointment>[] = [
  {
    patientId: "patient-1",
    patientName: "Juan Pérez García",
    date: new Date("2024-03-20"),
    time: "09:00",
    type: "Consulta",
    status: "Programada",
    notes: "Evaluación pre-quimioterapia y discusión de plan de tratamiento",
  },
  {
    patientId: "patient-2",
    patientName: "María García López",
    date: new Date("2024-03-20"),
    time: "10:30",
    status: "Programada",
    type: "Seguimiento",
    notes: "Monitoreo de respuesta a tratamiento y control de efectos secundarios",
  },
  {
    patientId: "patient-3",
    patientName: "Carlos López Ramírez",
    date: new Date("2024-03-21"),
    time: "11:00",
    type: "Procedimiento",
    status: "Programada",
    notes: "Tomografía de estadificación",
  },
  {
    patientId: "patient-4",
    patientName: "Ana Martínez Flores",
    date: new Date("2024-03-21"),
    time: "14:00",
    type: "Seguimiento",
    status: "Programada",
    notes: "Evaluación de tolerancia a quimioterapia",
  },
  {
    patientId: "patient-5",
    patientName: "Roberto Silva Mendez",
    date: new Date("2024-03-22"),
    time: "09:30",
    type: "Consulta",
    status: "Programada",
    notes: "Ciclo 2 de quimioterapia - Evaluación pre-tratamiento",
  },
]

// ============================================================================
// ALERTS (artifacts/{appId}/users/{userId}/alerts)
// ============================================================================

export const sampleAlerts: Partial<Alert>[] = [
  {
    patientId: "patient-1",
    patientName: "Juan Pérez García",
    type: "warning",
    severity: "high",
    message: "Paciente presenta marcadores tumorales elevados. Requiere seguimiento urgente.",
    status: "pending",
  },
  {
    patientId: "patient-2",
    patientName: "María García López",
    type: "info",
    severity: "medium",
    message: "Nuevos resultados de laboratorio disponibles. HbA1c en control.",
    status: "pending",
  },
  {
    patientId: "patient-3",
    patientName: "Carlos López Ramírez",
    type: "critical",
    severity: "critical",
    message: "Leucopenia severa detectada. Suspender quimioterapia y monitorear diariamente.",
    status: "pending",
  },
  {
    patientId: "patient-4",
    patientName: "Ana Martínez Flores",
    type: "warning",
    severity: "medium",
    message: "Toxicidad cardíaca leve. Evaluar continuación de tratamiento.",
    status: "acknowledged",
  },
  {
    patientId: "patient-5",
    patientName: "Roberto Silva Mendez",
    type: "info",
    severity: "low",
    message: "Próxima cita de seguimiento en 1 semana.",
    status: "pending",
  },
]

// ============================================================================
// TREATMENTS (artifacts/{appId}/users/{userId}/treatments)
// ============================================================================

export const sampleTreatments: Partial<Treatment>[] = [
  {
    patientId: "patient-1",
    patientName: "Juan Pérez García",
    treatmentName: "Quimioterapia - Cisplatino + Pemetrexed",
    status: "En progreso",
    priority: "critical",
    startDate: new Date("2024-02-15"),
    duration: "6 meses",
    medications: [
      {
        name: "Cisplatino",
        dosage: "75mg/m²",
        frequency: "Cada 3 semanas",
        status: "Activo",
      },
      {
        name: "Pemetrexed",
        dosage: "500mg/m²",
        frequency: "Cada 3 semanas",
        status: "Activo",
      },
      {
        name: "Ondansetrón",
        dosage: "8mg",
        frequency: "Según necesidad",
        status: "Activo",
      },
    ],
    controls: [
      {
        test: "Hemograma completo",
        frequency: "Semanal",
        nextDate: new Date("2024-03-20"),
      },
      {
        test: "Función renal",
        frequency: "Quincenal",
        nextDate: new Date("2024-03-22"),
      },
      {
        test: "Marcadores tumorales",
        frequency: "Mensual",
        nextDate: new Date("2024-03-30"),
      },
    ],
    symptoms: [
      {
        name: "Náuseas",
        description: "Náuseas moderadas post-quimioterapia",
        severity: "medium",
        frequency: "Post-tratamiento",
        reportedDate: new Date("2024-03-10"),
      },
      {
        name: "Pérdida de apetito",
        description: "Disminución del apetito",
        severity: "medium",
        frequency: "Diaria",
        reportedDate: new Date("2024-03-08"),
      },
    ],
    nextVisit: new Date("2024-03-20"),
  },
  {
    patientId: "patient-4",
    patientName: "Ana Martínez Flores",
    treatmentName: "Herceptin + Taxol (Cáncer de Mama HER2+)",
    status: "En progreso",
    priority: "high",
    startDate: new Date("2024-01-20"),
    duration: "6 meses",
    medications: [
      {
        name: "Herceptin (Trastuzumab)",
        dosage: "4mg/kg",
        frequency: "Semanal",
        status: "Activo",
      },
      {
        name: "Taxol (Paclitaxel)",
        dosage: "80mg/m²",
        frequency: "Semanal",
        status: "Activo",
      },
      {
        name: "Dexametasona",
        dosage: "8mg",
        frequency: "Cada 12 horas",
        status: "Activo",
      },
    ],
    controls: [
      {
        test: "Ecocardiograma",
        frequency: "Mensual",
        nextDate: new Date("2024-03-25"),
      },
      {
        test: "Hemograma",
        frequency: "Semanal",
        nextDate: new Date("2024-03-20"),
      },
    ],
    symptoms: [
      {
        name: "Neuropatía periférica",
        description: "Adormecimiento en manos y pies",
        severity: "medium",
        frequency: "Diaria",
        reportedDate: new Date("2024-03-12"),
      },
    ],
    nextVisit: new Date("2024-03-21"),
  },
  {
    patientId: "patient-5",
    patientName: "Roberto Silva Mendez",
    treatmentName: "Rituximab + CHOP (Linfoma)",
    status: "En progreso",
    priority: "high",
    startDate: new Date("2024-02-01"),
    duration: "6 meses",
    medications: [
      {
        name: "Rituximab",
        dosage: "375mg/m²",
        frequency: "Ciclo 1, luego cada 21 días",
        status: "Activo",
      },
      {
        name: "Ciclofosfamida",
        dosage: "750mg/m²",
        frequency: "Cada 21 días",
        status: "Activo",
      },
      {
        name: "Doxorrubicina",
        dosage: "50mg/m²",
        frequency: "Cada 21 días",
        status: "Activo",
      },
      {
        name: "Vincristina",
        dosage: "1.4mg/m²",
        frequency: "Cada 21 días",
        status: "Activo",
      },
      {
        name: "Prednisona",
        dosage: "100mg",
        frequency: "Diaria (días 1-5)",
        status: "Activo",
      },
    ],
    controls: [
      {
        test: "PET-CT",
        frequency: "Cada 3 ciclos",
        nextDate: new Date("2024-04-15"),
      },
      {
        test: "Hemograma",
        frequency: "Semanal",
        nextDate: new Date("2024-03-20"),
      },
    ],
    symptoms: [
      {
        name: "Fatiga",
        description: "Cansancio generalizado",
        severity: "high",
        frequency: "Diaria",
        reportedDate: new Date("2024-03-11"),
      },
    ],
    nextVisit: new Date("2024-03-22"),
  },
]

// ============================================================================
// ALERT THRESHOLDS/SETTINGS (artifacts/{appId}/users/{userId}/settings/thresholds)
// ============================================================================

export const sampleAlertThresholds: AlertThresholds = {
  temperatureHigh: 38.5,
  temperatureLow: 36.0,
  bloodPressureHigh: 160,
  bloodPressureLow: 90,
  heartRateHigh: 120,
  heartRateLow: 50,
  oxygenLow: 92,
  glucoseLow: 70,
  glucoseHigh: 180,
}

// ============================================================================
// INSTRUCTIONS FOR MANUAL REGISTRATION IN FIREBASE
// ============================================================================

/*
INSTRUCCIONES PARA REGISTRAR DATOS EN FIREBASE MANUALLY:

1. CREAR DOCTOR (Authentication):
   - Email: maria.gonzalez@hospital.com
   - Password: Maria@123456
   - Especialidad: oncologia-medica
   - Nombre: Dr. María González

2. ESTRUCTURA FIRESTORE:
   
   artifacts/
   ├── {projectId}/
   │   ├── public/data/doctors/
   │   │   └── {userId}/
   │   │       ├── name: "Dr. María González"
   │   │       ├── specialty: "oncologia-medica"
   │   │       ├── license: "MED-12345678"
   │   │       ├── phone: "+51987654321"
   │   │       ├── email: "maria.gonzalez@hospital.com"
   │   │       ├── dni: "12345678"
   │   │       ├── documentType: "dni"
   │   │       ├── createdAt: timestamp
   │   │       └── updatedAt: timestamp
   │   │
   │   └── users/{userId}/
   │       ├── patients/
   │       │   ├── patient-1/
   │       │   │   ├── name: "Juan Pérez García"
   │       │   │   ├── age: 45
   │       │   │   ├── gender: "Masculino"
   │       │   │   ├── phone: "+51987654101"
   │       │   │   ├── email: "juan.perez@email.com"
   │       │   │   ├── bloodType: "O+"
   │       │   │   ├── allergies: ["Penicilina", "Mariscos"]
   │       │   │   ├── status: "Activo"
   │       │   │   ├── diagnosis: "Cáncer de pulmón estadio III"
   │       │   │   ├── medicalHistory: []
   │       │   │   ├── createdAt: timestamp
   │       │   │   └── updatedAt: timestamp
   │       │   └── [más pacientes...]
   │       │
   │       ├── appointments/
   │       │   ├── apt-1/
   │       │   │   ├── patientId: "patient-1"
   │       │   │   ├── patientName: "Juan Pérez García"
   │       │   │   ├── date: timestamp
   │       │   │   ├── time: "09:00"
   │       │   │   ├── type: "Consulta"
   │       │   │   ├── status: "Programada"
   │       │   │   ├── notes: "..."
   │       │   │   ├── createdAt: timestamp
   │       │   │   └── updatedAt: timestamp
   │       │   └── [más citas...]
   │       │
   │       ├── alerts/
   │       │   ├── alert-1/
   │       │   │   ├── patientId: "patient-1"
   │       │   │   ├── patientName: "Juan Pérez García"
   │       │   │   ├── type: "warning"
   │       │   │   ├── severity: "high"
   │       │   │   ├── message: "..."
   │       │   │   ├── status: "pending"
   │       │   │   ├── createdAt: timestamp
   │       │   │   └── updatedAt: timestamp
   │       │   └── [más alertas...]
   │       │
   │       ├── treatments/
   │       │   ├── treat-1/
   │       │   │   ├── patientId: "patient-1"
   │       │   │   ├── patientName: "Juan Pérez García"
   │       │   │   ├── treatmentName: "Quimioterapia - Cisplatino + Pemetrexed"
   │       │   │   ├── status: "En progreso"
   │       │   │   ├── priority: "critical"
   │       │   │   ├── startDate: timestamp
   │       │   │   ├── duration: "6 meses"
   │       │   │   ├── medications: []
   │       │   │   ├── controls: []
   │       │   │   ├── symptoms: []
   │       │   │   ├── nextVisit: timestamp
   │       │   │   ├── createdAt: timestamp
   │       │   │   └── updatedAt: timestamp
   │       │   └── [más tratamientos...]
   │       │
   │       └── settings/thresholds/
   │           ├── temperatureHigh: 38.5
   │           ├── temperatureLow: 36.0
   │           ├── bloodPressureHigh: 160
   │           ├── bloodPressureLow: 90
   │           ├── heartRateHigh: 120
   │           ├── heartRateLow: 50
   │           ├── oxygenLow: 92
   │           ├── glucoseLow: 70
   │           └── glucoseHigh: 180

3. FIRESTORE SECURITY RULES:
   Utiliza las reglas proporcionadas en el documento de especificación.

4. CREDENCIALES DE PRUEBA:
   Email: maria.gonzalez@hospital.com
   Password: Maria@123456
   
   Email: carlos.mendoza@hospital.com
   Password: Carlos@123456
*/

export const testCredentials = [
  {
    email: "maria.gonzalez@hospital.com",
    password: "Maria@123456",
    name: "Dr. María González",
  },
  {
    email: "carlos.mendoza@hospital.com",
    password: "Carlos@123456",
    name: "Dr. Carlos Mendoza",
  },
  {
    email: "ana.rodriguez@hospital.com",
    password: "Ana@123456",
    name: "Dr. Ana Rodríguez",
  },
]
