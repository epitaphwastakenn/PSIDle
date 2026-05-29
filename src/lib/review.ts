import type { ReviewItem } from '../types/models'

interface AddReviewInput {
  caseId: string
  correctDisorderId: string
  guessedDisorderId?: string
  now?: Date
}

function createId(prefix: string): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `${prefix}-${crypto.randomUUID()}`
  }

  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10000)}`
}

function addDays(date: Date, days: number): Date {
  const copy = new Date(date)
  copy.setDate(copy.getDate() + days)
  return copy
}

export function addReviewItem(items: ReviewItem[], input: AddReviewInput): ReviewItem[] {
  const now = input.now ?? new Date()
  const existing = items.find(
    (item) => item.caseId === input.caseId && item.correctDisorderId === input.correctDisorderId && item.status !== 'mastered',
  )

  if (existing) {
    return items.map((item) => {
      if (item.id !== existing.id) {
        return item
      }

      return {
        ...item,
        guessedDisorderId: input.guessedDisorderId,
        dueAt: addDays(now, 1).toISOString(),
        interval: 1,
        ease: Math.max(1.3, item.ease - 0.1),
        status: 'due',
      }
    })
  }

  const newItem: ReviewItem = {
    id: createId('review'),
    caseId: input.caseId,
    correctDisorderId: input.correctDisorderId,
    guessedDisorderId: input.guessedDisorderId,
    createdAt: now.toISOString(),
    dueAt: addDays(now, 1).toISOString(),
    interval: 1,
    ease: 2.3,
    status: 'learning',
  }

  return [newItem, ...items]
}

export function getDueReviewItems(items: ReviewItem[], now = new Date()): ReviewItem[] {
  const nowMs = now.getTime()

  return items
    .filter((item) => new Date(item.dueAt).getTime() <= nowMs && item.status !== 'mastered')
    .sort((a, b) => new Date(a.dueAt).getTime() - new Date(b.dueAt).getTime())
}

export function gradeReviewItem(item: ReviewItem, isCorrect: boolean, now = new Date()): ReviewItem {
  if (isCorrect) {
    const newEase = Math.min(3, item.ease + 0.15)
    const newInterval = Math.max(2, Math.round(item.interval * newEase))
    const nextDue = addDays(now, newInterval)
    const status: ReviewItem['status'] = newInterval >= 12 ? 'mastered' : 'learning'

    return {
      ...item,
      ease: newEase,
      interval: newInterval,
      dueAt: nextDue.toISOString(),
      status,
    }
  }

  return {
    ...item,
    ease: Math.max(1.3, item.ease - 0.2),
    interval: 1,
    dueAt: addDays(now, 1).toISOString(),
    status: 'due',
  }
}
