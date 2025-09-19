export interface StorageData {
    patients: any[]
    appointments: any[]
    treatments: any[]
    alerts: any[]
    notifications: any[]
}

const STORAGE_KEY = "oncontrol_data"

export const storage = {
    // Load data from localStorage or return default data
    loadData(): StorageData {
        if (typeof window === "undefined") {
            return this.getDefaultData()
        }

        try {
            const stored = localStorage.getItem(STORAGE_KEY)
            if (stored) {
                return JSON.parse(stored)
            }
        } catch (error) {
            console.error("[v0] Error loading data from localStorage:", error)
        }

        return this.getDefaultData()
    },

    // Save data to localStorage
    saveData(data: StorageData): void {
        if (typeof window === "undefined") return

        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
            console.log("[v0] Data saved to localStorage")
        } catch (error) {
            console.error("[v0] Error saving data to localStorage:", error)
        }
    },

    // Get default data structure
    getDefaultData(): StorageData {
        return {
            patients: [
                {
                    id: 1,
                    name: "Juan Pérez",
                    age: 45,
                    diagnosis: "Cáncer de pulmón",
                    stage: "Estadio II",
                    lastVisit: "2024-01-15",
                    nextAppointment: "2024-01-22",
                    status: "En tratamiento",
                    phone: "987654321",
                    email: "juan.perez@email.com",
                    address: "Av. Principal 123, Lima",
                },
                {
                    id: 2,
                    name: "María López",
                    age: 52,
                    diagnosis: "Cáncer de mama",
                    stage: "Estadio I",
                    lastVisit: "2024-01-10",
                    nextAppointment: "2024-01-25",
                    status: "En seguimiento",
                    phone: "987654322",
                    email: "maria.lopez@email.com",
                    address: "Jr. Los Olivos 456, Lima",
                },
            ],
            appointments: [
                {
                    id: 1,
                    patientId: 1,
                    patientName: "Juan Pérez",
                    date: "2024-01-22",
                    time: "10:00",
                    type: "Consulta de seguimiento",
                    status: "Programada",
                    notes: "Control post-quimioterapia",
                },
                {
                    id: 2,
                    patientId: 2,
                    patientName: "María López",
                    date: "2024-01-25",
                    time: "14:30",
                    type: "Consulta inicial",
                    status: "Programada",
                    notes: "Primera consulta oncológica",
                },
            ],
            treatments: [
                {
                    id: 1,
                    patientId: 1,
                    patientName: "Juan Pérez",
                    type: "Quimioterapia",
                    medication: "Cisplatino + Etopósido",
                    startDate: "2024-01-01",
                    endDate: "2024-03-01",
                    cycles: 6,
                    currentCycle: 3,
                    status: "En progreso",
                    sideEffects: "Náuseas leves, fatiga",
                },
            ],
            alerts: [
                {
                    id: 1,
                    patientId: 1,
                    patientName: "Juan Pérez",
                    type: "critical",
                    title: "Temperatura crítica",
                    message: "Temperatura de 39.5°C detectada",
                    timestamp: "2024-01-20T10:30:00",
                    status: "unresolved",
                    priority: "high",
                },
                {
                    id: 2,
                    patientId: 2,
                    patientName: "María López",
                    type: "warning",
                    title: "Sensor desconectado",
                    message: "Sensor de signos vitales desconectado",
                    timestamp: "2024-01-20T09:15:00",
                    status: "unresolved",
                    priority: "medium",
                },
            ],
            notifications: [
                {
                    id: 1,
                    type: "critical",
                    message: "Paciente Juan Pérez - Temperatura crítica: 39.5°C",
                    timestamp: "2024-01-20T10:30:00",
                    read: false,
                },
                {
                    id: 2,
                    type: "warning",
                    message: "Sensor de María López desconectado",
                    timestamp: "2024-01-20T09:15:00",
                    read: false,
                },
            ],
        }
    },

    // Update specific data section
    updateSection(section: keyof StorageData, data: any[]): void {
        const currentData = this.loadData()
        currentData[section] = data
        this.saveData(currentData)
    },

    // Add new item to a section
    addItem(section: keyof StorageData, item: any): void {
        const currentData = this.loadData()
        const maxId = currentData[section].length > 0 ? Math.max(...currentData[section].map((i: any) => i.id || 0)) : 0

        item.id = maxId + 1
        currentData[section].push(item)
        this.saveData(currentData)
    },

    // Update existing item in a section
    updateItem(section: keyof StorageData, itemId: number, updates: any): void {
        const currentData = this.loadData()
        const itemIndex = currentData[section].findIndex((item: any) => item.id === itemId)

        if (itemIndex !== -1) {
            currentData[section][itemIndex] = { ...currentData[section][itemIndex], ...updates }
            this.saveData(currentData)
        }
    },
}
