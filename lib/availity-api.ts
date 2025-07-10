export async function availityRequest(path: string, options: RequestInit = {}) {
  const baseUrl = process.env.AVAILITY_BASE_URL
  const apiKey = process.env.AVAILITY_API_KEY
  if (!baseUrl || !apiKey) throw new Error('Availity API not configured')

  const res = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  })

  if (!res.ok) {
    throw new Error(`Availity API request failed with status ${res.status}`)
  }

  return res.json()
}

export async function testAvailityConnection() {
  return availityRequest('/ping')
}
