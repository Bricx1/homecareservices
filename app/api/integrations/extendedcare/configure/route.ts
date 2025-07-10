import { type NextRequest, NextResponse } from "next/server"
import { saveIntegrationConfig } from "@/lib/integration-config-db"

export async function POST(request: NextRequest) {
  try {
    const { credentials, syncSettings } = await request.json()

    // In a real application, you would:
    // 1. Encrypt and store credentials securely
    // 2. Save sync settings to database
    // 3. Initialize the integration service

    console.log("Saving ExtendedCare configuration:", {
      username: credentials.username,
      environment: credentials.environment,
      syncSettings,
    })

    await saveIntegrationConfig("extendedcare", {
      credentials,
      syncSettings,
    })

    return NextResponse.json({
      success: true,
      message: "ExtendedCare integration configured successfully",
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to save configuration",
      },
      { status: 500 },
    )
  }
}
