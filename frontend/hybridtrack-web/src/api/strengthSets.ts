import { apiFetch } from './client'
import type { StrengthSet, StrengthSetInput } from './types'

export function listStrengthSets(workoutId: string) {
  return apiFetch<StrengthSet[]>(`/api/strengthworkouts/${workoutId}/sets`)
}

export function getStrengthSet(workoutId: string, id: string) {
  return apiFetch<StrengthSet>(`/api/strengthworkouts/${workoutId}/sets/${id}`)
}

export function createStrengthSet(workoutId: string, input: StrengthSetInput) {
  return apiFetch<StrengthSet>(`/api/strengthworkouts/${workoutId}/sets`, { method: 'POST', body: JSON.stringify(input) })
}

export function updateStrengthSet(workoutId: string, id: string, input: StrengthSetInput) {
  return apiFetch<StrengthSet>(`/api/strengthworkouts/${workoutId}/sets/${id}`, { method: 'PUT', body: JSON.stringify(input) })
}

export function removeStrengthSet(workoutId: string, id: string) {
  return apiFetch<void>(`/api/strengthworkouts/${workoutId}/sets/${id}`, { method: 'DELETE' })
}