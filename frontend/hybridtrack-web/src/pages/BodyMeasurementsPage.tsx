import { useState, type FormEvent } from 'react'
import type { BodyMeasurementInput } from '../api/types'
import { useBodyMeasurements, useCreateBodyMeasurement } from '../hooks/useBodyMeasurements'

const initialForm = { measuredAt: new Date().toISOString().slice(0, 16), weightKg: '', bodyFatPercentage: '', waistCm: '' }
const toDate = (value: string) => new Date(value).toLocaleString()

export function BodyMeasurementsPage() {
  const [form, setForm] = useState(initialForm)
  const [validationError, setValidationError] = useState('')
  const measurementsQuery = useBodyMeasurements()
  const createMeasurement = useCreateBodyMeasurement()
  const measurements = [...(measurementsQuery.data ?? [])].sort((a, b) => Date.parse(b.measuredAt) - Date.parse(a.measuredAt))

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const weightKg = Number(form.weightKg)
    const bodyFatPercentage = form.bodyFatPercentage ? Number(form.bodyFatPercentage) : null
    const waistCm = form.waistCm ? Number(form.waistCm) : null
    if (!form.measuredAt || weightKg <= 0 || (bodyFatPercentage !== null && (bodyFatPercentage < 0 || bodyFatPercentage > 100)) || (waistCm !== null && waistCm <= 0)) {
      setValidationError('Enter a date, a weight above 0, body fat from 0 to 100, and a waist measurement above 0.')
      return
    }
    setValidationError('')
    const input: BodyMeasurementInput = { measuredAt: new Date(form.measuredAt).toISOString(), weightKg, bodyFatPercentage, waistCm }
    createMeasurement.mutate(input, { onSuccess: () => setForm(initialForm) })
  }

  return <section className="space-y-8"><div><p className="text-sm font-medium uppercase tracking-[0.16em] text-cyan-400">Body</p><h2 className="mt-2 text-2xl font-semibold">Measurements</h2></div><form onSubmit={submit} className="grid gap-4 rounded-lg border border-slate-800 bg-slate-900 p-5 md:grid-cols-4"><label className="text-sm text-slate-300">Measured at<input required type="datetime-local" value={form.measuredAt} onChange={(event) => setForm({ ...form, measuredAt: event.target.value })} className="mt-1.5 w-full border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100" /></label><label className="text-sm text-slate-300">Weight (kg)<input required min="0.01" step="0.1" type="number" value={form.weightKg} onChange={(event) => setForm({ ...form, weightKg: event.target.value })} className="mt-1.5 w-full border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100" /></label><label className="text-sm text-slate-300">Body fat (%)<input min="0" max="100" step="0.1" type="number" value={form.bodyFatPercentage} onChange={(event) => setForm({ ...form, bodyFatPercentage: event.target.value })} className="mt-1.5 w-full border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100" /></label><label className="text-sm text-slate-300">Waist (cm)<input min="0.01" step="0.1" type="number" value={form.waistCm} onChange={(event) => setForm({ ...form, waistCm: event.target.value })} className="mt-1.5 w-full border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100" /></label><div className="md:col-span-4"><p className="text-sm text-rose-300">{validationError || (createMeasurement.isError ? 'Could not save measurement. Please try again.' : '')}</p><button disabled={createMeasurement.isPending} className="mt-3 bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 disabled:opacity-50">{createMeasurement.isPending ? 'Saving...' : 'Add measurement'}</button></div></form><div className="overflow-x-auto rounded-lg border border-slate-800"><table className="w-full text-left text-sm"><thead className="bg-slate-900 text-slate-400"><tr><th className="px-4 py-3 font-medium">Date</th><th className="px-4 py-3 font-medium">Weight</th><th className="px-4 py-3 font-medium">Body fat</th><th className="px-4 py-3 font-medium">Waist</th></tr></thead><tbody className="divide-y divide-slate-800">{measurementsQuery.isLoading && <tr><td className="px-4 py-5 text-slate-400" colSpan={4}>Loading measurements...</td></tr>}{measurementsQuery.isError && <tr><td className="px-4 py-5 text-rose-300" colSpan={4}>Could not load measurements.</td></tr>}{!measurementsQuery.isLoading && !measurementsQuery.isError && measurements.length === 0 && <tr><td className="px-4 py-5 text-slate-400" colSpan={4}>No measurements recorded yet.</td></tr>}{measurements.map((measurement) => <tr key={measurement.id}><td className="px-4 py-3">{toDate(measurement.measuredAt)}</td><td className="px-4 py-3">{measurement.weightKg} kg</td><td className="px-4 py-3">{measurement.bodyFatPercentage ?? '-'}</td><td className="px-4 py-3">{measurement.waistCm ?? '-'}</td></tr>)}</tbody></table></div></section>
}