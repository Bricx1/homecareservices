"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ArrowLeft, Upload, FileText, Check, X, Clock, Brain, UserPlus, Inbox, Send } from "lucide-react"
import Link from "next/link"
import type { Referral } from "@/lib/extendedcare-api"

const initialReferrals: Referral[] = [
  {
    id: "REF-001",
    patientName: "Brenda Smith",
    referralDate: "2024-07-09",
    referralSource: "Mercy Hospital",
    diagnosis: "Post-operative care for hip replacement",
    insuranceProvider: "Medicare",
    insuranceId: "MCR-12345",
    status: "New",
    aiRecommendation: "Approve",
    aiReason: "Standard post-op case with high approval chance.",
  },
  {
    id: "REF-002",
    patientName: "John Doe",
    referralDate: "2024-07-08",
    referralSource: "Fax Upload",
    diagnosis: "Palliative care management",
    insuranceProvider: "Aetna",
    insuranceId: "AET-67890",
    status: "New",
    aiRecommendation: "Deny",
    aiReason: "Palliative care is typically not covered.",
  },
  {
    id: "REF-003",
    patientName: "Jane Miller",
    referralDate: "2024-07-07",
    referralSource: "Community Clinic",
    diagnosis: "Wound care for diabetic ulcer",
    insuranceProvider: "United Healthcare",
    insuranceId: "UHC-54321",
    status: "Pending Auth",
  },
  {
    id: "REF-004",
    patientName: "Peter Jones",
    referralDate: "2024-07-06",
    referralSource: "Mercy Hospital",
    diagnosis: "CHF Management",
    insuranceProvider: "Medicare",
    insuranceId: "MCR-11223",
    status: "Approved",
    socDueDate: "2024-07-13",
  },
]

