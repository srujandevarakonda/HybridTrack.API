export type BodyMeasurement = {
  id: string
  measuredAt: string
  weightKg: number
  bodyFatPercentage: number | null
  waistCm: number | null
}

export type BodyMeasurementInput = Omit<BodyMeasurement, 'id'>

export type RunActivity = {
  id: string
  startedAt: string
  distanceKm: number
  duration: string
  notes: string | null
  paceMinPerKm: number | null
}

export type RunActivityInput = Omit<RunActivity, 'id' | 'paceMinPerKm'>

export type StrengthWorkout = {
  id: string
  startedAt: string
  name: string
  notes: string | null
  setCount: number
}

export type StrengthWorkoutInput = Omit<StrengthWorkout, 'id' | 'setCount'>

export type StrengthSet = {
  id: string
  exerciseName: string
  setNumber: number
  repetitions: number
  weightKg: number
}

export type StrengthSetInput = Omit<StrengthSet, 'id'>

export type StrengthWorkoutDetail = StrengthWorkout & {
  sets: StrengthSet[]
}