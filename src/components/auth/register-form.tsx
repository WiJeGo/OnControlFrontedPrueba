"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { Eye, EyeOff, Lock, Mail, User, FileText, CreditCard, Building } from "lucide-react"

interface RegisterFormProps {
  onRegister: (userData: any) => void
  onSwitchToLogin: () => void
}

export function RegisterForm({ onRegister, onSwitchToLogin }: RegisterFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    specialty: "",
    license: "",
    phone: "",
    dni: "",
    ruc: "",
    documentType: "dni", // dni or ruc
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden")
      return
    }
    onRegister(formData)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-[#00796B] rounded-full flex items-center justify-center mb-4">
            <User className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-[#00796B]">OnControl</CardTitle>
          <p className="text-gray-600">Registro de Oncólogo</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre Completo</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Dr. Juan Pérez"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="oncologo@hospital.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Tipo de Documento</Label>
              <Select onValueChange={(value) => handleInputChange("documentType", value)} defaultValue="dni">
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona tipo de documento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dni">DNI Personal</SelectItem>
                  <SelectItem value="ruc">RUC de Clínica</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.documentType === "dni" ? (
              <div className="space-y-2">
                <Label htmlFor="dni">DNI</Label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="dni"
                    type="text"
                    placeholder="12345678"
                    value={formData.dni}
                    onChange={(e) => handleInputChange("dni", e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="ruc">RUC de la Clínica</Label>
                <div className="relative">
                  <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="ruc"
                    type="text"
                    placeholder="20123456789"
                    value={formData.ruc}
                    onChange={(e) => handleInputChange("ruc", e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="specialty">Especialidad Oncológica</Label>
              <Select onValueChange={(value) => handleInputChange("specialty", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona tu especialidad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="oncologia-medica">Oncología Médica</SelectItem>
                  <SelectItem value="oncologia-quirurgica">Oncología Quirúrgica</SelectItem>
                  <SelectItem value="radio-oncologia">Radio-Oncología</SelectItem>
                  <SelectItem value="hemato-oncologia">Hemato-Oncología</SelectItem>
                  <SelectItem value="oncologia-pediatrica">Oncología Pediátrica</SelectItem>
                  <SelectItem value="oncologia-ginecologica">Oncología Ginecológica</SelectItem>
                  <SelectItem value="oncologia-urologica">Oncología Urológica</SelectItem>
                  <SelectItem value="oncologia-dermatologica">Oncología Dermatológica</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="license">Número de Licencia Médica</Label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="license"
                  type="text"
                  placeholder="12345678"
                  value={formData.license}
                  onChange={(e) => handleInputChange("license", e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Número de Teléfono</Label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="phone"
                  type="text"
                  placeholder="987654321"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className="pl-10 pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  className="pl-10 pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
            </div>

            <Button type="submit" className="w-full bg-[#00796B] hover:bg-[#004D40]">
              Registrarse
            </Button>

            <div className="text-center">
              <Button
                type="button"
                variant="link"
                onClick={onSwitchToLogin}
                className="text-[#00796B] hover:text-[#004D40]"
              >
                ¿Ya tienes cuenta? Inicia sesión aquí
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
