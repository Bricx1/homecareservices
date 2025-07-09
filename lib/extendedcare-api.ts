export interface EligibilityResponse {
  success: boolean
  patientId: string
  isEligible: boolean
  planDetails?: {
    planName: string
    groupNumber: string
    copay: {
      inNetwork: number
      outOfNetwork: number
    }
    deductible: {
      inNetwork: number
      outOfNetwork: number
      remaining: number
    }
    outOfPocketMax: {
      inNetwork: number
      outOfNetwork: number
      remaining: number
    }
  }
  message?: string
}

export interface PriorAuthResponse {
  success: boolean
  patientId: string
  priorAuthId?: string
  status: "Approved" | "Denied" | "Pending" | "More Info Required"
  message?: string
}

export interface Referral {
  id: string
  patientName: string
  referralDate: string
  referralSource: string // e.g., "Mercy Hospital", "Fax Upload"
  diagnosis: string
  insuranceProvider: string
  insuranceId: string
  status: "New" | "Processing" | "Pending Auth" | "Approved" | "Denied"
  aiRecommendation?: "Approve" | "Deny" | "Review"
  aiReason?: string
  socDueDate?: string
}

// Mock ExtendedCare API client
class ExtendedCareAPI {
  async checkEligibility(patientId: string, insuranceId: string): Promise<EligibilityResponse> {
    console.log(`Checking eligibility for patient ${patientId} with insurance ${insuranceId}`)
    await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate network delay

    if (insuranceId.includes("INVALID")) {
      return {
        success: false,
        patientId,
        isEligible: false,
        message: "Invalid Insurance ID provided.",
      }
    }

    return {
      success: true,
      patientId,
      isEligible: true,
      planDetails: {
        planName: "Medicare Part A",
        groupNumber: "GRP-12345",
        copay: { inNetwork: 20, outOfNetwork: 50 },
        deductible: { inNetwork: 1000, outOfNetwork: 3000, remaining: 250 },
        outOfPocketMax: { inNetwork: 5000, outOfNetwork: 10000, remaining: 2500 },
      },
      message: "Patient is eligible for home health services.",
    }
  }

  async submitPriorAuth(patientId: string, serviceCodes: string[]): Promise<PriorAuthResponse> {
    console.log(`Submitting prior auth for patient ${patientId} with codes: ${serviceCodes.join(", ")}`)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    return {
      success: true,
      patientId,
      priorAuthId: `PA-${Date.now()}`,
      status: "Pending",
      message: "Prior authorization request submitted successfully. Awaiting review.",
    }
  }

  async processReferral(referral: Omit<Referral, "id" | "status">): Promise<Referral> {
    console.log(`Processing referral for ${referral.patientName}`)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newReferral: Referral = {
      ...referral,
      id: `REF-${Date.now()}`,
      status: "New",
    }

    // AI-powered recommendation logic
    if (referral.diagnosis.toLowerCase().includes("palliative")) {
      newReferral.aiRecommendation = "Deny"
      newReferral.aiReason = "Palliative care not covered under standard home health benefits."
    } else if (referral.insuranceProvider.toLowerCase().includes("medicare")) {
      newReferral.aiRecommendation = "Approve"
      newReferral.aiReason = "High likelihood of approval based on diagnosis and Medicare coverage."
    } else {
      newReferral.aiRecommendation = "Review"
      newReferral.aiReason = "Manual review required for non-standard insurance provider."
    }

    return newReferral
  }
}

export const extendedCareApi = new ExtendedCareAPI()
