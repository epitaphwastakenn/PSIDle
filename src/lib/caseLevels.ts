import { caseSets } from '../data/cases/index'
import type { Difficulty, Disorder } from '../types/models'

export const CASE_LEVELS: Difficulty[] = ['easy', 'medium', 'hard']

/**
 * Levels a diagnosis can be served at. Rarer diagnoses (catalogue tier "hard") are not served as easy
 * cases: an explicit description does not make an unfamiliar diagnosis easy to name.
 */
export function levelsFor(disorder: Disorder): Difficulty[] {
  const authored = new Set(caseSets[disorder.id]?.variants.map((variant) => variant.level) ?? [])
  return CASE_LEVELS.filter((level) => authored.has(level) && (level !== 'easy' || disorder.difficulty !== 'hard'))
}

export function hasCasesFor(disorder: Disorder, level?: Difficulty): boolean {
  const levels = levelsFor(disorder)
  return level ? levels.includes(level) : levels.length > 0
}

/** Daily difficulty through the week, Wordle-puzzle style: easier early in the week, harder on Friday/Saturday. */
export function getDailyLevel(date: Date): Difficulty {
  const weekday = date.getDay()
  if (weekday === 1 || weekday === 2) return 'easy'
  if (weekday === 5 || weekday === 6) return 'hard'
  return 'medium'
}
