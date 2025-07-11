import { initializeApp, cert, getApps } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

const projectId = process.env.FIREBASE_PROJECT_ID
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')

if (!projectId || !clientEmail || !privateKey) {
  console.error('Missing Firebase credentials')
  process.exit(1)
}

if (!getApps().length) {
  initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
  })
}

const db = getFirestore()

const integrations = [
  { id: 'supabase', name: 'Supabase', description: 'Database and authentication', enabled: true },
  { id: 'sendgrid', name: 'SendGrid', description: 'Email notifications and templates', enabled: true },
  { id: 'twilio', name: 'Twilio', description: 'SMS notifications and alerts', enabled: true },
  { id: 'docusign', name: 'DocuSign', description: 'Digital signature management', enabled: true },
  { id: 'axxess', name: 'Axxess', description: 'EMR & Home Health Software', enabled: false },
  { id: 'availity', name: 'Availity', description: 'Real-time Eligibility & Claims Portal', enabled: false },
  { id: 'extendedcare', name: 'ExtendedCare', description: 'Eligibility, Prior Auth & Billing', enabled: false },
]

async function seed() {
  for (const integration of integrations) {
    await db.collection('integrations').doc(integration.id).set(integration, { merge: true })
    console.log(`Seeded ${integration.id}`)
  }
  console.log('Seeding complete')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seeding failed', err)
  process.exit(1)
})
