import { type NextRequest, NextResponse } from "next/server"
import { testAvailityConnection } from "@/lib/availity-api"

export async function POST(request: NextRequest) {
  try {
    const data = await testAvailityConnection()
    return NextResponse.json({ success: true, message: "Successfully connected to Availity API", data })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to connect to Availity",
      },
      { status: 500 },
    )
  }
}
