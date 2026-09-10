const BASE = `${import.meta.env.VITE_API_URL || ''}/api`

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data.error || 'Something went wrong. Please try again.')
  }
  return data
}

export const api = {
  getDonors: (params = {}) => {
    const qs = new URLSearchParams(params).toString()
    return request(`/donors${qs ? `?${qs}` : ''}`)
  },
  registerDonor: (payload) =>
    request('/donors', { method: 'POST', body: JSON.stringify(payload) }),
  getHelplines: () => request('/helplines'),
  getRequests: (params = {}) => {
    const qs = new URLSearchParams(params).toString()
    return request(`/requests${qs ? `?${qs}` : ''}`)
  },
  createRequest: (payload) =>
    request('/requests', { method: 'POST', body: JSON.stringify(payload) })
}
