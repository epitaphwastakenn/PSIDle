import type { Achievement } from '../../types/models'

interface AchievementGridProps {
  achievements: Achievement[]
  unlockedIds: string[]
}

export function AchievementGrid({ achievements, unlockedIds }: AchievementGridProps) {
  const unlocked = new Set(unlockedIds)

  return (
    <section className="space-y-3">
      <h2 className="font-title text-2xl text-denim-600">Conquistas</h2>
      <div className="grid gap-3 md:grid-cols-2">
        {achievements.map((achievement) => {
          const isUnlocked = unlocked.has(achievement.id)
          return (
            <article
              key={achievement.id}
              className={[
                'rounded-2xl border p-4 shadow-card transition',
                isUnlocked
                  ? 'border-mint-500 bg-mint-200/40'
                  : 'border-surface-200 bg-white opacity-80 grayscale-[0.25]',
              ].join(' ')}
            >
              <p className="text-sm font-bold text-denim-600">{achievement.title}</p>
              <p className="mt-1 text-sm text-slate-700">{achievement.description}</p>
              <p className="mt-2 text-xs font-semibold text-slate-600">
                +{achievement.rewardXp} XP | +{achievement.rewardCoins} moedas
              </p>
            </article>
          )
        })}
      </div>
    </section>
  )
}
