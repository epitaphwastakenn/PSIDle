import { disorders } from '../data/disorders'
import { normalizeText } from './normalize'
import type { Attempt, Difficulty, Disorder } from '../types/models'

export const difficultyLabels: Record<Difficulty, string> = { easy: 'Fácil', medium: 'Médio', hard: 'Difícil' }

export function getAttemptDisorderId(attempt: Attempt): string | undefined {
  return attempt.correctDisorderId ?? disorders.find((item) => attempt.caseId.includes(`-${item.id}-`))?.id
}

/** Maps a stored category (possibly saved before accents were fixed) to the current catalogue name. */
export function canonicalCategory(value: string | undefined): string | undefined {
  if (!value) return undefined
  const key = normalizeText(value)
  return disorders.find((item) => normalizeText(item.category) === key)?.category ?? value
}

export function getCategoryStats(attempts: Attempt[]) {
  const categories = [...new Set(disorders.map((item) => item.category))]
  return categories.map((category) => {
    const played = attempts.filter((attempt) => canonicalCategory(attempt.caseCategory) === category)
    const solved = played.filter((attempt) => attempt.solved).length
    return { category, played: played.length, solved, accuracy: played.length ? Math.round(solved / played.length * 100) : 0 }
  })
}

export function getPracticePool(category: string, difficulty: string): Disorder[] {
  return disorders.filter((item) => (category === 'all' || item.category === category) &&
    (difficulty === 'all' || item.difficulty === difficulty))
}

export function selectPracticeDisorder(input: {
  pool: Disorder[]
  attempts: Attempt[]
  servedIds: string[]
  adaptive: boolean
  random?: () => number
}): Disorder | undefined {
  const { pool, attempts, servedIds, adaptive, random = Math.random } = input
  if (!pool.length) return undefined
  const poolIds = new Set(pool.map((item) => item.id))
  const recency = [...attempts.map(getAttemptDisorderId).filter((id): id is string => Boolean(id)), ...servedIds]
  const recent = [...new Set(recency.filter((id) => poolIds.has(id)).reverse())]
    .slice(0, Math.min(8, pool.length - 1))
  const candidates = pool.filter((item) => !recent.includes(item.id))
  const stats = getCategoryStats(attempts)
  const weighted = candidates.map((item) => {
    const history = attempts.filter((attempt) => getAttemptDisorderId(attempt) === item.id)
    const category = stats.find((stat) => stat.category === item.category)!
    const weight = adaptive
      ? 1 + (history.length === 0 ? 3 : 0) + (history.at(-1)?.solved === false ? 4 : 0) +
        (category.played >= 2 && category.accuracy < 60 ? 2 : 0)
      : 1
    return { item, weight }
  })
  let cursor = random() * weighted.reduce((sum, entry) => sum + entry.weight, 0)
  for (const entry of weighted) {
    cursor -= entry.weight
    if (cursor < 0) return entry.item
  }
  return weighted[weighted.length - 1].item
}
