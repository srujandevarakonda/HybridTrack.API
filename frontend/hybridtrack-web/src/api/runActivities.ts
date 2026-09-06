import { apiFetch } from './client'
import type { RunActivity, RunActivityInput } from './types'

export function listRunActivities(filters?: { from?: string; to?: string }) {
  const searchParams = new URLSearchParams()
  if (filters?.from) searchParams.set('from', filters.from)
  if (filters?.to) searchParams.set('to', filters.to)
  const query = searchParams.size ? `?${searchParams.toString()}` : ''
  return apiFetch<RunActivity[]>(`/api/runactivities${query}`)
}

export function getRunActivity(id: string) {
  return apiFetch<RunActivity>(`/api/runactivities/${id}`)
}

export function createRunActivity(input: RunActivityInput) {
  return apiFetch<RunActivity>('/api/runactivities', { method: 'POST', body: JSON.stringify(input) })
}

export function updateRunActivity(id: string, input: RunActivityInput) {
  return apiFetch<RunActivity>(`/api/runactivities/${id}`, { method: 'PUT', body: JSON.stringify(input) })
}

export function removeRunActivity(id: string) {
  return apiFetch<void>(`/api/runactivities/${id}`, { method: 'DELETE' })
}