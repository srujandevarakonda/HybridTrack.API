import { useState, type FormEvent } from 'react'
import type { RunActivityInput } from '../api/types'
import { useCreateRunActivity, useRunActivities } from '../hooks/useRunActivities'

const initialForm = { startedAt: new Date().toISOString().slice(0, 16), distanceKm: '', duration: '00:30:00', notes: '' }

export function RunsPage() {
  const [form, setForm] = useState(initialForm)
  const [validationError, setValidationError] = useState('')
  const runsQuery = useRunActivities()
  const createRun = useCreateRunActivity()
  const runs = [...(runsQuery.data ?? [])].sort((a, b) => Date.parse(b.startedAt) - Date.parse(a.startedAt))

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const distanceKm = Number(form.distanceKm)
    if (!form.startedAt || distanceKm <= 0 || !/^\d{2}:\d{2}:\d{2}$/.test(form.duration)) { setValidationError('Enter a date, distance above 0, and duration as HH:MM:SS.'); return }
    setValidationError('')
    const input: RunActivityInput = { startedAt: new Date(form.startedAt).toISOString(), distanceKm, duration: form.duration, notes: form.notes.trim() || null }
    createRun.mutate(input, { onSuccess: () => setForm(initialForm) })
  }

  return <section className="space-y-8"><div><p className="text-sm font-medium uppercase tracking-[0.16em] text-cyan-400">Endurance</p><h2 className="mt-2 text-2xl font-semibold">Runs</h2></div><form onSubmit={submit} className="grid gap-4 rounded-lg border border-slate-800 bg-slate-900 p-5 md:grid-cols-4"><label className="text-sm text-slate-300">Started at<input required type="datetime-local" value={form.startedAt} onChange={(event) => setForm({ ...form, startedAt: event.target.value })} className="mt-1.5 w-full border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100" /></label><label className="text-sm text-slate-300">Distance (km)<input required min="0.01" step="0.01" type="number" value={form.distanceKm} onChange={(event) => setForm({ ...form, distanceKm: event.target.value })} className="mt-1.5 w-full border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100" /></label><label className="text-sm text-slate-300">Duration<input required pattern="\d{2}:\d{2}:\d{2}" value={form.duration} onChange={(event) => setForm({ ...form, duration: event.target.value })} className="mt-1.5 w-full border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100" /></label><label className="text-sm text-slate-300">Notes<input value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })} className="mt-1.5 w-full border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100" /></label><div className="md:col-span-4"><p className="text-sm text-rose-300">{validationError || (createRun.isError ? 'Could not save run. Please try again.' : '')}</p><button disabled={createRun.isPending} className="mt-3 bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 disabled:opacity-50">{createRun.isPending ? 'Saving...' : 'Add run'}</button></div></form><div className="overflow-x-auto rounded-lg border border-slate-800"><table className="w-full text-left text-sm"><thead className="bg-slate-900 text-slate-400"><tr><th className="px-4 py-3 font-medium">Date</th><th className="px-4 py-3 font-medium">Distance</th><th className="px-4 py-3 font-medium">Duration</th><th className="px-4 py-3 font-medium">Pace</th><th className="px-4 py-3 font-medium">Notes</th></tr></thead><tbody className="divide-y divide-slate-800">{runsQuery.isLoading && <tr><td className="px-4 py-5 text-slate-400" colSpan={5}>Loading runs...</td></tr>}{runsQuery.isError && <tr><td className="px-4 py-5 text-rose-300" colSpan={5}>Could not load runs.</td></tr>}{!runsQuery.isLoading && !runsQuery.isError && runs.length === 0 && <tr><td className="px-4 py-5 text-slate-400" colSpan={5}>No runs recorded yet.</td></tr>}{runs.map((run) => <tr key={run.id}><td className="px-4 py-3">{new Date(run.startedAt).toLocaleString()}</td><td className="px-4 py-3">{run.distanceKm} km</td><td className="px-4 py-3">{run.duration}</td><td className="px-4 py-3">{run.paceMinPerKm?.toFixed(2) ?? '-'}</td><td className="px-4 py-3 text-slate-400">{run.notes ?? '-'}</td></tr>)}</tbody></table></div></section>
}