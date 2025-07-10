import pool from './mysql'

export async function saveIntegrationConfig(integrationId: string, config: any) {
  await pool.execute(
    'REPLACE INTO integration_configs (integration_id, config) VALUES (?, ?)',
    [integrationId, JSON.stringify(config)],
  )
}

export async function getIntegrationConfig(integrationId: string): Promise<any | null> {
  const [rows] = await pool.query(
    'SELECT config FROM integration_configs WHERE integration_id = ?',
    [integrationId],
  )
  const record = (rows as any[])[0]
  return record ? JSON.parse(record.config as string) : null
}
