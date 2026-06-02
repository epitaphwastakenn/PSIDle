import type { Achievement } from '../../types/models'

interface AchievementGridProps {
  achievements: Achievement[]
  unlockedIds: string[]
}

export function AchievementGrid({ achievements, unlockedIds }: AchievementGridProps) {
  const unlocked = new Set(unlockedIds)
  const unlockedCount = achievements.filter((achievement) => unlocked.has(achievement.id)).length

  return (
    <section className="panel achievement-panel p-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="filter-label">Conquistas</p>
          <h2 className="page-title mt-1 text-2xl">Marcos de estudo</h2>
        </div>
        <span className="chip rounded-full px-3 py-1 text-xs">
          {unlockedCount}/{achievements.length} liberadas
        </span>
      </div>
      <div className="achievement-grid mt-4">
        {achievements.map((achievement) => {
          const isUnlocked = unlocked.has(achievement.id)
          return (
            <article
              key={achievement.id}
              className={[
                'achievement-card',
                isUnlocked ? 'achievement-card-unlocked' : 'achievement-card-locked',
              ].join(' ')}
            >
              <div className="achievement-card-top">
                <span className={isUnlocked ? 'achievement-dot achievement-dot-on' : 'achievement-dot'} />
                <span className="text-xs font-bold uppercase tracking-wide text-[color:var(--text-muted)]">
                  {isUnlocked ? 'Liberada' : 'Bloqueada'}
                </span>
              </div>
              <p className="mt-3 text-sm font-bold text-[color:var(--text-strong)]">{achievement.title}</p>
              <p className="mt-1 text-sm text-[color:var(--text-body)]">{achievement.description}</p>
              <p className="mt-2 text-xs font-semibold text-[color:var(--text-muted)]">
                +{achievement.rewardXp} XP | +{achievement.rewardCoins} moedas
              </p>
            </article>
          )
        })}
      </div>
    </section>
  )
}
