import { type NextRequest, NextResponse } from "next/server"
import { testAxxessConnection } from "@/lib/axxess-api"

export async function POST(request: NextRequest) {
  try {
    await testAxxessConnection()
    return NextResponse.json({ success: true, message: "Connection successful" })
  } catch (error) {
    console.error("Axxess connection test error:", error)
    return NextResponse.json({ error: "Failed to connect to Axxess" }, { status: 500 })
  }
}
