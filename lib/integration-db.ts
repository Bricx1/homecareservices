import db from './firebase'

export interface IntegrationRecord {
  id: string
  name: string
  description: string
  enabled: boolean
}

export async function getIntegrations(): Promise<IntegrationRecord[]> {
  const snapshot = await db.collection('integrations').get()
  return snapshot.docs.map((doc) => doc.data() as IntegrationRecord)
}

export async function getIntegrationById(id: string): Promise<IntegrationRecord | null> {
  const doc = await db.collection('integrations').doc(id).get()
  return doc.exists ? (doc.data() as IntegrationRecord) : null
}

export async function updateIntegrationEnabled(id: string, enabled: boolean) {
  await db.collection('integrations').doc(id).update({ enabled })
}