export default function ReferralManagementPage() {
  const [referrals, setReferrals] = useState<Referral[]>(initialReferrals)
  const [activeTab, setActiveTab] = useState("new")

  const filteredReferrals = useMemo(() => {
    const statusMap = {
      new: "New",
      pending: "Pending Auth",
      approved: "Approved",
      denied: "Denied",
    }
    return referrals.filter((r) => r.status === statusMap[activeTab])
  }, [referrals, activeTab])

  const handleApprove = (id: string) => {
    setReferrals((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          const socDueDate = new Date()
          socDueDate.setDate(socDueDate.getDate() + 5) // Set SOC due in 5 days
          return { ...r, status: "Approved", socDueDate: socDueDate.toISOString().split("T")[0] }
        }
        return r
      }),
    )
  }

  const handleDeny = (id: string) => {
    setReferrals((prev) => prev.map((r) => (r.id === id ? { ...r, status: "Denied" } : r)))
  }

  const handleRequestAuth = (id: string) => {
    setReferrals((prev) => prev.map((r) => (r.id === id ? { ...r, status: "Pending Auth" } : r)))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New":
        return "bg-blue-100 text-blue-800"
      case "Pending Auth":
        return "bg-yellow-100 text-yellow-800"
      case "Approved":
        return "bg-green-100 text-green-800"
      case "Denied":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/patient-tracking">
              <Button variant="ghost" size="sm" className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Patient Tracking
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Referral Management Center</h1>
              <p className="text-gray-600">Process incoming referrals with AI-powered decision support.</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="new">
                  New Referrals ({referrals.filter((r) => r.status === "New").length})
                </TabsTrigger>
                <TabsTrigger value="pending">
                  Pending Auth ({referrals.filter((r) => r.status === "Pending Auth").length})
                </TabsTrigger>
                <TabsTrigger value="approved">
                  Approved ({referrals.filter((r) => r.status === "Approved").length})
                </TabsTrigger>
                <TabsTrigger value="denied">
                  Denied ({referrals.filter((r) => r.status === "Denied").length})
                </TabsTrigger>
              </TabsList>
              <TabsContent value={activeTab} className="mt-6">
                <div className="space-y-4">
                  {filteredReferrals.length > 0 ? (
                    filteredReferrals.map((referral) => (
                      <Card key={referral.id}>
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle>{referral.patientName}</CardTitle>
                              <CardDescription>
                                Referred from: {referral.referralSource} on {referral.referralDate}
                              </CardDescription>
                            </div>
                            <Badge className={getStatusColor(referral.status)}>{referral.status}</Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                            <div>
                              <span className="font-medium">Diagnosis:</span> {referral.diagnosis}
                            </div>
                            <div>
                              <span className="font-medium">Insurance:</span> {referral.insuranceProvider} (
                              {referral.insuranceId})
                            </div>
                          </div>
                          {referral.aiRecommendation && (
                            <Alert
                              className={`mb-4 ${referral.aiRecommendation === "Approve" ? "bg-green-50 border-green-200" : referral.aiRecommendation === "Deny" ? "bg-red-50 border-red-200" : "bg-yellow-50 border-yellow-200"}`}
                            >
                              <Brain className="h-4 w-4" />
                              <AlertTitle className="flex items-center gap-2">
                                AI Recommendation:
                                <span
                                  className={`font-bold ${referral.aiRecommendation === "Approve" ? "text-green-700" : referral.aiRecommendation === "Deny" ? "text-red-700" : "text-yellow-700"}`}
                                >
                                  {referral.aiRecommendation}
                                </span>
                              </AlertTitle>
                              <AlertDescription>{referral.aiReason}</AlertDescription>
                            </Alert>
                          )}
                          {referral.status === "New" && (
                            <div className="flex space-x-2">
                              <Button size="sm" onClick={() => handleApprove(referral.id)}>
                                <Check className="h-4 w-4 mr-2" />
                                Approve
                              </Button>
                              <Button size="sm" variant="destructive" onClick={() => handleDeny(referral.id)}>
                                <X className="h-4 w-4 mr-2" />
                                Deny
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => handleRequestAuth(referral.id)}>
                                <Send className="h-4 w-4 mr-2" />
                                Request Prior Auth
                              </Button>
                            </div>
                          )}
                          {referral.status === "Pending Auth" && (
                            <div className="flex items-center text-yellow-700 text-sm">
                              <Clock className="h-4 w-4 mr-2" />
                              Prior authorization submitted. Awaiting response from payer.
                            </div>
                          )}
                          {referral.status === "Approved" && (
                            <div className="flex items-center text-green-700 text-sm">
                              <Check className="h-4 w-4 mr-2" />
                              Patient admitted. SOC due by {referral.socDueDate}.
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <Inbox className="h-12 w-12 mx-auto mb-4" />
                      <p>No referrals in this category.</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Upload className="h-5 w-5 mr-2" /> Process Faxed Referral
                </CardTitle>
                <CardDescription>Upload a referral document to process it automatically.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                    <FileText className="h-10 w-10 mx-auto text-gray-400 mb-2" />
                    <Label htmlFor="fax-upload" className="text-blue-600 font-medium cursor-pointer">
                      Choose a file
                      <Input id="fax-upload" type="file" className="sr-only" />
                    </Label>
                    <p className="text-xs text-gray-500 mt-1">or drag and drop PDF, PNG, or JPG</p>
                  </div>
                  <Button className="w-full">
                    <Brain className="h-4 w-4 mr-2" />
                    Process with AI-OCR
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <UserPlus className="h-5 w-5 mr-2" /> Manual Referral Entry
                </CardTitle>
                <CardDescription>Enter referral details manually.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="manual-name">Patient Name</Label>
                  <Input id="manual-name" placeholder="John Smith" />
                </div>
                <div>
                  <Label htmlFor="manual-insurance">Insurance Provider</Label>
                  <Input id="manual-insurance" placeholder="Medicare" />
                </div>
                <div>
                  <Label htmlFor="manual-diagnosis">Primary Diagnosis</Label>
                  <Input id="manual-diagnosis" placeholder="Post-operative care" />
                </div>
                <Button className="w-full">Submit Referral</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
