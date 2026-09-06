import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createRunActivity, getRunActivity, listRunActivities, removeRunActivity, updateRunActivity } from '../api/runActivities'
import type { RunActivityInput } from '../api/types'

const runActivitiesKey = ['runActivities'] as const

export function useRunActivities(filters?: { from?: string; to?: string }) {
  return useQuery({ queryKey: [...runActivitiesKey, filters], queryFn: () => listRunActivities(filters) })
}

export function useRunActivity(id: string) {
  return useQuery({ queryKey: [...runActivitiesKey, id], queryFn: () => getRunActivity(id), enabled: Boolean(id) })
}

export function useCreateRunActivity() {
  const queryClient = useQueryClient()
  return useMutation({ mutationFn: createRunActivity, onSuccess: () => queryClient.invalidateQueries({ queryKey: runActivitiesKey }) })
}

export function useUpdateRunActivity() {
  const queryClient = useQueryClient()
  return useMutation({ mutationFn: ({ id, input }: { id: string; input: RunActivityInput }) => updateRunActivity(id, input), onSuccess: () => queryClient.invalidateQueries({ queryKey: runActivitiesKey }) })
}

export function useRemoveRunActivity() {
  const queryClient = useQueryClient()
  return useMutation({ mutationFn: removeRunActivity, onSuccess: () => queryClient.invalidateQueries({ queryKey: runActivitiesKey }) })
}