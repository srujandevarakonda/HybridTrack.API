import { NavLink, Outlet } from 'react-router-dom'

const navigation = [
  { to: '/', label: 'Dashboard' },
  { to: '/body-measurements', label: 'Measurements' },
  { to: '/runs', label: 'Runs' },
  { to: '/strength', label: 'Strength' },
]

export function AppLayout() {
  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 text-slate-100 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 border-b border-slate-800 pb-5 sm:mb-10">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-cyan-400">HybridTrack</p>
              <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Training foundation</h1>
            </div>
            <span className="border border-slate-700 px-3 py-1 text-xs text-slate-400">Phase 1</span>
          </div>
          <nav className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-sm" aria-label="Primary navigation">
            {navigation.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.to === '/'} className={({ isActive }: { isActive: boolean }) => isActive ? 'font-medium text-cyan-400' : 'text-slate-400 hover:text-slate-100'}>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </header>
        <Outlet />
      </div>
    </main>
  )
}