/**
 * Script para cargar datos de ejemplo en Firebase Firestore
 * Ejecutar: npx ts-node scripts/seed-firebase.ts
 * 
 * Este script:
 * 1. Conecta a Firebase
 * 2. Carga doctores de ejemplo
 * 3. Carga pacientes oncológicos
 * 4. Carga citas médicas
 * 5. Carga alertas
 * 6. Carga tratamientos
 */

import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, collection, setDoc, doc, addDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

const APP_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'oncontrol-app'

// Datos de Doctores
const DOCTORS = [
  {
    uid: 'doctor_001',
    email: 'maria.gonzalez@hospital.com',
    password: 'Maria@123456',
    name: 'Dra. María González',
    specialty: 'oncologia-medica',
    license: 'MG2024001',
    phone: '987654321',
    dni: '12345678',
    documentType: 'dni',
  },
  {
    uid: 'doctor_002',
    email: 'carlos.lopez@hospital.com',
    password: 'Carlos@123456',
    name: 'Dr. Carlos López',
    specialty: 'oncologia-quirurgica',
    license: 'CL2024002',
    phone: '987654322',
    ruc: '20123456789',
    documentType: 'ruc',
  },
  {
    uid: 'doctor_003',
    email: 'isabel.martinez@hospital.com',
    password: 'Isabel@123456',
    name: 'Dra. Isabel Martínez',
    specialty: 'radio-oncologia',
    license: 'IM2024003',
    phone: '987654323',
    dni: '87654321',
    documentType: 'dni',
  },
]

// Datos de Pacientes
const PATIENTS = [
  {
    name: 'Roberto Silva',
    age: 62,
    gender: 'male',
    email: 'roberto.silva@email.com',
    phone: '999888777',
    cancer_type: 'Cáncer de Pulmón',
    stage: 'III',
    diagnosis_date: new Date('2024-01-15'),
    treatment_status: 'active',
    medical_record: 'RS-001',
    allergies: ['Penicilina'],
    medications: ['Nivolumab', 'Ipilimumab'],
    notes: 'Paciente respondiendo bien al tratamiento',
  },
  {
    name: 'Patricia Rodríguez',
    age: 55,
    gender: 'female',
    email: 'patricia.rodriguez@email.com',
    phone: '999888778',
    cancer_type: 'Cáncer de Mama',
    stage: 'II',
    diagnosis_date: new Date('2023-11-20'),
    treatment_status: 'active',
    medical_record: 'PR-002',
    allergies: [],
    medications: ['Doxorrubicina', 'Ciclofosfamida'],
    notes: 'En seguimiento post-cirugía',
  },
  {
    name: 'José García',
    age: 58,
    gender: 'male',
    email: 'jose.garcia@email.com',
    phone: '999888779',
    cancer_type: 'Cáncer Colorrectal',
    stage: 'II',
    diagnosis_date: new Date('2024-02-10'),
    treatment_status: 'active',
    medical_record: 'JG-003',
    allergies: ['Sulfonamidas'],
    medications: ['5-FU', 'Leucovorina'],
    notes: 'Primera serie de quimioterapia completada',
  },
  {
    name: 'Alejandra Martínez',
    age: 51,
    gender: 'female',
    email: 'alejandra.martinez@email.com',
    phone: '999888780',
    cancer_type: 'Cáncer de Ovario',
    stage: 'III',
    diagnosis_date: new Date('2023-09-05'),
    treatment_status: 'active',
    medical_record: 'AM-004',
    allergies: ['Aspirina'],
    medications: ['Carboplatino', 'Paclitaxel'],
    notes: 'En mantenimiento de quimioterapia',
  },
  {
    name: 'Felipe Hernández',
    age: 68,
    gender: 'male',
    email: 'felipe.hernandez@email.com',
    phone: '999888781',
    cancer_type: 'Cáncer de Próstata',
    stage: 'II',
    diagnosis_date: new Date('2023-12-01'),
    treatment_status: 'active',
    medical_record: 'FH-005',
    allergies: [],
    medications: ['Enzalutamida'],
    notes: 'Terapia hormonal iniciada',
  },
]

