import { getTodayKey } from './daily'
import type { DailyTask, ReviewItem, UserProgress } from '../types/models'

const STORAGE_PREFIX = 'psidle:v1'

const KEYS = {
  progress: `${STORAGE_PREFIX}:progress`,
  tasks: `${STORAGE_PREFIX}:tasks`,
  review: `${STORAGE_PREFIX}:review`,
}

const defaultProgress: UserProgress = {
  displayName: undefined,
  xp: 0,
  level: 1,
  coins: 0,
  streak: 0,
  lastPlayedDailyDate: undefined,
  playedCaseIds: [],
  attempts: [],
  achievements: [],
  unlockedThemes: [],
}

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) {
    return fallback
  }

  try {
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

function isBrowserReady(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
}

export function getUserProgress(): UserProgress {
  if (!isBrowserReady()) {
    return structuredClone(defaultProgress)
  }

  const parsed = safeParse<UserProgress>(window.localStorage.getItem(KEYS.progress), defaultProgress)

  return {
    ...defaultProgress,
    ...parsed,
    displayName: typeof parsed.displayName === 'string' ? parsed.displayName : undefined,
    attempts: Array.isArray(parsed.attempts) ? parsed.attempts : [],
    playedCaseIds: Array.isArray(parsed.playedCaseIds) ? parsed.playedCaseIds : [],
    achievements: Array.isArray(parsed.achievements) ? parsed.achievements : [],
    unlockedThemes: Array.isArray(parsed.unlockedThemes) ? parsed.unlockedThemes : [],
  }
}

export function saveUserProgress(progress: UserProgress): void {
  if (!isBrowserReady()) {
    return
  }

  window.localStorage.setItem(KEYS.progress, JSON.stringify(progress))
}

export function getDailyTasks(): DailyTask[] {
  if (!isBrowserReady()) {
    return []
  }

  const parsed = safeParse<DailyTask[]>(window.localStorage.getItem(KEYS.tasks), [])
  if (!Array.isArray(parsed)) {
    return []
  }

  return parsed
}

export function saveDailyTasks(tasks: DailyTask[]): void {
  if (!isBrowserReady()) {
    return
  }

  window.localStorage.setItem(KEYS.tasks, JSON.stringify(tasks))
}

export function getReviewItems(): ReviewItem[] {
  if (!isBrowserReady()) {
    return []
  }

  const parsed = safeParse<ReviewItem[]>(window.localStorage.getItem(KEYS.review), [])
  if (!Array.isArray(parsed)) {
    return []
  }

  return parsed
}

export function saveReviewItems(items: ReviewItem[]): void {
  if (!isBrowserReady()) {
    return
  }

  window.localStorage.setItem(KEYS.review, JSON.stringify(items))
}

export function clearAllLocalData(): void {
  if (!isBrowserReady()) {
    return
  }

  window.localStorage.removeItem(KEYS.progress)
  window.localStorage.removeItem(KEYS.tasks)
  window.localStorage.removeItem(KEYS.review)
}

export function ensureDailyTasksForToday(createTasks: () => DailyTask[]): DailyTask[] {
  const tasks = getDailyTasks()
  const todayKey = getTodayKey()

  if (!tasks.length || tasks.some((task) => task.date !== todayKey)) {
    const generated = createTasks()
    saveDailyTasks(generated)
    return generated
  }

  return tasks
}
