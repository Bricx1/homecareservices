import { NextResponse } from 'next/server'
import { getIntegrations } from '@/lib/integration-db'

export async function GET() {
  try {
    const integrations = await getIntegrations()
    return NextResponse.json({ integrations })
  } catch (error) {
    console.error('Failed to fetch integrations', error)
    return NextResponse.json({ error: 'Failed to fetch integrations' }, { status: 500 })
  }
}