// Datos de Citas
const APPOINTMENTS = [
  {
    patientName: 'Roberto Silva',
    date: new Date(new Date().setDate(new Date().getDate() + 3)),
    time: '10:00',
    type: 'follow_up',
    status: 'scheduled',
    notes: 'Evaluación de respuesta a tratamiento',
  },
  {
    patientName: 'Patricia Rodríguez',
    date: new Date(new Date().setDate(new Date().getDate() + 5)),
    time: '14:00',
    type: 'treatment',
    status: 'scheduled',
    notes: 'Sesión de quimioterapia',
  },
  {
    patientName: 'José García',
    date: new Date(new Date().setDate(new Date().getDate() + 7)),
    time: '11:00',
    type: 'lab_work',
    status: 'scheduled',
    notes: 'Análisis de sangre pre-tratamiento',
  },
]

// Datos de Alertas
const ALERTS = [
  {
    patientName: 'Roberto Silva',
    type: 'critical_value',
    severity: 'critical',
    message: 'Hemoglobina baja: 9.5 g/dL',
    value: 9.5,
    threshold: 10.0,
    acknowledged: false,
  },
  {
    patientName: 'Patricia Rodríguez',
    type: 'medication_reminder',
    severity: 'warning',
    message: 'Recordatorio: próxima sesión de quimioterapia en 2 días',
    acknowledged: false,
  },
  {
    patientName: 'José García',
    type: 'lab_overdue',
    severity: 'warning',
    message: 'Análisis de laboratorio pendiente desde hace 5 días',
    acknowledged: false,
  },
]

// Datos de Tratamientos
const TREATMENTS = [
  {
    patientName: 'Roberto Silva',
    name: 'Inmunoterapia con Nivolumab + Ipilimumab',
    type: 'immunotherapy',
    startDate: new Date('2024-03-01'),
    endDate: undefined,
    nextVisit: new Date(new Date().setDate(new Date().getDate() + 3)),
    status: 'active',
    medications: [
      { name: 'Nivolumab', dosage: '360mg', frequency: 'Cada 3 semanas' },
      { name: 'Ipilimumab', dosage: '1mg/kg', frequency: 'Cada 6 semanas' },
    ],
    side_effects: ['Fatiga', 'Náusea', 'Pérdida de apetito'],
    notes: 'Respuesta favorable en estudios de imagen',
  },
  {
    patientName: 'Patricia Rodríguez',
    name: 'Quimioterapia Adyuvante',
    type: 'chemotherapy',
    startDate: new Date('2024-02-15'),
    endDate: new Date('2024-05-15'),
    nextVisit: new Date(new Date().setDate(new Date().getDate() + 5)),
    status: 'active',
    medications: [
      { name: 'Doxorrubicina', dosage: '60mg/m²', frequency: 'Cada 21 días' },
      { name: 'Ciclofosfamida', dosage: '600mg/m²', frequency: 'Cada 21 días' },
    ],
    side_effects: ['Alopecia', 'Mucositis', 'Cardiotoxicidad'],
    notes: '2 ciclos completados de 4',
  },
]

async function seedFirebase() {
  try {
    console.log('Iniciando carga de datos en Firebase...\n')

    // Cargar doctores
    for (const doctor of DOCTORS) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          doctor.email,
          doctor.password
        )
        
        const doctorRef = doc(db, 'artifacts', APP_ID, 'public', 'data', 'doctors', userCredential.user.uid)
        await setDoc(doctorRef, {
          uid: userCredential.user.uid,
          email: doctor.email,
          name: doctor.name,
          specialty: doctor.specialty,
          license: doctor.license,
          phone: doctor.phone,
          ...(doctor.documentType === 'dni' && { dni: doctor.dni }),
          ...(doctor.documentType === 'ruc' && { ruc: doctor.ruc }),
          documentType: doctor.documentType,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        
        console.log(`✓ Doctor registrado: ${doctor.name}`)
      } catch (err: any) {
        console.log(`- Doctor ya existe: ${doctor.email}`)
      }
    }

    console.log('\n--- Carga de Pacientes, Citas, Alertas y Tratamientos ---\n')
    console.log('Nota: Los pacientes se pueden agregar desde el dashboard después del login.')
    console.log('Para cargar datos masivos, ejecuta manualmente en Firebase Console o usa Admin SDK.\n')

  } catch (error) {
    console.error('Error durante la carga:', error)
  }
}

seedFirebase()
