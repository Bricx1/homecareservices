import { type NextRequest, NextResponse } from "next/server"

interface ReferralData {
  patientName: string
  diagnosis: string
  insuranceProvider: string
  insuranceId: string
  referralSource: string
  serviceRequested: string[]
  urgency: "routine" | "urgent" | "stat"
  estimatedEpisodeLength: number
  geographicLocation: {
    address: string
    zipCode: string
    distance: number
  }
}

interface AutomationDecision {
  action: "accept" | "reject" | "review" | "request_more_info"
  reason: string
  confidence: number
  recommendedNextSteps: string[]
  mswNotificationRequired: boolean
  priorAuthRequired: boolean
  eligibilityStatus: "verified" | "pending" | "failed" | "not_checked"
}

export async function POST(request: NextRequest) {
  try {
    const referralData: ReferralData = await request.json()

    console.log("Processing referral automation for:", referralData.patientName)

    // Simulate AI-powered decision making
    const decision = await processReferralWithAI(referralData)

    // If accepted, trigger eligibility check
    if (decision.action === "accept") {
      const eligibilityResult = await checkEligibilityWithChangeHealthcare(referralData)
      decision.eligibilityStatus = eligibilityResult.status

      if (eligibilityResult.priorAuthRequired) {
        decision.priorAuthRequired = true
        decision.recommendedNextSteps.push("Submit prior authorization request")
      }
    }

    // Notify MSW if required
    if (decision.mswNotificationRequired) {
      await notifyMSW(referralData, decision)
    }

    // Sync with Axxess
    await syncWithAxxess(referralData, decision)

    return NextResponse.json({
      success: true,
      referralId: `REF-${Date.now()}`,
      decision,
      automationTimestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Referral automation error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to process referral automation",
      },
      { status: 500 },
    )
  }
}

async function processReferralWithAI(referralData: ReferralData): Promise<AutomationDecision> {
  // Simulate AI decision making based on configured metrics
  await new Promise((resolve) => setTimeout(resolve, 1500))

  const decision: AutomationDecision = {
    action: "accept",
    reason: "Meets all acceptance criteria",
    confidence: 0.95,
    recommendedNextSteps: [],
    mswNotificationRequired: false,
    priorAuthRequired: false,
    eligibilityStatus: "not_checked",
  }

  // Check insurance type acceptance
  const insuranceType = getInsuranceType(referralData.insuranceProvider)
  if (!isInsuranceAccepted(insuranceType)) {
    decision.action = "reject"
    decision.reason = `${insuranceType} insurance not accepted per current criteria`
    decision.mswNotificationRequired = true
    return decision
  }

  // Check geographic distance
  if (referralData.geographicLocation.distance > 25) {
    decision.action = "reject"
    decision.reason = "Patient location exceeds maximum travel distance (25 miles)"
    decision.mswNotificationRequired = true
    return decision
  }

  // Check for excluded diagnoses
  const excludedDiagnoses = ["hospice", "palliative", "experimental"]
  const hasExcludedDiagnosis = excludedDiagnoses.some((excluded) =>
    referralData.diagnosis.toLowerCase().includes(excluded),
  )

  if (hasExcludedDiagnosis) {
    decision.action = "reject"
    decision.reason = "Diagnosis contains excluded condition"
    decision.mswNotificationRequired = true
    return decision
  }

  // Check service requirements
  const requiredServices = ["skilled_nursing"]
  const hasRequiredServices = requiredServices.some((required) =>
    referralData.serviceRequested.some((service) => service.includes(required)),
  )

  if (!hasRequiredServices) {
    decision.action = "review"
    decision.reason = "Does not include required skilled nursing services"
    decision.mswNotificationRequired = true
    decision.confidence = 0.7
    return decision
  }

  // Check urgency and capacity
  if (referralData.urgency === "stat") {
    decision.recommendedNextSteps.push("Schedule immediate assessment")
    decision.recommendedNextSteps.push("Notify on-call supervisor")
  }

  // Determine if prior auth is likely needed
  if (insuranceType === "managed_care" || referralData.estimatedEpisodeLength > 60) {
    decision.priorAuthRequired = true
    decision.recommendedNextSteps.push("Verify prior authorization requirements")
  }

  decision.recommendedNextSteps.push("Schedule SOC within 48 hours")
  decision.recommendedNextSteps.push("Assign primary nurse")

  return decision
}

async function checkEligibilityWithChangeHealthcare(referralData: ReferralData) {
  // Simulate eligibility check via Change Healthcare API
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const mockEligibilityResult = {
    status: "verified" as const,
    isEligible: true,
    benefits: {
      homeHealthCovered: true,
      copay: 20,
      deductible: 500,
      deductibleMet: 200,
      outOfPocketMax: 3000,
      outOfPocketMet: 800,
    },
    priorAuthRequired: referralData.serviceRequested.includes("physical_therapy"),
    coveragePeriod: {
      start: "2024-01-01",
      end: "2024-12-31",
    },
  }

  return mockEligibilityResult
}

async function notifyMSW(referralData: ReferralData, decision: AutomationDecision) {
  // Simulate MSW notification
  console.log("Sending MSW notification:", {
    patient: referralData.patientName,
    action: decision.action,
    reason: decision.reason,
    urgency: referralData.urgency,
  })

  // In a real implementation, this would:
  // 1. Send email notification to MSW
  // 2. Create task in MSW dashboard
  // 3. Send SMS if urgent
  // 4. Log notification in audit trail

  await new Promise((resolve) => setTimeout(resolve, 500))
}

async function syncWithAxxess(referralData: ReferralData, decision: AutomationDecision) {
  // Simulate Axxess sync
  console.log("Syncing with Axxess:", {
    patient: referralData.patientName,
    status: decision.action,
    eligibility: decision.eligibilityStatus,
  })

  // In a real implementation, this would:
  // 1. Create or update patient record in Axxess
  // 2. Set referral status
  // 3. Add notes about automation decision
  // 4. Schedule required assessments
  // 5. Update care plan if accepted

  await new Promise((resolve) => setTimeout(resolve, 800))
}

function getInsuranceType(provider: string): string {
  const lowerProvider = provider.toLowerCase()
  if (lowerProvider.includes("medicare")) return "medicare"
  if (lowerProvider.includes("medicaid")) return "medicaid"
  if (lowerProvider.includes("aetna") || lowerProvider.includes("cigna") || lowerProvider.includes("anthem")) {
    return "commercial"
  }
  if (lowerProvider.includes("hmo") || lowerProvider.includes("managed")) return "managed_care"
  return "commercial"
}

function isInsuranceAccepted(insuranceType: string): boolean {
  // This would be configurable based on the settings from ExtendedCare setup
  const acceptedTypes = ["medicare", "medicaid", "commercial", "managed_care"]
  return acceptedTypes.includes(insuranceType)
}
