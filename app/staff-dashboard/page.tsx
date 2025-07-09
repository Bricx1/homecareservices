"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Calendar,
  Clock,
  DollarSign,
  Star,
  Award,
  BookOpen,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
  Heart,
  Package,
  AlertTriangle,
  TrendingUp,
  BarChart3,
  PieChart,
} from "lucide-react"
import Link from "next/link"
import { StaffSupplyAnalyzer } from "@/components/staff-supply-analyzer"

export default function StaffDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const staffData = {
    name: "Sarah Johnson",
    role: "Registered Nurse",
    id: "RN-2024-001",
    avatar: "/professional-woman-diverse.png",
    rating: 4.8,
    totalShifts: 156,
    hoursWorked: 1248,
    earnings: 62400,
    certifications: [
      { name: "RN License", status: "Active", expires: "2025-06-15" },
      { name: "BLS Certification", status: "Active", expires: "2024-12-01" },
      { name: "ACLS Certification", status: "Expiring Soon", expires: "2024-08-15" },
    ],
    upcomingShifts: [
      { date: "2024-07-05", time: "7:00 AM - 7:00 PM", location: "Sunrise Senior Living", unit: "ICU" },
      { date: "2024-07-06", time: "7:00 AM - 7:00 PM", location: "Memorial Hospital", unit: "Emergency" },
      { date: "2024-07-08", time: "11:00 PM - 7:00 AM", location: "City Medical Center", unit: "Med-Surg" },
    ],
    recentPayStubs: [
      { period: "June 16-30, 2024", amount: 2850, hours: 72, status: "Paid" },
      { period: "June 1-15, 2024", amount: 2640, hours: 66, status: "Paid" },
      { period: "May 16-31, 2024", amount: 2920, hours: 73, status: "Paid" },
    ],
    trainingModules: [
      { name: "Infection Control Update", progress: 100, completed: true, dueDate: "Completed" },
      { name: "Patient Safety Protocols", progress: 75, completed: false, dueDate: "2024-07-10" },
      { name: "Emergency Response Training", progress: 0, completed: false, dueDate: "2024-07-20" },
    ],
    patientReviews: [
      {
        patient: "Anonymous",
        rating: 5,
        comment: "Sarah was incredibly caring and professional. Made my stay much more comfortable.",
        date: "2024-06-28",
      },
      {
        patient: "Anonymous",
        rating: 5,
        comment: "Excellent nurse! Very knowledgeable and compassionate.",
        date: "2024-06-25",
      },
    ],
    // Enhanced supply tracking with checkout vs usage
    supplyTransactions: [
      {
        id: "ST001",
        type: "checkout",
        patientId: "P001",
        patientName: "Margaret Anderson",
        supplyId: "SUP001",
        supplyName: "Hydrocolloid Dressing 4x4",
        category: "Dressings",
        quantityCheckedOut: 3,
        quantityUsed: 2,
        quantityReturned: 1,
        unitCost: 12.5,
        totalCheckedOutCost: 37.5,
        totalUsedCost: 25.0,
        wastedCost: 12.5,
        checkedOutAt: "2024-07-04T09:00:00Z",
        usedAt: "2024-07-04T10:00:00Z",
        returnedAt: "2024-07-04T11:00:00Z",
        woundLocation: "Right heel",
        notes: "Patient wound healing well, only needed 2 dressings",
      },
      {
        id: "ST002",
        type: "checkout",
        patientId: "P003",
        patientName: "James Patterson",
        supplyId: "SUP005",
        supplyName: "Saline Wound Cleanser 8oz",
        category: "Cleansers",
        quantityCheckedOut: 2,
        quantityUsed: 2,
        quantityReturned: 0,
        unitCost: 6.75,
        totalCheckedOutCost: 13.5,
        totalUsedCost: 13.5,
        wastedCost: 0,
        checkedOutAt: "2024-07-03T14:30:00Z",
        usedAt: "2024-07-03T15:30:00Z",
        returnedAt: null,
        woundLocation: "Surgical incision",
        notes: "Used both bottles for thorough wound cleaning",
      },
      {
        id: "ST003",
        type: "checkout",
        patientId: "P001",
        patientName: "Margaret Anderson",
        supplyId: "SUP006",
        supplyName: "Gauze Pads 4x4 Sterile (10pk)",
        category: "Gauze",
        quantityCheckedOut: 2,
        quantityUsed: 1,
        quantityReturned: 1,
        unitCost: 4.25,
        totalCheckedOutCost: 8.5,
        totalUsedCost: 4.25,
        wastedCost: 4.25,
        checkedOutAt: "2024-07-02T10:00:00Z",
        usedAt: "2024-07-02T11:00:00Z",
        returnedAt: "2024-07-02T12:00:00Z",
        woundLocation: "Right heel",
        notes: "Only needed one pack, returned unused pack",
      },
      {
        id: "ST004",
        type: "checkout",
        patientId: "P004",
        patientName: "Robert Miller",
        supplyId: "SUP002",
        supplyName: "Silver Antimicrobial Foam 6x6",
        category: "Antimicrobial",
        quantityCheckedOut: 1,
        quantityUsed: 1,
        quantityReturned: 0,
        unitCost: 28.75,
        totalCheckedOutCost: 28.75,
        totalUsedCost: 28.75,
        wastedCost: 0,
        checkedOutAt: "2024-07-01T08:30:00Z",
        usedAt: "2024-07-01T09:00:00Z",
        returnedAt: null,
        woundLocation: "Sacral area",
        notes: "Full dressing used for infected pressure ulcer",
      },
      {
        id: "ST005",
        type: "checkout",
        patientId: "P001",
        patientName: "Margaret Anderson",
        supplyId: "SUP001",
        supplyName: "Hydrocolloid Dressing 4x4",
        category: "Dressings",
        quantityCheckedOut: 4,
        quantityUsed: 2,
        quantityReturned: 2,
        unitCost: 12.5,
        totalCheckedOutCost: 50.0,
        totalUsedCost: 25.0,
        wastedCost: 25.0,
        checkedOutAt: "2024-06-30T09:00:00Z",
        usedAt: "2024-06-30T10:00:00Z",
        returnedAt: "2024-06-30T11:30:00Z",
        woundLocation: "Right heel",
        notes: "Wound smaller than expected, returned extra dressings",
      },
      {
        id: "ST006",
        type: "checkout",
        patientId: "P005",
        patientName: "Linda White",
        supplyId: "SUP009",
        supplyName: "Compression Bandage 4in",
        category: "Compression",
        quantityCheckedOut: 2,
        quantityUsed: 1,
        quantityReturned: 0,
        unitCost: 11.8,
        totalCheckedOutCost: 23.6,
        totalUsedCost: 11.8,
        wastedCost: 11.8,
        checkedOutAt: "2024-06-29T13:00:00Z",
        usedAt: "2024-06-29T14:00:00Z",
        returnedAt: null,
        woundLocation: "Lower leg",
        notes: "Second bandage damaged during application, had to discard",
      },
    ],
  }

  // Calculate supply analytics
  const supplyAnalytics = {
    totalCheckedOut: staffData.supplyTransactions.reduce((sum, t) => sum + t.totalCheckedOutCost, 0),
    totalUsed: staffData.supplyTransactions.reduce((sum, t) => sum + t.totalUsedCost, 0),
    totalWasted: staffData.supplyTransactions.reduce((sum, t) => sum + t.wastedCost, 0),
    totalItemsCheckedOut: staffData.supplyTransactions.reduce((sum, t) => sum + t.quantityCheckedOut, 0),
    totalItemsUsed: staffData.supplyTransactions.reduce((sum, t) => sum + t.quantityUsed, 0),
    totalItemsReturned: staffData.supplyTransactions.reduce((sum, t) => sum + t.quantityReturned, 0),
    wastePercentage: 0,
    efficiencyScore: 0,
  }

  supplyAnalytics.wastePercentage =
    supplyAnalytics.totalCheckedOut > 0 ? (supplyAnalytics.totalWasted / supplyAnalytics.totalCheckedOut) * 100 : 0

  supplyAnalytics.efficiencyScore =
    supplyAnalytics.totalItemsCheckedOut > 0
      ? (supplyAnalytics.totalItemsUsed / supplyAnalytics.totalItemsCheckedOut) * 100
      : 0

  // Group by patient for patient-specific analytics
  const patientSupplyBreakdown = staffData.supplyTransactions.reduce(
    (acc, transaction) => {
      if (!acc[transaction.patientName]) {
        acc[transaction.patientName] = {
          totalCheckedOut: 0,
          totalUsed: 0,
          totalWasted: 0,
          itemsCheckedOut: 0,
          itemsUsed: 0,
          transactions: 0,
        }
      }
      acc[transaction.patientName].totalCheckedOut += transaction.totalCheckedOutCost
      acc[transaction.patientName].totalUsed += transaction.totalUsedCost
      acc[transaction.patientName].totalWasted += transaction.wastedCost
      acc[transaction.patientName].itemsCheckedOut += transaction.quantityCheckedOut
      acc[transaction.patientName].itemsUsed += transaction.quantityUsed
      acc[transaction.patientName].transactions += 1
      return acc
    },
    {} as Record<string, any>,
  )

  // Group by category for category analytics
  const categoryBreakdown = staffData.supplyTransactions.reduce(
    (acc, transaction) => {
      if (!acc[transaction.category]) {
        acc[transaction.category] = {
          totalCheckedOut: 0,
          totalUsed: 0,
          totalWasted: 0,
          itemsCheckedOut: 0,
          itemsUsed: 0,
        }
      }
      acc[transaction.category].totalCheckedOut += transaction.totalCheckedOutCost
      acc[transaction.category].totalUsed += transaction.totalUsedCost
      acc[transaction.category].totalWasted += transaction.wastedCost
      acc[transaction.category].itemsCheckedOut += transaction.quantityCheckedOut
      acc[transaction.category].itemsUsed += transaction.quantityUsed
      return acc
    },
    {} as Record<string, any>,
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                  <Heart className="h-4 w-4 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">IrishTriplets</h1>
              </div>
              <div className="hidden md:block">
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  Staff Portal
                </Badge>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
              <Link href="/login">
                <Button variant="ghost" size="icon">
                  <LogOut className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={staffData.avatar || "/placeholder.svg"} alt={staffData.name} />
              <AvatarFallback>SJ</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Welcome back, {staffData.name}!</h2>
              <p className="text-gray-600">
                {staffData.role} • ID: {staffData.id}
              </p>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(staffData.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-1 text-sm text-gray-600">{staffData.rating}</span>
                </div>
                <span className="text-gray-400">•</span>
                <span className="text-sm text-gray-600">{staffData.totalShifts} shifts completed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Hours This Month</p>
                  <p className="text-2xl font-bold text-gray-900">142</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Earnings YTD</p>
                  <p className="text-2xl font-bold text-gray-900">${staffData.earnings.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Star className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Patient Rating</p>
                  <p className="text-2xl font-bold text-gray-900">{staffData.rating}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Award className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Supply Efficiency</p>
                  <p className="text-2xl font-bold text-gray-900">{supplyAnalytics.efficiencyScore.toFixed(0)}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="supplies">Supplies</TabsTrigger>
            <TabsTrigger value="training">Training</TabsTrigger>
            <TabsTrigger value="payroll">Payroll</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Upcoming Shifts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Upcoming Shifts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {staffData.upcomingShifts.map((shift, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{shift.date}</p>
                        <p className="text-sm text-gray-600">{shift.time}</p>
                        <p className="text-sm text-gray-600">
                          {shift.location} - {shift.unit}
                        </p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </div>
                  ))}
                  <Button className="w-full bg-transparent" variant="outline">
                    View Full Schedule
                  </Button>
                </CardContent>
              </Card>

              {/* Supply Efficiency Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Package className="h-5 w-5 mr-2" />
                    Supply Usage Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">{supplyAnalytics.totalItemsCheckedOut}</p>
                      <p className="text-sm text-blue-700">Items Checked Out</p>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">{supplyAnalytics.totalItemsUsed}</p>
                      <p className="text-sm text-green-700">Items Used</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Efficiency Rate</span>
                      <span className="font-medium">{supplyAnalytics.efficiencyScore.toFixed(1)}%</span>
                    </div>
                    <Progress value={supplyAnalytics.efficiencyScore} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Waste Rate</span>
                      <span
                        className={`font-medium ${supplyAnalytics.wastePercentage > 15 ? "text-red-600" : "text-green-600"}`}
                      >
                        {supplyAnalytics.wastePercentage.toFixed(1)}%
                      </span>
                    </div>
                    <Progress value={supplyAnalytics.wastePercentage} className="h-2" />
                  </div>
                  <Button className="w-full bg-transparent" variant="outline">
                    View Detailed Analytics
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Schedule</CardTitle>
                <CardDescription>View and manage your upcoming shifts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {staffData.upcomingShifts.map((shift, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="text-center w-12">
                          <p className="font-bold text-lg">{new Date(shift.date).getDate()}</p>
                          <p className="text-sm text-gray-600">
                            {new Date(shift.date).toLocaleDateString("en-US", { month: "short" })}
                          </p>
                        </div>
                        <div>
                          <p className="font-medium">{shift.location}</p>
                          <p className="text-sm text-gray-600">
                            {shift.unit} • {shift.time}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          Details
                        </Button>
                        <Button size="sm" variant="outline">
                          Request Change
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="supplies" className="space-y-6">
            {/* Supply Analytics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Checked Out</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${supplyAnalytics.totalCheckedOut.toFixed(2)}</div>
                  <p className="text-xs text-muted-foreground">{supplyAnalytics.totalItemsCheckedOut} items total</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Actually Used</CardTitle>
                  <DollarSign className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">${supplyAnalytics.totalUsed.toFixed(2)}</div>
                  <p className="text-xs text-muted-foreground">{supplyAnalytics.totalItemsUsed} items used</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Wasted/Unused</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">${supplyAnalytics.totalWasted.toFixed(2)}</div>
                  <p className="text-xs text-muted-foreground">{supplyAnalytics.totalItemsReturned} items returned</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Efficiency Score</CardTitle>
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{supplyAnalytics.efficiencyScore.toFixed(1)}%</div>
                  <p className="text-xs text-muted-foreground">
                    {supplyAnalytics.wastePercentage.toFixed(1)}% waste rate
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Supply Transactions */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Supply Transactions</CardTitle>
                <CardDescription>Detailed log of supplies checked out vs. actually used</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Supply</TableHead>
                      <TableHead>Patient</TableHead>
                      <TableHead className="text-center">Checked Out</TableHead>
                      <TableHead className="text-center">Used</TableHead>
                      <TableHead className="text-center">Returned</TableHead>
                      <TableHead className="text-right">Cost Impact</TableHead>
                      <TableHead className="text-center">Efficiency</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {staffData.supplyTransactions.slice(0, 10).map((transaction) => {
                      const efficiency = (transaction.quantityUsed / transaction.quantityCheckedOut) * 100
                      return (
                        <TableRow key={transaction.id}>
                          <TableCell>{new Date(transaction.checkedOutAt).toLocaleDateString()}</TableCell>
                          <TableCell className="font-medium">{transaction.supplyName}</TableCell>
                          <TableCell>{transaction.patientName}</TableCell>
                          <TableCell className="text-center">{transaction.quantityCheckedOut}</TableCell>
                          <TableCell className="text-center text-green-600 font-medium">
                            {transaction.quantityUsed}
                          </TableCell>
                          <TableCell className="text-center text-blue-600">{transaction.quantityReturned}</TableCell>
                          <TableCell className="text-right">
                            <div className="text-sm">
                              <div className="text-green-600">${transaction.totalUsedCost.toFixed(2)}</div>
                              {transaction.wastedCost > 0 && (
                                <div className="text-red-600">-${transaction.wastedCost.toFixed(2)}</div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge
                              variant={efficiency >= 90 ? "default" : efficiency >= 70 ? "secondary" : "destructive"}
                              className={
                                efficiency >= 90
                                  ? "bg-green-100 text-green-800"
                                  : efficiency >= 70
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                              }
                            >
                              {efficiency.toFixed(0)}%
                            </Badge>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Patient-Specific Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Cost by Patient
                  </CardTitle>
                  <CardDescription>Supply costs breakdown per patient</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(patientSupplyBreakdown).map(([patientName, data]) => (
                      <div key={patientName} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{patientName}</span>
                          <div className="text-right text-sm">
                            <div className="text-green-600 font-medium">${data.totalUsed.toFixed(2)} used</div>
                            {data.totalWasted > 0 && (
                              <div className="text-red-600">${data.totalWasted.toFixed(2)} wasted</div>
                            )}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${(data.totalUsed / data.totalCheckedOut) * 100}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-500 w-12">
                            {((data.totalUsed / data.totalCheckedOut) * 100).toFixed(0)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChart className="h-5 w-5 mr-2" />
                    Cost by Category
                  </CardTitle>
                  <CardDescription>Supply costs breakdown by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(categoryBreakdown).map(([category, data]) => (
                      <div key={category} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{category}</span>
                          <div className="text-right text-sm">
                            <div className="text-green-600 font-medium">${data.totalUsed.toFixed(2)}</div>
                            {data.totalWasted > 0 && (
                              <div className="text-red-600">${data.totalWasted.toFixed(2)} wasted</div>
                            )}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: `${(data.totalUsed / data.totalCheckedOut) * 100}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-500 w-12">
                            {((data.totalUsed / data.totalCheckedOut) * 100).toFixed(0)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Supply Efficiency Insights */}
            <Card>
              <CardHeader>
                <CardTitle>Supply Efficiency Insights</CardTitle>
                <CardDescription>Recommendations to improve your supply usage efficiency</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="font-medium text-green-800">Good Performance</span>
                    </div>
                    <p className="text-sm text-green-700">
                      Your overall efficiency rate of {supplyAnalytics.efficiencyScore.toFixed(1)}% is above average.
                      Keep up the good work!
                    </p>
                  </div>

                  {supplyAnalytics.wastePercentage > 15 && (
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-600" />
                        <span className="font-medium text-yellow-800">Improvement Opportunity</span>
                      </div>
                      <p className="text-sm text-yellow-700">
                        Your waste rate of {supplyAnalytics.wastePercentage.toFixed(1)}% could be reduced. Consider
                        checking out fewer items initially.
                      </p>
                    </div>
                  )}

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-blue-600" />
                      <span className="font-medium text-blue-800">Cost Savings</span>
                    </div>
                    <p className="text-sm text-blue-700">
                      You've saved ${supplyAnalytics.totalWasted.toFixed(2)} in potential waste through efficient supply
                      management.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Supply Analyzer */}
            <StaffSupplyAnalyzer
              staffId={staffData.id}
              staffName={staffData.name}
              supplyUsage={staffData.supplyTransactions.map((t) => ({
                id: t.id,
                patientId: t.patientId,
                patientName: t.patientName,
                supplyId: t.supplyId,
                supplyName: t.supplyName,
                category: t.category,
                quantity: t.quantityUsed, // Use actual used quantity
                unitCost: t.unitCost,
                totalCost: t.totalUsedCost, // Use actual used cost
                usedAt: t.usedAt || t.checkedOutAt,
              }))}
            />
          </TabsContent>

          <TabsContent value="training" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Training Modules
                </CardTitle>
                <CardDescription>Complete required training and continuing education</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {staffData.trainingModules.map((module, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{module.name}</h3>
                      <Badge variant={module.completed ? "default" : "secondary"}>
                        {module.completed ? "Completed" : `Due: ${module.dueDate}`}
                      </Badge>
                    </div>
                    <Progress value={module.progress} className="mb-2" />
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{module.progress}% Complete</span>
                      {!module.completed && <Button size="sm">Continue Training</Button>}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payroll" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-2" />
                  Payroll Information
                </CardTitle>
                <CardDescription>View your pay stubs and earnings history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {staffData.recentPayStubs.map((stub, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{stub.period}</p>
                        <p className="text-sm text-gray-600">{stub.hours} hours worked</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">${stub.amount.toLocaleString()}</p>
                        <Badge variant="default" className="bg-green-100 text-green-800">
                          {stub.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                  <Button className="w-full bg-transparent" variant="outline">
                    View All Pay Stubs
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="h-5 w-5 mr-2" />
                  Patient Reviews
                </CardTitle>
                <CardDescription>See what patients are saying about your care</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {staffData.patientReviews.map((review, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                        <span className="ml-2 font-medium">{review.patient}</span>
                      </div>
                      <span className="text-sm text-gray-600">{review.date}</span>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
