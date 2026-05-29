import { XPBar } from '../common/XPBar'

interface ProfileStatsProps {
  level: number
  xp: number
  coins: number
  streak: number
  totalCases: number
  dailyCases: number
  practiceCases: number
  accuracy: number
}

export function ProfileStats({ level, xp, coins, streak, totalCases, dailyCases, practiceCases, accuracy }: ProfileStatsProps) {
  return (
    <section className="panel panel-motion space-y-4 p-5">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Nivel" value={String(level)} delayMs={0} />
        <StatCard label="XP total" value={String(xp)} delayMs={45} />
        <StatCard label="Moedas" value={String(coins)} delayMs={90} />
        <StatCard label="Streak" value={`${streak} dia(s)`} delayMs={135} />
      </div>
      <XPBar xp={xp} level={level} />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Casos jogados" value={String(totalCases)} delayMs={180} />
        <StatCard label="Casos diarios" value={String(dailyCases)} delayMs={225} />
        <StatCard label="Casos de treino" value={String(practiceCases)} delayMs={270} />
        <StatCard label="Precisao" value={`${Math.round(accuracy * 100)}%`} delayMs={315} />
      </div>
    </section>
  )
}

function StatCard({ label, value, delayMs = 0 }: { label: string; value: string; delayMs?: number }) {
  return (
    <div className="list-pop stat-tile p-3" style={{ animationDelay: `${delayMs}ms` }}>
      <p className="text-xs font-semibold uppercase tracking-wide text-[color:var(--text-muted)]">{label}</p>
      <p className="text-lg font-bold text-[color:var(--text-strong)]">{value}</p>
    </div>
  )
}
