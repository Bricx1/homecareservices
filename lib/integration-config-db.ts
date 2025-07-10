import db from './firebase'

export async function saveIntegrationConfig(integrationId: string, config: any) {
  await db.collection('integration_configs').doc(integrationId).set({ config }, { merge: true })
}

export async function getIntegrationConfig(integrationId: string): Promise<any | null> {
  const doc = await db.collection('integration_configs').doc(integrationId).get()
  return doc.exists ? doc.data()?.config : null
}
