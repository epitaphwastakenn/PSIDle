import { disorders } from '../data/disorders'
import { findDisorderByGuess } from './guessing'
import { normalizeText } from './normalize'
import type { Disorder } from '../types/models'

/** ok = right answer, near = same diagnostic family, far = different family. */
export type GuessTone = 'ok' | 'near' | 'far'

export const toneTileClass: Record<GuessTone, string> = { ok: 'tile-ok', near: 'tile-warn', far: 'tile-bad' }
const toneEmoji: Record<GuessTone, string> = { ok: '🟩', near: '🟨', far: '🟥' }

export function getGuessTone(guess: string, correct: Disorder, catalogue: Disorder[] = disorders): GuessTone {
  const guessed = findDisorderByGuess(guess, catalogue)
  if (guessed?.id === correct.id) return 'ok'
  return guessed && normalizeText(guessed.category) === normalizeText(correct.category) ? 'near' : 'far'
}

export function buildShareText(input: { date: Date; tones: GuessTone[]; solved: boolean; maxAttempts: number; url: string }): string {
  const day = input.date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
  const score = input.solved ? input.tones.length : 'X'
  return `PsiDle ${day} 🧠 ${score}/${input.maxAttempts}\n${input.tones.map((tone) => toneEmoji[tone]).join('')}\n${input.url}`
}
