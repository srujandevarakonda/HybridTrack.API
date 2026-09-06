import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createStrengthSet, getStrengthSet, listStrengthSets, removeStrengthSet, updateStrengthSet } from '../api/strengthSets'
import type { StrengthSetInput } from '../api/types'
import { strengthWorkoutsKey } from './useStrengthWorkouts'

const strengthSetsKey = ['strengthSets'] as const

export function useStrengthSets(workoutId: string) {
  return useQuery({ queryKey: [...strengthSetsKey, workoutId], queryFn: () => listStrengthSets(workoutId), enabled: Boolean(workoutId) })
}

export function useStrengthSet(workoutId: string, id: string) {
  return useQuery({ queryKey: [...strengthSetsKey, workoutId, id], queryFn: () => getStrengthSet(workoutId, id), enabled: Boolean(workoutId && id) })
}

function useStrengthSetMutation<TVariables>(mutationFn: (variables: TVariables) => Promise<unknown>) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn,
    onSuccess: (_data, variables: TVariables) => {
      const workoutId = (variables as { workoutId: string }).workoutId
      void queryClient.invalidateQueries({ queryKey: [...strengthSetsKey, workoutId] })
      void queryClient.invalidateQueries({ queryKey: [...strengthWorkoutsKey, workoutId] })
      void queryClient.invalidateQueries({ queryKey: strengthWorkoutsKey })
    },
  })
}

export function useCreateStrengthSet() {
  return useStrengthSetMutation(({ workoutId, input }: { workoutId: string; input: StrengthSetInput }) => createStrengthSet(workoutId, input))
}

export function useUpdateStrengthSet() {
  return useStrengthSetMutation(({ workoutId, id, input }: { workoutId: string; id: string; input: StrengthSetInput }) => updateStrengthSet(workoutId, id, input))
}

export function useRemoveStrengthSet() {
  return useStrengthSetMutation(({ workoutId, id }: { workoutId: string; id: string }) => removeStrengthSet(workoutId, id))
}