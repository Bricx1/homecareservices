import { NextResponse } from 'next/server'
import { saveIntegrationConfig, getIntegrationConfig } from '@/lib/integration-config-db'

export async function GET(_req: Request, { params }: { params: { integrationId: string } }) {
  try {
    const config = await getIntegrationConfig(params.integrationId)
    if (!config) {
      return NextResponse.json({ error: 'Config not found' }, { status: 404 })
    }
    return NextResponse.json({ config })
  } catch (error) {
    console.error('Failed to fetch config', error)
    return NextResponse.json({ error: 'Failed to fetch config' }, { status: 500 })
  }
}

export async function POST(request: Request, { params }: { params: { integrationId: string } }) {
  try {
    const { config } = await request.json()
    await saveIntegrationConfig(params.integrationId, config)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to save config', error)
    return NextResponse.json({ error: 'Failed to save config' }, { status: 500 })
  }
}
