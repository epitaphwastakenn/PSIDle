import { AchievementGrid } from '../components/profile/AchievementGrid'
import { ProfileStats } from '../components/profile/ProfileStats'
import { achievements } from '../data/achievements'
import { getUserProgress } from '../lib/storage'

export function ProfilePage() {
  const progress = getUserProgress()
  const totalCases = progress.attempts.length
  const solvedCases = progress.attempts.filter((attempt) => attempt.solved).length
  const accuracy = totalCases > 0 ? solvedCases / totalCases : 0

  return (
    <div className="space-y-5">
      <div>
        <h1 className="page-title text-3xl">Perfil</h1>
        <p className="page-subtitle text-sm">Acompanhe nivel, acertos, streak e conquistas.</p>
      </div>

      <ProfileStats
        level={progress.level}
        xp={progress.xp}
        coins={progress.coins}
        streak={progress.streak}
        totalCases={totalCases}
        accuracy={accuracy}
      />

      <AchievementGrid achievements={achievements} unlockedIds={progress.achievements} />
    </div>
  )
}
