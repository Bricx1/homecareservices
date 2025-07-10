import pool from './mysql'

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
  const sql = `INSERT INTO processed_faxes
    (fax_id, from_number, to_number, status, pages, received_at, ocr_text, classification, action)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`

  await pool.execute(sql, [
    record.faxId,
    record.fromNumber,
    record.toNumber,
    record.status,
    record.pages,
    record.receivedAt,
    record.ocrText,
    record.classification,
    record.action,
  ])
}

export async function getProcessedFaxes(): Promise<FaxRecord[]> {
  const [rows] = await pool.query('SELECT * FROM processed_faxes ORDER BY received_at DESC')
  return rows as FaxRecord[]
}

export async function getProcessedFaxById(faxId: string): Promise<FaxRecord | null> {
  const [rows] = await pool.query('SELECT * FROM processed_faxes WHERE fax_id = ?', [faxId])
  const records = rows as FaxRecord[]
  return records[0] || null
}
