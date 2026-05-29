import type { Achievement } from '../../types/models'

interface AchievementGridProps {
  achievements: Achievement[]
  unlockedIds: string[]
}

export function AchievementGrid({ achievements, unlockedIds }: AchievementGridProps) {
  const unlocked = new Set(unlockedIds)

  return (
    <section className="space-y-3">
      <h2 className="page-title text-2xl">Conquistas</h2>
      <div className="grid gap-3 md:grid-cols-2">
        {achievements.map((achievement, index) => {
          const isUnlocked = unlocked.has(achievement.id)
          return (
            <article
              key={achievement.id}
              className={[
                'panel list-pop p-4 transition',
                isUnlocked ? 'glow-outline' : 'opacity-75 saturate-50',
              ].join(' ')}
              style={{ animationDelay: `${Math.min(index * 35, 260)}ms` }}
            >
              <p className="text-sm font-bold text-[color:var(--text-strong)]">{achievement.title}</p>
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
