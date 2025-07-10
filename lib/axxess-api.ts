export async function axxessRequest(path: string, options: RequestInit = {}) {
  const baseUrl = process.env.AXXESS_BASE_URL
  const apiKey = process.env.AXXESS_API_KEY
  if (!baseUrl || !apiKey) throw new Error('Axxess API not configured')

  const res = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  })

  if (!res.ok) {
    throw new Error(`Axxess API request failed with status ${res.status}`)
  }

  return res.json()
}

export async function testAxxessConnection() {
  return axxessRequest('/ping')
}
