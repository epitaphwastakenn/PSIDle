import { XPBar } from '../common/XPBar'

interface ProfileStatsProps {
  level: number
  xp: number
  coins: number
  streak: number
  totalCases: number
  accuracy: number
}

export function ProfileStats({ level, xp, coins, streak, totalCases, accuracy }: ProfileStatsProps) {
  return (
    <section className="space-y-4 rounded-2xl border border-surface-200 bg-white p-5 shadow-card">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Nível" value={String(level)} />
        <StatCard label="XP total" value={String(xp)} />
        <StatCard label="Moedas" value={String(coins)} />
        <StatCard label="Streak" value={`${streak} dia(s)`} />
      </div>
      <XPBar xp={xp} level={level} />
      <div className="grid gap-3 sm:grid-cols-2">
        <StatCard label="Casos jogados" value={String(totalCases)} />
        <StatCard label="Precisão" value={`${Math.round(accuracy * 100)}%`} />
      </div>
    </section>
  )
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-surface-50 p-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <p className="text-lg font-bold text-denim-600">{value}</p>
    </div>
  )
}
