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
    <section className="panel profile-stats-panel p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="filter-label">Progresso</p>
          <h2 className="page-title mt-1 text-2xl">Ritmo da conta</h2>
        </div>
        <span className="chip rounded-full px-3 py-1 text-xs">Precisao {Math.round(accuracy * 100)}%</span>
      </div>

      <div className="profile-stat-grid mt-4">
        <StatCard label="Nivel" value={String(level)} tone="primary" />
        <StatCard label="XP total" value={String(xp)} />
        <StatCard label="Moedas" value={String(coins)} />
        <StatCard label="Streak" value={`${streak} dia(s)`} />
      </div>

      <div className="mt-4">
        <XPBar xp={xp} level={level} />
      </div>

      <div className="profile-stat-grid mt-4">
        <StatCard label="Casos jogados" value={String(totalCases)} />
        <StatCard label="Casos diarios" value={String(dailyCases)} />
        <StatCard label="Casos de treino" value={String(practiceCases)} />
        <StatCard label="Acertos" value={`${Math.round(accuracy * 100)}%`} tone="success" />
      </div>
    </section>
  )
}

function StatCard({ label, value, tone = 'default' }: { label: string; value: string; tone?: 'default' | 'primary' | 'success' }) {
  return (
    <div className={`stat-tile profile-stat-card profile-stat-${tone}`}>
      <p className="text-xs font-semibold uppercase tracking-wide text-[color:var(--text-muted)]">{label}</p>
      <p className="text-lg font-bold text-[color:var(--text-strong)]">{value}</p>
    </div>
  )
}
