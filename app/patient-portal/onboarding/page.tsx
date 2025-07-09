"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Shield, Smartphone, Phone, Tablet } from "lucide-react"

export default function PatientOnboarding() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Step 1: Identity Verification
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    lastFourSSN: "",
    
    // Step 2: Contact Information
    phone: "",
    email: "",
    address: "",
    emergencyContact: "",
    emergencyPhone: "",
    
    // Step 3: Device Setup
    primaryDevice: "",
    hasSmartphone: false,
    hasTablet: false,
    hasComputer: false,
    needsTechSupport: false,
    
    // Step 4: Accessibility & Preferences
    visionImpairment: false,
    hearingImpairment: false,
    mobilityLimitations: false,
    preferredLanguage: "English",
    fontSize: "medium",
    
    // Step 5: Notification Preferences
    emailNotifications: true,
    smsNotifications: true,
    appointmentReminders: true,
    medicationReminders: true,
    careTeamUpdates: true,
    
    // Step 6: Digital Consent
    consentToTreatment: false,
    hipaaAcknowledgment: false,
    portalTerms: false,
    communicationConsent: false,
  })

  const totalSteps = 6
  const progress = (currentStep / totalSteps) * 100

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const completeOnboarding = async () => {
    try {
      const response = await fetch('/api/patient-portal/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (response.ok) {
        alert('Onboarding completed successfully! You can now access your patient portal.')
        window.location.href = '/patient-portal'
      }
    } catch (error) {
      console.error('Onboarding error:', error)
      alert('There was an error completing your onboarding. Please try again.')
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.firstName && formData.lastName && formData.dateOfBirth && formData.lastFourSSN
      case 2:
        return formData.phone && formData.email && formData.address
      case 3:
        return formData.primaryDevice
      case 4:
        return formData.preferredLanguage
      case 5:
        return true // Notification preferences are optional
      case 6:
        return formData.consentToTreatment && formData.hipaaAcknowledgment && formData.portalTerms
      default:
        return false
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome to IrishTriplets Patient Portal</h1>
          <p className="text-lg text-gray-600 mt-2">Let's get you set up with your digital healthcare experience</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Step {currentStep} of {totalSteps}</span>
            <span className="text-sm font-medium text-gray-700">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="mb-8">
          <CardContent className="p-8">
            {/* Step 1: Identity Verification */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <Shield className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold">Identity Verification</h2>
                  <p className="text-gray-600">Please verify your identity to secure your account</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      placeholder="Enter your last name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastFourSSN">Last 4 digits of SSN *</Label>
                    <Input
                      id="lastFourSSN"
                      value={formData.lastFourSSN}
                      onChange={(e) => handleInputChange('lastFourSSN', e.target.value)}
                      placeholder="1234"
                      maxLength={4}
                    />
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center mb-2">
                    <Shield className="h-5 w-5 text-blue-600 mr-2" />
                    <h4 className="font-medium text-blue-900">Your Information is Secure</h4>
                  </div>
                  <p className="text-sm text-blue-800">
                    We use this information to verify your identity and ensure only you can access your health records.
                    All data is encrypted and HIPAA compliant.
                  </p>
                </div>
              </div>
            )}

            {/* Step 2: Contact Information */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <Phone className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold">Contact Information</h2>
                  <p className="text-gray-600">How can we reach you for important updates?</p>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="(248) 555-0123"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">Home Address *</Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="123 Main Street, City, State, ZIP"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="emergencyContact">Emergency Contact Name</Label>
                      <Input
                        id="emergencyContact"
                        value={formData.emergencyContact}
                        onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                        placeholder="Contact person's name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
                      <Input
                        id="emergencyPhone"
                        type="tel"
                        value={formData.emergencyPhone}
                        onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
                        placeholder="(248) 555-0124"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Device Setup */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <Smartphone className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold">Device Setup</h2>
                  <p className="text-gray-600">What devices will you use to access your portal?</p>
                </div>

                <div>
                  <Label>Primary Device *</Label>
                  <Select value={formData.primaryDevice} onValueChange={(value) => handleInputChange('primaryDevice', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your primary device" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="smartphone">Smartphone</SelectItem>
                      <SelectItem value="tablet">Tablet</SelectItem>
                      <SelectItem value="computer">Computer/Laptop</SelectItem>
                      <SelectItem value="multiple">Multiple Devices</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <Label>Available Devices (check all that apply)</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-3 p-4 border rounded-lg">
                      <Checkbox
                        id="hasSmartphone"
                        checked={formData.hasSmartphone}
                        onCheckedChange={(checked) => handleInputChange('hasSmartphone', checked)}
                      />
                      <div className="flex items-center space-x-2">
                        <Smartphone className="h-5 w-5 text-blue-500" />
                        <Label htmlFor="hasSmartphone">Smartphone</Label>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-4 border rounded-lg">
                      <Checkbox
                        id="hasTablet"
                        checked={formData.hasTablet}
                        onCheckedChange={(checked) => handleInputChange('hasTablet', checked)}
                      />
                      <div className="flex items-center space-x-2">
                        <Tablet className="h-5 w-5 text-green-500" />
                        <Label htmlFor="hasTablet">Tablet</Label>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-4 border rounded-lg">
                      <Checkbox
                        id="hasComputer"
                        checked={formData.hasComputer}
                        onCheckedChange\
