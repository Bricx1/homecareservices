import { NextResponse } from "next/server"
import { getProcessedFaxes } from "@/lib/fax-db"

export async function GET() {
  try {
    const faxes = await getProcessedFaxes()
    return NextResponse.json({ faxes })
  } catch (error) {
    console.error("Failed to fetch faxes", error)
    return NextResponse.json({ error: "Failed to fetch faxes" }, { status: 500 })
  }
}
