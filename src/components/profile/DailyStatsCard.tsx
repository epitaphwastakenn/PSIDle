import type { DailyStats } from '../../lib/daily'

export function DailyStatsCard({ stats, currentStreak }: { stats: DailyStats; currentStreak: number }) {
  const peak = Math.max(1, ...stats.distribution)
  const maxStreak = Math.max(stats.maxStreak, currentStreak)

  return (
    <section>
      <div className="section-head"><h2 className="h2">Caso diário</h2></div>
      <div className="card daily-stats">
        <div className="daily-stats-numbers">
          <div className="stat"><span className="stat-value">{stats.played}</span><span className="stat-label">Jogados</span></div>
          <div className="stat"><span className="stat-value">{stats.winRate}<small>%</small></span><span className="stat-label">Acertos</span></div>
          <div className="stat"><span className="stat-value">{currentStreak}</span><span className="stat-label">Sequência</span></div>
          <div className="stat"><span className="stat-value">{maxStreak}</span><span className="stat-label">Recorde</span></div>
        </div>
        <div className="distribution" aria-label="Acertos por número de tentativas">
          {stats.distribution.map((count, index) => (
            <div key={index} className="distribution-row">
              <span className="mono small muted">{index + 1}</span>
              <div className="distribution-track">
                <span className={count ? 'distribution-bar' : 'distribution-bar distribution-empty'} style={{ width: `${Math.max(8, (count / peak) * 100)}%` }}>{count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
