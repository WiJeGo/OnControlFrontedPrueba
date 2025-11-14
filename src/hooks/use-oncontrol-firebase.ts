'use client'

import { useEffect, useState, useCallback } from 'react'
import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { getFirestore, collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, where, setDoc, onSnapshot } from 'firebase/firestore'
import type { DoctorProfile, Patient, Appointment, Alert, Treatment, AlertThresholds, FirebaseUser } from '@/src/types/firebase'

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Initialize Firebase app (singleton pattern)
let firebaseApp: any = null
let auth: any = null
let db: any = null

const initializeFirebase = () => {
  if (!firebaseApp) {
    firebaseApp = initializeApp(firebaseConfig)
    auth = getAuth(firebaseApp)
    db = getFirestore(firebaseApp)
  }
  return { firebaseApp, auth, db }
}

const APP_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'oncontrol-app'

export const useOnControlFirebase = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<FirebaseUser | null>(null)
  const [doctorProfile, setDoctorProfile] = useState<DoctorProfile | null>(null)
  const [patients, setPatients] = useState<Patient[]>([])
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [alertSettings, setAlertSettings] = useState<AlertThresholds | null>(null)
  const [treatments, setTreatments] = useState<Treatment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { auth: firebaseAuth, db: firebaseDb } = initializeFirebase()

  // Initialize Firebase and restore session
  useEffect(() => {
    if (!firebaseAuth) return

    const unsubscribe = firebaseAuth.onAuthStateChanged(async (firebaseUser: any) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
        })
        setIsAuthenticated(true)
        
        // Load doctor profile
        await loadDoctorProfile(firebaseUser.uid)
        
        // Subscribe to real-time updates
        subscribeToPatients(firebaseUser.uid)
        subscribeToAppointments(firebaseUser.uid)
        subscribeToAlerts(firebaseUser.uid)
        subscribeToTreatments(firebaseUser.uid)
        subscribeToAlertSettings(firebaseUser.uid)
      } else {
        setUser(null)
        setIsAuthenticated(false)
        setDoctorProfile(null)
        setPatients([])
        setAppointments([])
        setAlerts([])
        setTreatments([])
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [firebaseAuth])

  // Load doctor profile
  const loadDoctorProfile = useCallback(
    async (uid: string) => {
      try {
        const docRef = doc(firebaseDb, 'artifacts', APP_ID, 'public', 'data', 'doctors', uid)
        const docSnap = await getDocs(collection(firebaseDb, 'artifacts', APP_ID, 'public', 'data', 'doctors'))
        
        // Try to find the doctor by UID
        let foundDoc: DoctorProfile | null = null
        for (const d of docSnap.docs) {
          const data = d.data() as any
          if (data.uid === uid) {
            // Cast the raw data to DoctorProfile and normalize Firestore timestamps
            foundDoc = {
              ...(data as DoctorProfile),
              createdAt: data.createdAt?.toDate?.() || new Date(),
              updatedAt: data.updatedAt?.toDate?.() || new Date(),
            } as DoctorProfile
            break
          }
        }

        if (foundDoc) {
          setDoctorProfile(foundDoc)
        }
      } catch (err) {
        console.error('[Firebase] Error loading doctor profile:', err)
      }
    },
    [firebaseDb]
  )

  // Subscribe to real-time patient updates
  const subscribeToPatients = useCallback(
    (uid: string) => {
      try {
        const patientsRef = collection(firebaseDb, 'artifacts', APP_ID, 'users', uid, 'patients')
        
        const unsubscribe = onSnapshot(patientsRef, (snapshot) => {
          const patientList = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            lastVisit: doc.data().lastVisit?.toDate?.() || new Date(),
            createdAt: doc.data().createdAt?.toDate?.() || new Date(),
            updatedAt: doc.data().updatedAt?.toDate?.() || new Date(),
          })) as Patient[]
          
          setPatients(patientList)
        })

        return unsubscribe
      } catch (err) {
        console.error('[Firebase] Error subscribing to patients:', err)
      }
    },
    [firebaseDb]
  )

  // Subscribe to real-time appointment updates
  const subscribeToAppointments = useCallback(
    (uid: string) => {
      try {
        const appointmentsRef = collection(firebaseDb, 'artifacts', APP_ID, 'users', uid, 'appointments')
        
        const unsubscribe = onSnapshot(appointmentsRef, (snapshot) => {
          const appointmentList = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            date: doc.data().date?.toDate?.() || new Date(),
            createdAt: doc.data().createdAt?.toDate?.() || new Date(),
            updatedAt: doc.data().updatedAt?.toDate?.() || new Date(),
          })) as Appointment[]
          
          setAppointments(appointmentList)
        })

        return unsubscribe
      } catch (err) {
        console.error('[Firebase] Error subscribing to appointments:', err)
      }
    },
    [firebaseDb]
  )

  // Subscribe to real-time alert updates
  const subscribeToAlerts = useCallback(
    (uid: string) => {
      try {
        const alertsRef = collection(firebaseDb, 'artifacts', APP_ID, 'users', uid, 'alerts')
        
        const unsubscribe = onSnapshot(alertsRef, (snapshot) => {
          const alertList = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate?.() || new Date(),
            updatedAt: doc.data().updatedAt?.toDate?.() || new Date(),
            acknowledgedAt: doc.data().acknowledgedAt?.toDate?.() || undefined,
          })) as Alert[]
          
          setAlerts(alertList)
        })

        return unsubscribe
      } catch (err) {
        console.error('[Firebase] Error subscribing to alerts:', err)
      }
    },
    [firebaseDb]
  )

  // Subscribe to real-time treatment updates
  const subscribeToTreatments = useCallback(
    (uid: string) => {
      try {
        const treatmentsRef = collection(firebaseDb, 'artifacts', APP_ID, 'users', uid, 'treatments')
        
        const unsubscribe = onSnapshot(treatmentsRef, (snapshot) => {
          const treatmentList = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            startDate: doc.data().startDate?.toDate?.() || new Date(),
            endDate: doc.data().endDate?.toDate?.() || undefined,
            nextVisit: doc.data().nextVisit?.toDate?.() || new Date(),
            createdAt: doc.data().createdAt?.toDate?.() || new Date(),
            updatedAt: doc.data().updatedAt?.toDate?.() || new Date(),
          })) as Treatment[]
          
          setTreatments(treatmentList)
        })

        return unsubscribe
      } catch (err) {
        console.error('[Firebase] Error subscribing to treatments:', err)
      }
    },
    [firebaseDb]
  )

  // Subscribe to alert thresholds settings
  const subscribeToAlertSettings = useCallback(
    (uid: string) => {
      try {
        const settingsRef = doc(firebaseDb, 'artifacts', APP_ID, 'users', uid, 'settings', 'thresholds')
        
        const unsubscribe = onSnapshot(settingsRef, (snapshot) => {
          if (snapshot.exists()) {
            setAlertSettings(snapshot.data() as AlertThresholds)
          }
        })

        return unsubscribe
      } catch (err) {
        console.error('[Firebase] Error subscribing to alert settings:', err)
      }
    },
    [firebaseDb]
  )

  // AUTH FUNCTIONS
  const registerDoctor = useCallback(
    async (email: string, password: string, doctorData: Partial<DoctorProfile>) => {
      try {
        setError(null)
        const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password)
        const uid = userCredential.user.uid

        // Save doctor profile in public doctors collection
        const doctorRef = doc(firebaseDb, 'artifacts', APP_ID, 'public', 'data', 'doctors', uid)
        await setDoc(doctorRef, {
          uid,
          ...doctorData,
          email,
          createdAt: new Date(),
          updatedAt: new Date(),
        })

        return uid
      } catch (err: any) {
        const errorMessage = err.message || 'Error registering doctor'
        setError(errorMessage)
        throw err
      }
    },
    [firebaseAuth, firebaseDb]
  )

  const loginDoctor = useCallback(
    async (email: string, password: string) => {
      try {
        setError(null)
        await signInWithEmailAndPassword(firebaseAuth, email, password)
      } catch (err: any) {
        const errorMessage = err.message || 'Error logging in'
        setError(errorMessage)
        throw err
      }
    },
    [firebaseAuth]
  )

  const logoutDoctor = useCallback(async () => {
    try {
      setError(null)
      await signOut(firebaseAuth)
    } catch (err: any) {
      const errorMessage = err.message || 'Error logging out'
      setError(errorMessage)
      throw err
    }
  }, [firebaseAuth])

  // PATIENT FUNCTIONS
  const addPatient = useCallback(
    async (patientData: Partial<Patient>) => {
      if (!user) throw new Error('No authenticated user')
      try {
        const patientsRef = collection(firebaseDb, 'artifacts', APP_ID, 'users', user.uid, 'patients')
        const docRef = await addDoc(patientsRef, {
          ...patientData,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        return docRef.id
      } catch (err) {
        console.error('[Firebase] Error adding patient:', err)
        throw err
      }
    },
    [user, firebaseDb]
  )

  const updatePatient = useCallback(
    async (patientId: string, patientData: Partial<Patient>) => {
      if (!user) throw new Error('No authenticated user')
      try {
        const patientRef = doc(firebaseDb, 'artifacts', APP_ID, 'users', user.uid, 'patients', patientId)
        await updateDoc(patientRef, {
          ...patientData,
          updatedAt: new Date(),
        })
      } catch (err) {
        console.error('[Firebase] Error updating patient:', err)
        throw err
      }
    },
    [user, firebaseDb]
  )

  // APPOINTMENT FUNCTIONS
  const addAppointment = useCallback(
    async (appointmentData: Partial<Appointment>) => {
      if (!user) throw new Error('No authenticated user')
      try {
        const appointmentsRef = collection(firebaseDb, 'artifacts', APP_ID, 'users', user.uid, 'appointments')
        const docRef = await addDoc(appointmentsRef, {
          ...appointmentData,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        return docRef.id
      } catch (err) {
        console.error('[Firebase] Error adding appointment:', err)
        throw err
      }
    },
    [user, firebaseDb]
  )

  const updateAppointment = useCallback(
    async (appointmentId: string, appointmentData: Partial<Appointment>) => {
      if (!user) throw new Error('No authenticated user')
      try {
        const appointmentRef = doc(firebaseDb, 'artifacts', APP_ID, 'users', user.uid, 'appointments', appointmentId)
        await updateDoc(appointmentRef, {
          ...appointmentData,
          updatedAt: new Date(),
        })
      } catch (err) {
        console.error('[Firebase] Error updating appointment:', err)
        throw err
      }
    },
    [user, firebaseDb]
  )

  const deleteAppointment = useCallback(
    async (appointmentId: string) => {
      if (!user) throw new Error('No authenticated user')
      try {
        const appointmentRef = doc(firebaseDb, 'artifacts', APP_ID, 'users', user.uid, 'appointments', appointmentId)
        await deleteDoc(appointmentRef)
      } catch (err) {
        console.error('[Firebase] Error deleting appointment:', err)
        throw err
      }
    },
    [user, firebaseDb]
  )

  // ALERT FUNCTIONS
  const updateAlertThresholds = useCallback(
    async (thresholds: Partial<AlertThresholds>) => {
      if (!user) throw new Error('No authenticated user')
      try {
        const settingsRef = doc(firebaseDb, 'artifacts', APP_ID, 'users', user.uid, 'settings', 'thresholds')
        await setDoc(settingsRef, thresholds, { merge: true })
      } catch (err) {
        console.error('[Firebase] Error updating alert thresholds:', err)
        throw err
      }
    },
    [user, firebaseDb]
  )

  const updateAlert = useCallback(
    async (alertId: string, alertData: Partial<Alert>) => {
      if (!user) throw new Error('No authenticated user')
      try {
        const alertRef = doc(firebaseDb, 'artifacts', APP_ID, 'users', user.uid, 'alerts', alertId)
        await updateDoc(alertRef, {
          ...alertData,
          updatedAt: new Date(),
        })
      } catch (err) {
        console.error('[Firebase] Error updating alert:', err)
        throw err
      }
    },
    [user, firebaseDb]
  )

  const addAlert = useCallback(
    async (alertData: Partial<Alert>) => {
      if (!user) throw new Error('No authenticated user')
      try {
        const alertsRef = collection(firebaseDb, 'artifacts', APP_ID, 'users', user.uid, 'alerts')
        const docRef = await addDoc(alertsRef, {
          ...alertData,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        return docRef.id
      } catch (err) {
        console.error('[Firebase] Error adding alert:', err)
        throw err
      }
    },
    [user, firebaseDb]
  )

  return {
    // State
    isAuthenticated,
    user,
    doctorProfile,
    patients,
    appointments,
    alerts,
    alertSettings,
    treatments,
    loading,
    error,
    
    // Auth functions
    registerDoctor,
    loginDoctor,
    logoutDoctor,
    
    // Patient functions
    addPatient,
    updatePatient,
    
    // Appointment functions
    addAppointment,
    updateAppointment,
    deleteAppointment,
    
    // Alert functions
    updateAlertThresholds,
    updateAlert,
    addAlert,
  }
}
