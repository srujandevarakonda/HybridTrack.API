import { useState, type FormEvent } from 'react'
import { Link, useParams } from 'react-router-dom'
import type { StrengthSetInput } from '../api/types'
import { useCreateStrengthSet } from '../hooks/useStrengthSets'
import { useStrengthWorkout } from '../hooks/useStrengthWorkouts'

const initialForm = { exerciseName: '', setNumber: '1', repetitions: '', weightKg: '' }

export function StrengthWorkoutDetailPage() {
  const { id = '' } = useParams()
  const [form, setForm] = useState(initialForm)
  const [validationError, setValidationError] = useState('')
  const workoutQuery = useStrengthWorkout(id)
  const createSet = useCreateStrengthSet()

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const setNumber = Number(form.setNumber)
    const repetitions = Number(form.repetitions)
    const weightKg = Number(form.weightKg)
    if (!form.exerciseName.trim() || setNumber < 1 || repetitions < 1 || weightKg < 0) { setValidationError('Enter an exercise, set number and repetitions of at least 1, and a non-negative weight.'); return }
    setValidationError('')
    const input: StrengthSetInput = { exerciseName: form.exerciseName.trim(), setNumber, repetitions, weightKg }
    createSet.mutate({ workoutId: id, input }, { onSuccess: () => setForm(initialForm) })
  }

  if (workoutQuery.isLoading) return <p className="text-slate-400">Loading workout...</p>
  if (workoutQuery.isError || !workoutQuery.data) return <section className="space-y-4"><p className="text-rose-300">Could not load this workout.</p><Link className="text-sm text-cyan-400 hover:text-cyan-300" to="/strength">Back to strength workouts</Link></section>

  const workout = workoutQuery.data
  const sets = [...workout.sets].sort((a, b) => a.exerciseName.localeCompare(b.exerciseName) || a.setNumber - b.setNumber)
  return <section className="space-y-8"><div><Link className="text-sm text-cyan-400 hover:text-cyan-300" to="/strength">Back to strength workouts</Link><p className="mt-6 text-sm font-medium uppercase tracking-[0.16em] text-cyan-400">{new Date(workout.startedAt).toLocaleString()}</p><h2 className="mt-2 text-2xl font-semibold">{workout.name}</h2>{workout.notes && <p className="mt-3 max-w-2xl text-slate-400">{workout.notes}</p>}</div><form onSubmit={submit} className="grid gap-4 rounded-lg border border-slate-800 bg-slate-900 p-5 md:grid-cols-4"><label className="text-sm text-slate-300">Exercise<input required value={form.exerciseName} onChange={(event) => setForm({ ...form, exerciseName: event.target.value })} className="mt-1.5 w-full border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100" /></label><label className="text-sm text-slate-300">Set<input required min="1" type="number" value={form.setNumber} onChange={(event) => setForm({ ...form, setNumber: event.target.value })} className="mt-1.5 w-full border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100" /></label><label className="text-sm text-slate-300">Repetitions<input required min="1" type="number" value={form.repetitions} onChange={(event) => setForm({ ...form, repetitions: event.target.value })} className="mt-1.5 w-full border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100" /></label><label className="text-sm text-slate-300">Weight (kg)<input required min="0" step="0.25" type="number" value={form.weightKg} onChange={(event) => setForm({ ...form, weightKg: event.target.value })} className="mt-1.5 w-full border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100" /></label><div className="md:col-span-4"><p className="text-sm text-rose-300">{validationError || (createSet.isError ? 'Could not save set. Please try again.' : '')}</p><button disabled={createSet.isPending} className="mt-3 bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 disabled:opacity-50">{createSet.isPending ? 'Saving...' : 'Add set'}</button></div></form><div className="overflow-x-auto rounded-lg border border-slate-800"><table className="w-full text-left text-sm"><thead className="bg-slate-900 text-slate-400"><tr><th className="px-4 py-3 font-medium">Exercise</th><th className="px-4 py-3 font-medium">Set</th><th className="px-4 py-3 font-medium">Reps</th><th className="px-4 py-3 font-medium">Weight</th></tr></thead><tbody className="divide-y divide-slate-800">{sets.length === 0 && <tr><td className="px-4 py-5 text-slate-400" colSpan={4}>No sets recorded yet.</td></tr>}{sets.map((set) => <tr key={set.id}><td className="px-4 py-3">{set.exerciseName}</td><td className="px-4 py-3">{set.setNumber}</td><td className="px-4 py-3">{set.repetitions}</td><td className="px-4 py-3">{set.weightKg} kg</td></tr>)}</tbody></table></div></section>
}