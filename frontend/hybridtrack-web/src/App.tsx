import { useQuery } from '@tanstack/react-query'

type HealthResponse = {
  status: string
  service: string
  utc: string
}

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5037'

async function getHealth(): Promise<HealthResponse> {
  const response = await fetch(`${apiBaseUrl}/api/health`)
  if (!response.ok) throw new Error(`API returned ${response.status}`)
  return response.json() as Promise<HealthResponse>
}

function App() {
  const healthQuery = useQuery({ queryKey: ['health'], queryFn: getHealth })

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100">
      <div className="mx-auto max-w-4xl">
        <header className="mb-12 flex items-center justify-between border-b border-slate-800 pb-6">
          <div>
            <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-cyan-400">HybridTrack</p>
            <h1 className="text-3xl font-semibold tracking-tight">Training foundation</h1>
          </div>
          <span className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-400">Phase 1</span>
        </header>

        <section className="grid gap-6 md:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="max-w-xl text-lg leading-8 text-slate-300">
              A focused home for strength, running, measurements, and progress. The application foundation is ready for the next feature set.
            </p>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-medium">API connection</h2>
              <span className={`h-3 w-3 rounded-full ${healthQuery.isSuccess ? 'bg-emerald-400' : healthQuery.isPending ? 'bg-amber-400' : 'bg-rose-400'}`} />
            </div>
            <p className="text-sm text-slate-400">
              {healthQuery.isPending && 'Checking HybridTrack.Api...'}
              {healthQuery.isError && 'The API is not reachable. Start the backend and try again.'}
              {healthQuery.isSuccess && `Connected to ${healthQuery.data.service}`}
            </p>
            {healthQuery.isError && (
              <button className="mt-5 rounded-md bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950" onClick={() => void healthQuery.refetch()}>
                Retry connection
              </button>
            )}
          </div>
        </section>
      </div>
    </main>
  )
}

export default App
