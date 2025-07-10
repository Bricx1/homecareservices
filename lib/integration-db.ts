import pool from './mysql'

export interface IntegrationRecord {
  id: string
  name: string
  description: string
  enabled: number | boolean
}

export async function getIntegrations(): Promise<IntegrationRecord[]> {
  const [rows] = await pool.query('SELECT * FROM integrations ORDER BY id')
  return rows as IntegrationRecord[]
}

export async function getIntegrationById(id: string): Promise<IntegrationRecord | null> {
  const [rows] = await pool.query('SELECT * FROM integrations WHERE id = ?', [id])
  const records = rows as IntegrationRecord[]
  return records[0] || null
}

export async function updateIntegrationEnabled(id: string, enabled: boolean) {
  await pool.execute(
    'UPDATE integrations SET enabled = ? WHERE id = ?',
    [enabled ? 1 : 0, id],
  )
}
