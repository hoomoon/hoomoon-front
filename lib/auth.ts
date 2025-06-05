// lib/auth.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333'

export interface RegisterPayload {
  username: string
  name: string
  email?: string
  phone: string
  country: string
  cpf?: string
  password: string
  sponsor_code?: string
}

let apiClient: AxiosInstance

function getApiClient(): AxiosInstance {
  if (!apiClient) {
    apiClient = axios.create({
      baseURL: BASE_URL,
      withCredentials: true, // envia cookies/credenciais por padrão
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
  return apiClient
}

async function api<T = any>(path: string, opts: AxiosRequestConfig = {}): Promise<T> {
  // Garante leading slash e trailing slash
  let url = path.startsWith('/') ? path : `/${path}`
  if (!url.endsWith('/')) url = url + '/'

  console.debug('[api]', opts.method || 'GET', `${BASE_URL}${url}`)

  try {
    const client = getApiClient()
    const response = await client.request<T>({
      url,
      ...opts,
    })
    return response.data
  } catch (error) {
    let message = 'Erro desconhecido'
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError
      const status = axiosError.response?.status
      const data = axiosError.response?.data as any

      console.error(
        '[api error]',
        status,
        data ?? axiosError.message
      )

      if (data && typeof data === 'object' && 'detail' in data) {
        message = data.detail
      } else if (data && typeof data === 'object') {
        const fieldErrors = Object.entries(data)
          .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`)
          .join('; ');
        if (fieldErrors) {
          message = fieldErrors;
        } else if (axiosError.message) {
          message = axiosError.message;
        }
      } else if (axiosError.message) {
        message = axiosError.message
      } else if (status) {
        message = `HTTP ${status}`;
      }
    } else if (error instanceof Error) {
      console.error('[api error]', error.message)
      message = error.message
    }
    throw new Error(message)
  }
}

export function register(data: RegisterPayload) {
  return api('/api/register', {
    method: 'POST',
    data: JSON.stringify(data),
  })
}

export function login(username: string, password: string) {
  return api('/api/token', {
    method: 'POST',
    data: JSON.stringify({ username, password }),
  })
}

export function logout() {
  return api('/api/logout', {
    method: 'POST',
  })
}

export type User = {
  id: number
  username: string
  name: string
  email?: string
  phone: string
  country: string
  referral_code: string
}

export function whoami(): Promise<User> {
  return api('/api/me')
}
