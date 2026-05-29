import { achievements } from '../data/achievements'
import { AchievementGrid } from '../components/profile/AchievementGrid'
import { ProfileStats } from '../components/profile/ProfileStats'
import { getUserProgress } from '../lib/storage'

export function ProfilePage() {
  const progress = getUserProgress()
  const totalCases = progress.attempts.length
  const solvedCases = progress.attempts.filter((attempt) => attempt.solved).length
  const accuracy = totalCases > 0 ? solvedCases / totalCases : 0

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-title text-3xl text-denim-600">Perfil</h1>
        <p className="text-sm text-slate-600">Acompanhe evolução de XP, acertos e conquistas.</p>
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
