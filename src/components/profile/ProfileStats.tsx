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
    <section className="panel space-y-4 p-5">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Nivel" value={String(level)} />
        <StatCard label="XP total" value={String(xp)} />
        <StatCard label="Moedas" value={String(coins)} />
        <StatCard label="Streak" value={`${streak} dia(s)`} />
      </div>
      <XPBar xp={xp} level={level} />
      <div className="grid gap-3 sm:grid-cols-2">
        <StatCard label="Casos jogados" value={String(totalCases)} />
        <StatCard label="Precisao" value={`${Math.round(accuracy * 100)}%`} />
      </div>
    </section>
  )
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="stat-tile p-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-[color:var(--text-muted)]">{label}</p>
      <p className="text-lg font-bold text-[color:var(--text-strong)]">{value}</p>
    </div>
  )
}
