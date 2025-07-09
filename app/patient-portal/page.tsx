"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Heart,
  Pill,
  MessageSquare,
  Users,
  Gamepad2,
  Brain,
  Camera,
  Clock,
  Shield,
  Bell,
  Calendar,
  Activity,
  Target,
  Award,
  CheckCircle,
  User,
  Phone,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Bot,
  Send,
  Minimize2,
} from "lucide-react"

export default function PatientPortal() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [selectedMedication, setSelectedMedication] = useState<any>(null)
  const [gameScore, setGameScore] = useState(0)
  const [complaintForm, setComplaintForm] = useState({
    type: "",
    staffMember: "",
    description: "",
    anonymous: false,
  })

  // AI Voice Assistant State
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [chatMessages, setChatMessages] = useState<
    Array<{ id: string; type: "user" | "ai"; message: string; timestamp: Date }>
  >([
    {
      id: "1",
      type: "ai",
      message:
        'Hello Margaret! I\'m your AI assistant. You can ask me questions or tell me where you\'d like to go in your portal. Try saying "Show me my medications" or "Go to care team".',
      timestamp: new Date(),
    },
  ])
  const [currentMessage, setCurrentMessage] = useState("")
  const [chatOpen, setChatOpen] = useState(false)
  const [voiceEnabled, setVoiceEnabled] = useState(true)
  const recognitionRef = useRef<any>(null)
  const synthRef = useRef<any>(null)

  // Initialize Speech Recognition and Synthesis
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Speech Recognition
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.continuous = false
        recognitionRef.current.interimResults = false
        recognitionRef.current.lang = "en-US"

        recognitionRef.current.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript
          handleVoiceCommand(transcript)
        }

        recognitionRef.current.onerror = (event: any) => {
          console.error("Speech recognition error:", event.error)
          setIsListening(false)
        }

        recognitionRef.current.onend = () => {
          setIsListening(false)
        }
      }

      // Speech Synthesis
      if ("speechSynthesis" in window) {
        synthRef.current = window.speechSynthesis
      }
    }
  }, [])

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true)
      recognitionRef.current.start()
    }
  }

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }

  const speak = (text: string) => {
    if (synthRef.current && voiceEnabled) {
      setIsSpeaking(true)
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.9
      utterance.pitch = 1
      utterance.volume = 0.8

      utterance.onend = () => {
        setIsSpeaking(false)
      }

      synthRef.current.speak(utterance)
    }
  }

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel()
      setIsSpeaking(false)
    }
  }

  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase()

    // Add user message to chat
    const userMessage = {
      id: Date.now().toString(),
      type: "user" as const,
      message: command,
      timestamp: new Date(),
    }
    setChatMessages((prev) => [...prev, userMessage])

    let response = ""
    let action = null

    // Navigation commands
    if (lowerCommand.includes("medication") || lowerCommand.includes("pills") || lowerCommand.includes("drugs")) {
      setActiveTab("medications")
      response = "I've opened your medications page. Here you can see your current medications and scan new ones."
      action = "navigate"
    } else if (
      lowerCommand.includes("care team") ||
      lowerCommand.includes("nurse") ||
      lowerCommand.includes("doctor")
    ) {
      setActiveTab("care-team")
      response =
        "I've opened your care team page. You can see all your healthcare providers and their contact information."
      action = "navigate"
    } else if (lowerCommand.includes("treatment") || lowerCommand.includes("plan")) {
      setActiveTab("treatment")
      response = "I've opened your treatment plans. You can see your progress and goals here."
      action = "navigate"
    } else if (lowerCommand.includes("game") || lowerCommand.includes("brain") || lowerCommand.includes("play")) {
      setActiveTab("games")
      response = "I've opened your brain games. These games help keep your mind sharp and are fun to play!"
      action = "navigate"
    } else if (lowerCommand.includes("document") || lowerCommand.includes("forms") || lowerCommand.includes("papers")) {
      setActiveTab("documents")
      response = "I've opened your documents page. Here you can view and download all your forms and consent documents."
      action = "navigate"
    } else if (
      lowerCommand.includes("community") ||
      lowerCommand.includes("chat") ||
      lowerCommand.includes("friends")
    ) {
      setActiveTab("community")
      response = "I've opened the community page where you can connect with other patients in your facility."
      action = "navigate"
    } else if (
      lowerCommand.includes("complaint") ||
      lowerCommand.includes("feedback") ||
      lowerCommand.includes("concern")
    ) {
      setActiveTab("complaints")
      response = "I've opened the feedback page where you can share your thoughts about your care."
      action = "navigate"
    } else if (lowerCommand.includes("dashboard") || lowerCommand.includes("home") || lowerCommand.includes("main")) {
      setActiveTab("dashboard")
      response = "I've taken you back to your main dashboard where you can see an overview of everything."
      action = "navigate"
    }
    // Information requests
    else if (lowerCommand.includes("how many medication") || lowerCommand.includes("medication count")) {
      const activeMeds = medications.filter((m) => m.status === "active").length
      response = `You currently have ${activeMeds} active medications: ${medications
        .filter((m) => m.status === "active")
        .map((m) => m.name)
        .join(", ")}.`
    } else if (lowerCommand.includes("next appointment") || lowerCommand.includes("schedule")) {
      response = "Your next appointment is with Sarah Johnson, RN at 10:00 AM today for your regular nurse visit."
    } else if (lowerCommand.includes("help") || lowerCommand.includes("what can you do")) {
      response =
        "I can help you navigate your portal, answer questions about your care, and provide information. Try saying things like 'Show me my medications', 'Go to care team', 'How many medications do I have?', or 'What's my next appointment?'"
    } else {
      response =
        "I'm not sure about that. You can ask me to navigate to different sections like medications, care team, or games. You can also ask about your appointments or medication count. What would you like to know?"
    }

    // Add AI response to chat
    const aiMessage = {
      id: (Date.now() + 1).toString(),
      type: "ai" as const,
      message: response,
      timestamp: new Date(),
    }
    setChatMessages((prev) => [...prev, aiMessage])

    // Speak the response if voice is enabled
    if (voiceEnabled) {
      speak(response)
    }
  }

  const sendChatMessage = () => {
    if (currentMessage.trim()) {
      handleVoiceCommand(currentMessage)
      setCurrentMessage("")
    }
  }

  // Mock patient data
  const patientInfo = {
    name: "Margaret Anderson",
    id: "PT-12345",
    dob: "01/15/1950",
    address: "123 Oak Street, Detroit, MI 48201",
    phone: "(248) 555-0123",
    email: "margaret.anderson@email.com",
    admissionDate: "2024-01-16",
    primaryNurse: "Sarah Johnson, RN",
    physician: "Dr. Michael Chen",
    insurancePrimary: "Medicare Part A & B",
    emergencyContact: "Robert Anderson (Son) - (248) 555-0124",
  }

  const medications = [
    {
      id: 1,
      name: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      timeOfDay: "Morning",
      status: "active",
      prescribedBy: "Dr. Michael Chen",
      startDate: "2024-01-16",
      instructions: "Take with food",
      sideEffects: ["Dizziness", "Dry cough"],
      lastTaken: "2024-01-22 08:00 AM",
    },
    {
      id: 2,
      name: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      timeOfDay: "Morning & Evening",
      status: "active",
      prescribedBy: "Dr. Michael Chen",
      startDate: "2024-01-16",
      instructions: "Take with meals",
      sideEffects: ["Nausea", "Stomach upset"],
      lastTaken: "2024-01-22 08:00 AM",
    },
    {
      id: 3,
      name: "Atorvastatin",
      dosage: "20mg",
      frequency: "Once daily",
      timeOfDay: "Evening",
      status: "pending_approval",
      prescribedBy: "Dr. Michael Chen",
      startDate: "2024-01-22",
      instructions: "Take at bedtime",
      addedBy: "Patient (Scanned)",
      needsApproval: true,
    },
  ]

  const careTeam = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Primary Nurse (RN)",
      phone: "(248) 555-0101",
      email: "sarah.johnson@irishtriplets.com",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.8,
      totalReviews: 23,
      specialties: ["Diabetes Care", "Wound Care"],
      lastVisit: "2024-01-22",
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      role: "Physical Therapist",
      phone: "(248) 555-0102",
      email: "michael.rodriguez@irishtriplets.com",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.9,
      totalReviews: 31,
      specialties: ["Mobility", "Strength Training"],
      lastVisit: "2024-01-21",
    },
    {
      id: 3,
      name: "Jennifer Martinez",
      role: "Home Health Aide",
      phone: "(248) 555-0103",
      email: "jennifer.martinez@irishtriplets.com",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.7,
      totalReviews: 18,
      specialties: ["Personal Care", "Meal Preparation"],
      lastVisit: "2024-01-22",
    },
  ]

  const treatmentPlans = [
    {
      id: 1,
      title: "Diabetes Management Plan",
      type: "Medical",
      startDate: "2024-01-16",
      endDate: "2024-03-16",
      status: "active",
      progress: 65,
      goals: [
        { goal: "Blood sugar control", target: "< 140 mg/dL", current: "145 mg/dL", status: "improving" },
        { goal: "Weight management", target: "Lose 10 lbs", current: "-6 lbs", status: "on_track" },
        { goal: "Weight management", target: "Lose 10 lbs", current: "-6 lbs", status: "on_track" },
        { goal: "Medication compliance", target: "100%", current: "95%", status: "good" },
      ],
      nextReview: "2024-02-16",
      assignedNurse: "Sarah Johnson, RN",
    },
    {
      id: 2,
      title: "Physical Therapy Plan",
      type: "Therapy",
      startDate: "2024-01-18",
      endDate: "2024-02-18",
      status: "active",
      progress: 40,
      goals: [
        { goal: "Improve mobility", target: "Walk 100 feet", current: "Walk 60 feet", status: "improving" },
        { goal: "Strength building", target: "5 reps", current: "3 reps", status: "on_track" },
        { goal: "Balance improvement", target: "Stand 30 sec", current: "Stand 20 sec", status: "improving" },
      ],
      nextReview: "2024-02-01",
      assignedTherapist: "Michael Rodriguez, PT",
    },
  ]

  const cognitiveGames = [
    {
      id: 1,
      name: "Memory Match",
      description: "Match pairs of cards to improve memory",
      difficulty: "Easy",
      bestScore: 85,
      lastPlayed: "2024-01-21",
      category: "Memory",
      icon: "🧠",
    },
    {
      id: 2,
      name: "Word Puzzle",
      description: "Find words to enhance vocabulary and focus",
      difficulty: "Medium",
      bestScore: 120,
      lastPlayed: "2024-01-20",
      category: "Language",
      icon: "📝",
    },
    {
      id: 3,
      name: "Number Sequence",
      description: "Complete number patterns for logical thinking",
      difficulty: "Hard",
      bestScore: 95,
      lastPlayed: "2024-01-19",
      category: "Logic",
      icon: "🔢",
    },
  ]

  const handleMedicationScan = () => {
    alert("Camera opened for medication scanning. In real app, this would use device camera to scan medication labels.")
  }

  const submitComplaint = () => {
    alert("Complaint submitted successfully. You will receive updates on the resolution.")
    setComplaintForm({ type: "", staffMember: "", description: "", anonymous: false })
  }

  const playGame = (gameId: number) => {
    const newScore = Math.floor(Math.random() * 200) + 50
    setGameScore(newScore)
    alert(`Game completed! Your score: ${newScore}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">IrishTriplets Patient Portal</h1>
                <p className="text-sm text-gray-600">Welcome back, {patientInfo.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button variant="outline" size="sm">
                <Phone className="h-4 w-4 mr-2" />
                Call Nurse
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setChatOpen(!chatOpen)}
                className={chatOpen ? "bg-blue-100" : ""}
              >
                <Bot className="h-4 w-4 mr-2" />
                AI Assistant
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* AI Chat Assistant */}
      {chatOpen && (
        <div className="fixed bottom-4 right-4 w-96 h-96 bg-white rounded-lg shadow-xl border z-50 flex flex-col">
          <div className="flex items-center justify-between p-4 border-b bg-blue-50 rounded-t-lg">
            <div className="flex items-center space-x-2">
              <Bot className="h-5 w-5 text-blue-600" />
              <span className="font-medium">AI Assistant</span>
              {isListening && <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />}
              {isSpeaking && <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />}
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={() => setVoiceEnabled(!voiceEnabled)} className="p-1">
                {voiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setChatOpen(false)} className="p-1">
                <Minimize2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {chatMessages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    msg.type === "user" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <p className="text-sm">{msg.message}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t">
            <div className="flex items-center space-x-2">
              <div className="flex-1 flex items-center space-x-2">
                <input
                  type="text"
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendChatMessage()}
                  placeholder="Type your message or use voice..."
                  className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button size="sm" onClick={sendChatMessage} disabled={!currentMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <Button
                size="sm"
                variant={isListening ? "destructive" : "outline"}
                onClick={isListening ? stopListening : startListening}
                className="p-2"
              >
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
            </div>
            <div className="mt-2 text-xs text-gray-500 text-center">
              {isListening ? "Listening..." : isSpeaking ? "Speaking..." : "Click mic to speak or type your message"}
            </div>
          </div>
        </div>
      )}

      {/* Voice Control Floating Button */}
      {!chatOpen && (
        <div className="fixed bottom-4 right-4 z-40">
          <Button
            size="lg"
            className={`rounded-full w-16 h-16 shadow-lg ${
              isListening ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"
            }`}
            onClick={isListening ? stopListening : startListening}
          >
            {isListening ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
          </Button>
          {isSpeaking && (
            <Button
              size="sm"
              variant="outline"
              className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white"
              onClick={stopSpeaking}
            >
              <VolumeX className="h-4 w-4" />
            </Button>
          )}
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-8">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="medications">Medications</TabsTrigger>
            <TabsTrigger value="care-team">Care Team</TabsTrigger>
            <TabsTrigger value="treatment">Treatment Plans</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="games">Brain Games</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
            <TabsTrigger value="complaints">Feedback</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Welcome Card */}
            <Card className="bg-gradient-to-r from-blue-500 to-green-500 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">Welcome, {patientInfo.name}!</h2>
                    <p className="text-blue-100">Patient ID: {patientInfo.id}</p>
                    <p className="text-blue-100">Admitted: {patientInfo.admissionDate}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold">Day 7</div>
                    <div className="text-blue-100">of care</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <Pill className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-600">
                    {medications.filter((m) => m.status === "active").length}
                  </div>
                  <div className="text-sm text-gray-600">Active Medications</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Users className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-600">{careTeam.length}</div>
                  <div className="text-sm text-gray-600">Care Team Members</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Target className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-600">
                    {treatmentPlans.reduce((acc, plan) => acc + plan.progress, 0) / treatmentPlans.length}%
                  </div>
                  <div className="text-sm text-gray-600">Treatment Progress</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Award className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-yellow-600">{gameScore || 0}</div>
                  <div className="text-sm text-gray-600">Best Game Score</div>
                </CardContent>
              </Card>
            </div>

            {/* Voice Assistant Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bot className="h-5 w-5 mr-2" />
                  Voice Assistant Quick Actions
                </CardTitle>
                <CardDescription>Try these voice commands or click the buttons</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleVoiceCommand("Show me my medications")}
                    className="h-auto p-3 flex flex-col items-center space-y-1"
                  >
                    <Pill className="h-5 w-5" />
                    <span className="text-xs">"Show medications"</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleVoiceCommand("Go to care team")}
                    className="h-auto p-3 flex flex-col items-center space-y-1"
                  >
                    <Users className="h-5 w-5" />
                    <span className="text-xs">"Go to care team"</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleVoiceCommand("Open brain games")}
                    className="h-auto p-3 flex flex-col items-center space-y-1"
                  >
                    <Gamepad2 className="h-5 w-5" />
                    <span className="text-xs">"Open games"</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleVoiceCommand("What's my next appointment")}
                    className="h-auto p-3 flex flex-col items-center space-y-1"
                  >
                    <Calendar className="h-5 w-5" />
                    <span className="text-xs">"Next appointment"</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Today's Schedule */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Today's Schedule
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium">Medication Time</p>
                        <p className="text-sm text-gray-600">Lisinopril & Metformin</p>
                      </div>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">8:00 AM</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <User className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium">Nurse Visit</p>
                        <p className="text-sm text-gray-600">Sarah Johnson, RN</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">10:00 AM</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Activity className="h-5 w-5 text-purple-600" />
                      <div>
                        <p className="font-medium">Physical Therapy</p>
                        <p className="text-sm text-gray-600">Michael Rodriguez, PT</p>
                      </div>
                    </div>
                    <Badge className="bg-purple-100 text-purple-800">2:00 PM</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="text-sm font-medium">Medication taken: Lisinopril</p>
                      <p className="text-xs text-gray-500">Today at 8:00 AM</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <User className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-sm font-medium">Nurse visit completed</p>
                      <p className="text-xs text-gray-500">Yesterday at 10:30 AM</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Brain className="h-5 w-5 text-purple-500" />
                    <div>
                      <p className="text-sm font-medium">Completed Memory Match game</p>
                      <p className="text-xs text-gray-500">Yesterday at 3:15 PM</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Rest of the tabs content remains the same as in the original code */}
          <TabsContent value="medications" className="space-y-6">
            {/* Medication Scanner */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Camera className="h-5 w-5 mr-2" />
                  Add New Medication
                </CardTitle>
                <CardDescription>
                  Scan your medication bottle to add it to your profile. Your nurse will review and approve.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={handleMedicationScan} className="w-full">
                  <Camera className="h-4 w-4 mr-2" />
                  Scan Medication Label
                </Button>
              </CardContent>
            </Card>

            {/* Current Medications */}
            <Card>
              <CardHeader>
                <CardTitle>Current Medications</CardTitle>
                <CardDescription>Your current medication list with schedules and instructions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {medications.map((med) => (
                    <div
                      key={med.id}
                      className={`p-4 border rounded-lg ${
                        med.status === "pending_approval" ? "border-yellow-300 bg-yellow-50" : "border-gray-200"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <Pill className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-medium">{med.name}</h3>
                            <p className="text-sm text-gray-600">
                              {med.dosage} - {med.frequency}
                            </p>
                            <p className="text-xs text-gray-500">Prescribed by: {med.prescribedBy}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge
                            className={
                              med.status === "active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                            }
                          >
                            {med.status === "active" ? "Active" : "Pending Approval"}
                          </Badge>
                          {med.needsApproval && <p className="text-xs text-yellow-600 mt-1">Added by patient scan</p>}
                        </div>
                      </div>

                      <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <Label className="text-xs font-medium">Instructions</Label>
                          <p className="text-gray-600">{med.instructions}</p>
                        </div>
                        <div>
                          <Label className="text-xs font-medium">Time of Day</Label>
                          <p className="text-gray-600">{med.timeOfDay}</p>
                        </div>
                        <div>
                          <Label className="text-xs font-medium">Last Taken</Label>
                          <p className="text-gray-600">{med.lastTaken || "Not recorded"}</p>
                        </div>
                      </div>

                      {med.sideEffects && (
                        <div className="mt-3">
                          <Label className="text-xs font-medium">Possible Side Effects</Label>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {med.sideEffects.map((effect, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {effect}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="games" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="h-5 w-5 mr-2" />
                  Cognitive & Behavioral Health Games
                </CardTitle>
                <CardDescription>
                  Keep your mind sharp with fun, therapeutic games designed to improve cognitive function
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cognitiveGames.map((game) => (
                    <Card key={game.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="text-center mb-4">
                          <div className="text-4xl mb-2">{game.icon}</div>
                          <h3 className="font-medium">{game.name}</h3>
                          <p className="text-sm text-gray-600">{game.description}</p>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Difficulty:</span>
                            <Badge
                              className={
                                game.difficulty === "Easy"
                                  ? "bg-green-100 text-green-800"
                                  : game.difficulty === "Medium"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                              }
                            >
                              {game.difficulty}
                            </Badge>
                          </div>
                          <div className="flex justify-between">
                            <span>Best Score:</span>
                            <span className="font-medium">{game.bestScore}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Category:</span>
                            <span>{game.category}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Last Played:</span>
                            <span>{game.lastPlayed}</span>
                          </div>
                        </div>

                        <Button className="w-full mt-4" onClick={() => playGame(game.id)}>
                          <Gamepad2 className="h-4 w-4 mr-2" />
                          Play Game
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="complaints" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Patient Feedback & Complaints
                </CardTitle>
                <CardDescription>Share your feedback about your care experience or report any concerns</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="complaint-type">Type of Feedback</Label>
                    <Select
                      value={complaintForm.type}
                      onValueChange={(value) => setComplaintForm({ ...complaintForm, type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select feedback type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="compliment">Compliment/Praise</SelectItem>
                        <SelectItem value="suggestion">Suggestion for Improvement</SelectItem>
                        <SelectItem value="concern">General Concern</SelectItem>
                        <SelectItem value="care-quality">Care Quality Issue</SelectItem>
                        <SelectItem value="communication">Communication Issue</SelectItem>
                        <SelectItem value="scheduling">Scheduling Problem</SelectItem>
                        <SelectItem value="billing">Billing Question</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="staff-member">Staff Member (Optional)</Label>
                    <Select
                      value={complaintForm.staffMember}
                      onValueChange={(value) => setComplaintForm({ ...complaintForm, staffMember: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select staff member" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sarah-johnson">Sarah Johnson, RN</SelectItem>
                        <SelectItem value="michael-rodriguez">Michael Rodriguez, PT</SelectItem>
                        <SelectItem value="jennifer-martinez">Jennifer Martinez, HHA</SelectItem>
                        <SelectItem value="other">Other Staff Member</SelectItem>
                        <SelectItem value="general">General/Multiple Staff</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={complaintForm.description}
                    onChange={(e) => setComplaintForm({ ...complaintForm, description: e.target.value })}
                    placeholder="Please describe your feedback or concern in detail..."
                    rows={5}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="anonymous"
                    checked={complaintForm.anonymous}
                    onChange={(e) => setComplaintForm({ ...complaintForm, anonymous: e.target.checked })}
                    className="h-4 w-4"
                  />
                  <Label htmlFor="anonymous" className="text-sm">
                    Submit this feedback anonymously
                  </Label>
                </div>

                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="flex items-center mb-2">
                    <Shield className="h-5 w-5 text-green-600 mr-2" />
                    <h4 className="font-medium text-green-900">Your Privacy is Protected</h4>
                  </div>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• All feedback is reviewed by our Patient Care team</li>
                    <li>• Your information is kept confidential</li>
                    <li>• We will follow up within 24-48 hours</li>
                    <li>• Anonymous feedback helps us improve our services</li>
                  </ul>
                </div>

                <div className="flex justify-end space-x-3">
                  <Button variant="outline">Save Draft</Button>
                  <Button onClick={submitComplaint} disabled={!complaintForm.type || !complaintForm.description}>
                    Submit Feedback
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
