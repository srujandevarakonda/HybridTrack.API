import { useQuery } from '@tanstack/react-query'
import { getHealth } from '../api/client'

export function DashboardPage() {
  const healthQuery = useQuery({ queryKey: ['health'], queryFn: getHealth })

  return (
    <section className="grid gap-6 md:grid-cols-[1.4fr_1fr]">
      <div>
        <p className="max-w-xl text-lg leading-8 text-slate-300">A focused home for strength, running, measurements, and progress. Choose a tracker above to record your next session.</p>
      </div>
      <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
        <div className="mb-5 flex items-center justify-between"><h2 className="font-medium">API connection</h2><span className={`h-3 w-3 rounded-full ${healthQuery.isSuccess ? 'bg-emerald-400' : healthQuery.isPending ? 'bg-amber-400' : 'bg-rose-400'}`} /></div>
        <p className="text-sm text-slate-400">{healthQuery.isPending && 'Checking HybridTrack.Api...'}{healthQuery.isError && 'The API is not reachable. Start the backend and try again.'}{healthQuery.isSuccess && `Connected to ${healthQuery.data.service}`}</p>
        {healthQuery.isError && <button className="mt-5 bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950" onClick={() => void healthQuery.refetch()}>Retry connection</button>}
      </div>
    </section>
  )
}