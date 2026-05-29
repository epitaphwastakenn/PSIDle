import { normalizeText } from './normalize'
import type { Disorder } from '../types/models'

export function getAliases(disorder: Disorder): string[] {
  return [disorder.namePt, disorder.nameOriginal ?? '', ...disorder.aliases].filter(Boolean)
}

export function findDisorderByGuess(guess: string, disorders: Disorder[]): Disorder | undefined {
  const normalizedGuess = normalizeText(guess)

  return disorders.find((disorder) =>
    getAliases(disorder).some((alias) => normalizeText(alias) === normalizedGuess),
  )
}

export function isCorrectGuess(guess: string, correctDisorder: Disorder): boolean {
  const normalizedGuess = normalizeText(guess)
  return getAliases(correctDisorder).some((alias) => normalizeText(alias) === normalizedGuess)
}
