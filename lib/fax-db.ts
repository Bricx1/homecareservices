import db from './firebase'

export interface FaxRecord {
  faxId: string
  fromNumber: string
  toNumber: string
  status: string
  pages: number
  receivedAt: string
  ocrText: string
  classification: string
  action: string
}

export async function saveProcessedFax(record: FaxRecord) {
  await db.collection('processed_faxes').doc(record.faxId).set(record)
}

export async function getProcessedFaxes(): Promise<FaxRecord[]> {
  const snapshot = await db
    .collection('processed_faxes')
    .orderBy('receivedAt', 'desc')
    .get()
  return snapshot.docs.map((doc) => doc.data() as FaxRecord)
}

export async function getProcessedFaxById(faxId: string): Promise<FaxRecord | null> {
  const doc = await db.collection('processed_faxes').doc(faxId).get()
  return doc.exists ? (doc.data() as FaxRecord) : null
}
