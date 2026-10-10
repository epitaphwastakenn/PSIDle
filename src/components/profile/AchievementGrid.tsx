import { useEffect, useState } from 'react'
import { getSeenAchievements, markAchievementsSeen } from '../../lib/storage'
import type { Achievement } from '../../types/models'
import { Icon } from '../common/Icon'

interface AchievementGridProps {
  achievements: Achievement[]
  unlockedIds: string[]
}

const symbols = ['spark', 'calendar', 'book', 'check', 'flame', 'chart', 'medal', 'refresh'] as const

export function AchievementGrid({ achievements, unlockedIds }: AchievementGridProps) {
  const unlocked = new Set(unlockedIds)
  const unlockedCount = achievements.filter((achievement) => unlocked.has(achievement.id)).length
  // Medals unlocked since the last visit spin once to celebrate.
  const [fresh] = useState(() => new Set(unlockedIds.filter((id) => !getSeenAchievements().includes(id))))

  useEffect(() => {
    markAchievementsSeen(unlockedIds)
  }, [unlockedIds])

  return (
    <section>
      <div className="section-head">
        <h2 className="h2">Conquistas</h2>
        <span className="tag tag-accent mono">{unlockedCount} / {achievements.length}</span>
      </div>
      <div className="grid-4">
        {achievements.map((achievement, index) => {
          const isUnlocked = unlocked.has(achievement.id)
          return (
            <article key={achievement.id} className={`card achievement-card ${isUnlocked ? '' : 'achievement-locked'}`}>
              <span className={`medal${isUnlocked ? ' medal-on' : ''}${fresh.has(achievement.id) ? ' medal-new' : ''}`} aria-label={isUnlocked ? 'Conquistada' : 'Bloqueada'}>
                <span className="medal-face medal-front"><Icon name={isUnlocked ? symbols[index % symbols.length] : 'lock'} /></span>
                <span className="medal-face medal-back">ψ</span>
              </span>
              <h3>{achievement.title}</h3>
              <p>{achievement.description}</p>
              <span className="prize">+{achievement.rewardXp} XP · {achievement.rewardCoins} moedas</span>
            </article>
          )
        })}
      </div>
    </section>
  )
}
