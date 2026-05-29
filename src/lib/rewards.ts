import { getTodayKey } from './daily'
import type { UserProgress } from '../types/models'

export interface RewardBreakdown {
  xp: number
  coins: number
}

export function getXpRequiredForLevel(level: number): number {
  if (level <= 1) {
    return 0
  }

  return (level - 1) * (level - 1) * 120
}

export function calculateLevelFromXp(xp: number): number {
  const sanitized = Math.max(0, xp)
  return Math.floor(Math.sqrt(sanitized / 120)) + 1
}

export function awardXp(progress: UserProgress, amount: number): UserProgress {
  const xp = Math.max(0, progress.xp + Math.max(0, Math.floor(amount)))
  const level = calculateLevelFromXp(xp)

  return {
    ...progress,
    xp,
    level,
  }
}

export function awardCoins(progress: UserProgress, amount: number): UserProgress {
  const coins = Math.max(0, progress.coins + Math.max(0, Math.floor(amount)))

  return {
    ...progress,
    coins,
  }
}

function getLocalDateKey(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function getDateDiffInDays(a: string, b: string): number {
  const dateA = new Date(`${a}T00:00:00`)
  const dateB = new Date(`${b}T00:00:00`)
  return Math.round((dateB.getTime() - dateA.getTime()) / 86_400_000)
}

export function updateStreak(progress: UserProgress, date = new Date()): UserProgress {
  const todayKey = getLocalDateKey(date)
  const last = progress.lastPlayedDailyDate

  if (!last) {
    return {
      ...progress,
      streak: 1,
      lastPlayedDailyDate: todayKey,
    }
  }

  const dayDiff = getDateDiffInDays(last, todayKey)

  if (dayDiff <= 0) {
    return {
      ...progress,
      lastPlayedDailyDate: todayKey,
    }
  }

  if (dayDiff === 1) {
    return {
      ...progress,
      streak: progress.streak + 1,
      lastPlayedDailyDate: todayKey,
    }
  }

  return {
    ...progress,
    streak: 1,
    lastPlayedDailyDate: todayKey,
  }
}

export function getBaseXpForMode(mode: 'daily' | 'practice'): number {
  return mode === 'daily' ? 100 : 50
}

export function getDailySolveSpeedXpBonus(wrongGuesses: number): number {
  if (wrongGuesses <= 0) {
    return 120
  }
  if (wrongGuesses === 1) {
    return 95
  }
  if (wrongGuesses === 2) {
    return 70
  }
  if (wrongGuesses === 3) {
    return 45
  }
  if (wrongGuesses === 4) {
    return 20
  }
  return 0
}

export function getCompletionRewards(input: {
  mode: 'daily' | 'practice'
  solved: boolean
  score: number
  explanationReviewed: boolean
}): RewardBreakdown {
  let xp = getBaseXpForMode(input.mode)
  let coins = input.mode === 'daily' ? 20 : 10

  if (input.solved) {
    xp += 50
    coins += 15
  }

  if (input.score === 100) {
    xp += 50
    coins += 20
  }

  if (input.explanationReviewed) {
    xp += 20
  }

  coins += Math.floor(input.score / 10)

  return { xp, coins }
}

export function isTodayDailyDone(progress: UserProgress): boolean {
  return progress.lastPlayedDailyDate === getTodayKey()
}
