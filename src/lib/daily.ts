import type { Attempt, Case } from '../types/models'

/** How many past days are available in the case archive. */
export const ARCHIVE_DAYS = 30
/** Past daily cases pay half of the normal daily rewards. */
export const ARCHIVE_REWARD_FACTOR = 0.5

const DAY_KEY_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/

function toDayNumber(date: Date): number {
  return Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86_400_000)
}

export function toDayKey(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export function getTodayKey(): string {
  return toDayKey(new Date())
}

export function parseDayKey(key: string): Date | null {
  const match = DAY_KEY_PATTERN.exec(key)
  if (!match) return null
  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]))
  return toDayKey(date) === key ? date : null
}

/** Day keys for the archive, newest first, starting yesterday. */
export function getArchiveDayKeys(today = new Date()): string[] {
  return Array.from({ length: ARCHIVE_DAYS }, (_, index) =>
    toDayKey(new Date(today.getFullYear(), today.getMonth(), today.getDate() - index - 1)))
}

export function isArchiveDayKey(key: string): boolean {
  return getArchiveDayKeys().includes(key)
}

/** The day a daily attempt's case belongs to (archive plays record it separately from the play date). */
export function getAttemptDayKey(attempt: Pick<Attempt, 'date' | 'caseDate'>): string {
  return attempt.caseDate ?? attempt.date
}

export function findDailyAttempt(attempts: Attempt[], dayKey: string): Attempt | undefined {
  return attempts.findLast((attempt) => attempt.mode === 'daily' && getAttemptDayKey(attempt) === dayKey)
}

export function getDailyCaseForDate(date: Date, caseList: Case[]): Case {
  const approved = caseList.filter((item) => item.status === 'approved')

  if (!approved.length) {
    throw new Error('Nenhum caso aprovado disponível para o modo diário.')
  }

  const index = toDayNumber(date) % approved.length
  return approved[index]
}

export interface DailyStats {
  played: number
  wins: number
  winRate: number
  /** Solved cases by number of guesses used, index 0 = solved on the first guess. */
  distribution: number[]
  maxStreak: number
}

export function getDailyStats(attempts: Attempt[], maxGuesses = 5): DailyStats {
  const daily = attempts.filter((attempt) => attempt.mode === 'daily')
  const wins = daily.filter((attempt) => attempt.solved)
  const distribution = Array.from({ length: maxGuesses }, () => 0)
  for (const attempt of wins) distribution[Math.min(maxGuesses, Math.max(1, attempt.guesses.length)) - 1]++

  // Streaks only count cases played on their own day, not catch-up plays from the archive.
  const dayNumbers = [...new Set(daily.filter((attempt) => !attempt.caseDate).map((attempt) => parseDayKey(attempt.date)))]
    .filter((date): date is Date => Boolean(date))
    .map(toDayNumber)
    .sort((a, b) => a - b)
  let maxStreak = 0
  let run = 0
  dayNumbers.forEach((day, index) => {
    run = index > 0 && day - dayNumbers[index - 1] === 1 ? run + 1 : 1
    maxStreak = Math.max(maxStreak, run)
  })

  return { played: daily.length, wins: wins.length, winRate: daily.length ? Math.round((wins.length / daily.length) * 100) : 0, distribution, maxStreak }
}
