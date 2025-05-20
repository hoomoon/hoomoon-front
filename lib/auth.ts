// lib/auth.ts

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333'

export interface RegisterPayload {
  name: string
  email: string
  phone: string
  country: string
  cpf?: string
  password: string
  sponsor_code?: string
}

async function api(path: string, opts: RequestInit = {}) {
  // Garante leading slash e trailing slash
  let url = path.startsWith('/') ? path : `/${path}`
  if (!url.endsWith('/')) url = url + '/'

  const fullUrl = `${BASE_URL}${url}`
  console.debug('[api] ', opts.method || 'GET', fullUrl)

  const res = await fetch(fullUrl, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    ...opts,
  })

  if (!res.ok) {
    let errJson = null
    try {
      errJson = await res.json()
    } catch {}
    console.error('[api error]', res.status, errJson)
    throw new Error(errJson?.detail || JSON.stringify(errJson) || res.statusText)
  }
  return res.json().catch(() => ({}))
}

export function register(data: RegisterPayload) {
  return api('/api/register', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export function login(email: string, password: string) {
  return api('/api/token', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
}

export function logout() {
  return api('/api/logout', { method: 'POST' })
}

export type User = {
  id: number
  name: string
  email: string
  phone: string
  country: string
  referral_code: string
}

export function whoami(): Promise<User> {
  return api('/api/me')
}
