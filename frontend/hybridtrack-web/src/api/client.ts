export const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5037'

export type HealthResponse = {
  status: string
  service: string
  utc: string
}

export async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  })

  if (!response.ok) {
    throw new Error(`API returned ${response.status}`)
  }

  if (response.status === 204) {
    return undefined as T
  }

  return response.json() as Promise<T>
}

export function getHealth() {
  return apiFetch<HealthResponse>('/api/health')
}