import { achievements } from '../data/achievements'
import type { ReviewItem, UserProgress } from '../types/models'

interface ProgressStats {
  totalAttempts: number
  dailyPlayed: number
  practiceSolved: number
  perfectScores: number
  hardSolved: number
  solvedAttempts: number
  accuracy: number
  reviewCount: number
}

function buildStats(progress: UserProgress, reviewItems: ReviewItem[]): ProgressStats {
  const totalAttempts = progress.attempts.length
  const solvedAttempts = progress.attempts.filter((attempt) => attempt.solved).length
  const dailyPlayed = progress.attempts.filter((attempt) => attempt.mode === 'daily').length
  const practiceSolved = progress.attempts.filter((attempt) => attempt.mode === 'practice' && attempt.solved).length
  const perfectScores = progress.attempts.filter((attempt) => attempt.solved && attempt.score === 100).length

  const hardSolvedCaseIds = new Set(
    progress.attempts
      .filter((attempt) => attempt.solved && attempt.caseId.includes('case-00'))
      .map((attempt) => attempt.caseId),
  )

  // Hard solved is approximated by case ids ending in known hard cases.
  const hardCaseIds = new Set(['case-005', 'case-007', 'case-009'])
  const hardSolved = Array.from(hardSolvedCaseIds).filter((id) => hardCaseIds.has(id)).length

  const reviewedCount = reviewItems.filter((item) => item.interval > 1 || item.status === 'mastered').length
  const accuracy = totalAttempts > 0 ? solvedAttempts / totalAttempts : 0

  return {
    totalAttempts,
    solvedAttempts,
    dailyPlayed,
    practiceSolved,
    perfectScores,
    hardSolved,
    accuracy,
    reviewCount: reviewedCount,
  }
}

function isConditionMet(conditionKey: string, progress: UserProgress, stats: ProgressStats): boolean {
  switch (conditionKey) {
    case 'cases_played_1':
      return stats.totalAttempts >= 1
    case 'daily_played_3':
      return stats.dailyPlayed >= 3
    case 'practice_solved_5':
      return stats.practiceSolved >= 5
    case 'perfect_scores_3':
      return stats.perfectScores >= 3
    case 'streak_5':
      return progress.streak >= 5
    case 'hard_solved_3':
      return stats.hardSolved >= 3
    case 'accuracy_70_10':
      return stats.totalAttempts >= 10 && stats.accuracy >= 0.7
    case 'reviews_10':
      return stats.reviewCount >= 10
    default:
      return false
  }
}

export function applyAchievementUnlocks(progress: UserProgress, reviewItems: ReviewItem[]): {
  progress: UserProgress
  unlockedIds: string[]
  rewardXp: number
  rewardCoins: number
} {
  const stats = buildStats(progress, reviewItems)
  const unlockedIds: string[] = []
  let rewardXp = 0
  let rewardCoins = 0

  const currentUnlocked = new Set(progress.achievements)

  achievements.forEach((achievement) => {
    if (currentUnlocked.has(achievement.id)) {
      return
    }

    if (!isConditionMet(achievement.conditionKey, progress, stats)) {
      return
    }

    currentUnlocked.add(achievement.id)
    unlockedIds.push(achievement.id)
    rewardXp += achievement.rewardXp
    rewardCoins += achievement.rewardCoins
  })

  return {
    progress: {
      ...progress,
      achievements: Array.from(currentUnlocked),
    },
    unlockedIds,
    rewardXp,
    rewardCoins,
  }
}
