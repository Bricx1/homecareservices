import pool from './mysql'

export interface IntegrationRecord {
  id: string
  name: string
  description: string
  enabled: boolean
}

export async function getIntegrations(): Promise<IntegrationRecord[]> {
  const [rows] = await pool.query('SELECT * FROM integrations ORDER BY id')
  return (rows as any[]).map((row) => ({
    ...row,
    enabled: Boolean(row.enabled),
  })) as IntegrationRecord[]
}

export async function getIntegrationById(id: string): Promise<IntegrationRecord | null> {
  const [rows] = await pool.query('SELECT * FROM integrations WHERE id = ?', [id])
  const record = (rows as any[])[0]
  return record ? { ...record, enabled: Boolean(record.enabled) } : null
}

export async function updateIntegrationEnabled(id: string, enabled: boolean) {
  await pool.execute(
    'UPDATE integrations SET enabled = ? WHERE id = ?',
    [enabled ? 1 : 0, id],
  )
}
