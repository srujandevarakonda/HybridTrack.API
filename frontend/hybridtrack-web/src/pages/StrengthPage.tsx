import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import type { StrengthWorkoutInput } from '../api/types'
import { useCreateStrengthWorkout, useStrengthWorkouts } from '../hooks/useStrengthWorkouts'

const initialForm = { startedAt: new Date().toISOString().slice(0, 16), name: '', notes: '' }

export function StrengthPage() {
  const [form, setForm] = useState(initialForm)
  const [validationError, setValidationError] = useState('')
  const workoutsQuery = useStrengthWorkouts()
  const createWorkout = useCreateStrengthWorkout()
  const workouts = [...(workoutsQuery.data ?? [])].sort((a, b) => Date.parse(b.startedAt) - Date.parse(a.startedAt))

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!form.startedAt || !form.name.trim()) { setValidationError('Enter a workout date and name.'); return }
    setValidationError('')
    const input: StrengthWorkoutInput = { startedAt: new Date(form.startedAt).toISOString(), name: form.name.trim(), notes: form.notes.trim() || null }
    createWorkout.mutate(input, { onSuccess: () => setForm(initialForm) })
  }

  return <section className="space-y-8"><div><p className="text-sm font-medium uppercase tracking-[0.16em] text-cyan-400">Training</p><h2 className="mt-2 text-2xl font-semibold">Strength workouts</h2></div><form onSubmit={submit} className="grid gap-4 rounded-lg border border-slate-800 bg-slate-900 p-5 md:grid-cols-3"><label className="text-sm text-slate-300">Started at<input required type="datetime-local" value={form.startedAt} onChange={(event) => setForm({ ...form, startedAt: event.target.value })} className="mt-1.5 w-full border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100" /></label><label className="text-sm text-slate-300">Workout name<input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className="mt-1.5 w-full border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100" /></label><label className="text-sm text-slate-300">Notes<input value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })} className="mt-1.5 w-full border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100" /></label><div className="md:col-span-3"><p className="text-sm text-rose-300">{validationError || (createWorkout.isError ? 'Could not save workout. Please try again.' : '')}</p><button disabled={createWorkout.isPending} className="mt-3 bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 disabled:opacity-50">{createWorkout.isPending ? 'Saving...' : 'Create workout'}</button></div></form><div className="overflow-x-auto rounded-lg border border-slate-800"><table className="w-full text-left text-sm"><thead className="bg-slate-900 text-slate-400"><tr><th className="px-4 py-3 font-medium">Workout</th><th className="px-4 py-3 font-medium">Date</th><th className="px-4 py-3 font-medium">Sets</th></tr></thead><tbody className="divide-y divide-slate-800">{workoutsQuery.isLoading && <tr><td className="px-4 py-5 text-slate-400" colSpan={3}>Loading workouts...</td></tr>}{workoutsQuery.isError && <tr><td className="px-4 py-5 text-rose-300" colSpan={3}>Could not load workouts.</td></tr>}{!workoutsQuery.isLoading && !workoutsQuery.isError && workouts.length === 0 && <tr><td className="px-4 py-5 text-slate-400" colSpan={3}>No workouts recorded yet.</td></tr>}{workouts.map((workout) => <tr key={workout.id}><td className="px-4 py-3"><Link className="font-medium text-cyan-400 hover:text-cyan-300" to={`/strength/${workout.id}`}>{workout.name}</Link></td><td className="px-4 py-3">{new Date(workout.startedAt).toLocaleString()}</td><td className="px-4 py-3">{workout.setCount}</td></tr>)}</tbody></table></div></section>
}