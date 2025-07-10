import { NextResponse } from 'next/server'
import { getIntegrationById, updateIntegrationEnabled } from '@/lib/integration-db'

export async function GET(_req: Request, { params }: { params: { integrationId: string } }) {
  try {
    const integration = await getIntegrationById(params.integrationId)
    if (!integration) {
      return NextResponse.json({ error: 'Integration not found' }, { status: 404 })
    }
    return NextResponse.json({ integration })
  } catch (error) {
    console.error('Failed to fetch integration', error)
    return NextResponse.json({ error: 'Failed to fetch integration' }, { status: 500 })
  }
}

export async function POST(request: Request, { params }: { params: { integrationId: string } }) {
  try {
    const { enabled } = await request.json()
    await updateIntegrationEnabled(params.integrationId, Boolean(enabled))
    return NextResponse.json({ success: true, enabled: Boolean(enabled) })
  } catch (error) {
    console.error('Failed to update integration', error)
    return NextResponse.json({ error: 'Failed to update integration' }, { status: 500 })
  }
}
