import type { Case } from '../types/models'

function toDayNumber(date: Date): number {
  return Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86_400_000)
}

export function getTodayKey(): string {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export function getDailyCaseForDate(date: Date, caseList: Case[]): Case {
  const approved = caseList.filter((item) => item.status === 'approved')

  if (!approved.length) {
    throw new Error('Nenhum caso aprovado disponível para o modo diário.')
  }

  const index = toDayNumber(date) % approved.length
  return approved[index]
}
