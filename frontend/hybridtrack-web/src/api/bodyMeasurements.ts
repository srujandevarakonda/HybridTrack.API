import { apiFetch } from './client'
import type { BodyMeasurement, BodyMeasurementInput } from './types'

export function listBodyMeasurements(filters?: { from?: string; to?: string }) {
  const searchParams = new URLSearchParams()
  if (filters?.from) searchParams.set('from', filters.from)
  if (filters?.to) searchParams.set('to', filters.to)
  const query = searchParams.size ? `?${searchParams.toString()}` : ''
  return apiFetch<BodyMeasurement[]>(`/api/bodymeasurements${query}`)
}

export function getBodyMeasurement(id: string) {
  return apiFetch<BodyMeasurement>(`/api/bodymeasurements/${id}`)
}

export function createBodyMeasurement(input: BodyMeasurementInput) {
  return apiFetch<BodyMeasurement>('/api/bodymeasurements', { method: 'POST', body: JSON.stringify(input) })
}

export function updateBodyMeasurement(id: string, input: BodyMeasurementInput) {
  return apiFetch<BodyMeasurement>(`/api/bodymeasurements/${id}`, { method: 'PUT', body: JSON.stringify(input) })
}

export function removeBodyMeasurement(id: string) {
  return apiFetch<void>(`/api/bodymeasurements/${id}`, { method: 'DELETE' })
}