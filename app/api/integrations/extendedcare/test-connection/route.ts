import { type NextRequest, NextResponse } from "next/server"
import { testExtendedCareConnection } from "@/lib/extendedcare-api"

export async function POST(request: NextRequest) {
  try {
    const data = await testExtendedCareConnection()
    return NextResponse.json({ success: true, message: "Successfully connected to ExtendedCare API", data })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to connect to ExtendedCare",
      },
      { status: 500 },
    )
  }
}
