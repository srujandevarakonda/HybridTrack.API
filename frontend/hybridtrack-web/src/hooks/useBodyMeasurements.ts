import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createBodyMeasurement, getBodyMeasurement, listBodyMeasurements, removeBodyMeasurement, updateBodyMeasurement } from '../api/bodyMeasurements'
import type { BodyMeasurementInput } from '../api/types'

const bodyMeasurementsKey = ['bodyMeasurements'] as const

export function useBodyMeasurements(filters?: { from?: string; to?: string }) {
  return useQuery({ queryKey: [...bodyMeasurementsKey, filters], queryFn: () => listBodyMeasurements(filters) })
}

export function useBodyMeasurement(id: string) {
  return useQuery({ queryKey: [...bodyMeasurementsKey, id], queryFn: () => getBodyMeasurement(id), enabled: Boolean(id) })
}

export function useCreateBodyMeasurement() {
  const queryClient = useQueryClient()
  return useMutation({ mutationFn: createBodyMeasurement, onSuccess: () => queryClient.invalidateQueries({ queryKey: bodyMeasurementsKey }) })
}

export function useUpdateBodyMeasurement() {
  const queryClient = useQueryClient()
  return useMutation({ mutationFn: ({ id, input }: { id: string; input: BodyMeasurementInput }) => updateBodyMeasurement(id, input), onSuccess: () => queryClient.invalidateQueries({ queryKey: bodyMeasurementsKey }) })
}

export function useRemoveBodyMeasurement() {
  const queryClient = useQueryClient()
  return useMutation({ mutationFn: removeBodyMeasurement, onSuccess: () => queryClient.invalidateQueries({ queryKey: bodyMeasurementsKey }) })
}