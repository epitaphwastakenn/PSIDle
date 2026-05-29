import type { Case, ReviewHistoryEntry, ReviewItem } from '../types/models'

interface AddReviewInput {
  caseId: string
  correctDisorderId: string
  guessedDisorderId?: string
  caseSnapshot?: Case
  originalGuesses?: string[]
  originalCluesUsed?: number
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
        caseSnapshot: input.caseSnapshot ?? item.caseSnapshot,
        originalGuesses: input.originalGuesses ?? item.originalGuesses,
        originalCluesUsed: input.originalCluesUsed ?? item.originalCluesUsed,
        dueAt: now.toISOString(),
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
    caseSnapshot: input.caseSnapshot,
    originalGuesses: input.originalGuesses,
    originalCluesUsed: input.originalCluesUsed,
    reviewHistory: [],
    createdAt: now.toISOString(),
    dueAt: now.toISOString(),
    interval: 1,
    ease: 2.3,
    status: 'due',
  }

  return [newItem, ...items]
}

export function getDueReviewItems(items: ReviewItem[], now = new Date()): ReviewItem[] {
  const nowMs = now.getTime()

  return items
    .filter((item) => {
      const hasNeverBeenReviewed = (item.reviewHistory?.length ?? 0) === 0
      return item.status !== 'mastered' && (hasNeverBeenReviewed || new Date(item.dueAt).getTime() <= nowMs)
    })
    .sort((a, b) => new Date(a.dueAt).getTime() - new Date(b.dueAt).getTime())
}

export function gradeReviewItem(item: ReviewItem, isCorrect: boolean, guess?: string, now = new Date()): ReviewItem {
  const reviewEntry: ReviewHistoryEntry = {
    id: createId('review-log'),
    reviewedAt: now.toISOString(),
    guess: guess?.trim() || undefined,
    correct: isCorrect,
  }
  const reviewHistory = [reviewEntry, ...(item.reviewHistory ?? [])]

  if (isCorrect) {
    const newEase = Math.min(3, item.ease + 0.15)
    const newInterval = Math.max(2, Math.round(item.interval * newEase))
    const nextDue = addDays(now, newInterval)
    const status: ReviewItem['status'] = newInterval >= 12 ? 'mastered' : 'learning'

    return {
      ...item,
      reviewHistory,
      ease: newEase,
      interval: newInterval,
      dueAt: nextDue.toISOString(),
      status,
    }
  }

  return {
    ...item,
    reviewHistory,
    ease: Math.max(1.3, item.ease - 0.2),
    interval: 1,
    dueAt: addDays(now, 1).toISOString(),
    status: 'due',
  }
}
