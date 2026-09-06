import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createStrengthWorkout, getStrengthWorkout, listStrengthWorkouts, removeStrengthWorkout, updateStrengthWorkout } from '../api/strengthWorkouts'
import type { StrengthWorkoutInput } from '../api/types'

export const strengthWorkoutsKey = ['strengthWorkouts'] as const

export function useStrengthWorkouts() {
  return useQuery({ queryKey: strengthWorkoutsKey, queryFn: listStrengthWorkouts })
}

export function useStrengthWorkout(id: string) {
  return useQuery({ queryKey: [...strengthWorkoutsKey, id], queryFn: () => getStrengthWorkout(id), enabled: Boolean(id) })
}

export function useCreateStrengthWorkout() {
  const queryClient = useQueryClient()
  return useMutation({ mutationFn: createStrengthWorkout, onSuccess: () => queryClient.invalidateQueries({ queryKey: strengthWorkoutsKey }) })
}

export function useUpdateStrengthWorkout() {
  const queryClient = useQueryClient()
  return useMutation({ mutationFn: ({ id, input }: { id: string; input: StrengthWorkoutInput }) => updateStrengthWorkout(id, input), onSuccess: () => queryClient.invalidateQueries({ queryKey: strengthWorkoutsKey }) })
}

export function useRemoveStrengthWorkout() {
  const queryClient = useQueryClient()
  return useMutation({ mutationFn: removeStrengthWorkout, onSuccess: () => queryClient.invalidateQueries({ queryKey: strengthWorkoutsKey }) })
}