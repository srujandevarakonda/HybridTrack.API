import { apiFetch } from './client'
import type { StrengthWorkout, StrengthWorkoutDetail, StrengthWorkoutInput } from './types'

export function listStrengthWorkouts() {
  return apiFetch<StrengthWorkout[]>('/api/strengthworkouts')
}

export function getStrengthWorkout(id: string) {
  return apiFetch<StrengthWorkoutDetail>(`/api/strengthworkouts/${id}`)
}

export function createStrengthWorkout(input: StrengthWorkoutInput) {
  return apiFetch<StrengthWorkout>('/api/strengthworkouts', { method: 'POST', body: JSON.stringify(input) })
}

export function updateStrengthWorkout(id: string, input: StrengthWorkoutInput) {
  return apiFetch<StrengthWorkout>(`/api/strengthworkouts/${id}`, { method: 'PUT', body: JSON.stringify(input) })
}

export function removeStrengthWorkout(id: string) {
  return apiFetch<void>(`/api/strengthworkouts/${id}`, { method: 'DELETE' })
}