import { NextResponse } from "next/server"
import { getProcessedFaxById } from "@/lib/fax-db"

export async function GET(
  _req: Request,
  { params }: { params: { faxId: string } }
) {
  try {
    const fax = await getProcessedFaxById(params.faxId)
    if (!fax) {
      return NextResponse.json({ error: "Fax not found" }, { status: 404 })
    }
    return NextResponse.json({ fax })
  } catch (error) {
    console.error("Failed to fetch fax", error)
    return NextResponse.json({ error: "Failed to fetch fax" }, { status: 500 })
  }
}
