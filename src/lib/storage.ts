import { isPlayableDisorder } from '../data/disorders'
import { getTodayKey } from './daily'
import { canonicalCategory } from './study'
import type { ActiveSession, DailyTask, ReviewItem, UserProgress } from '../types/models'

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

  const previousLevel = getUserProgress().level
  window.localStorage.setItem(KEYS.progress, JSON.stringify(progress))
  if (progress.level > previousLevel) {
    window.dispatchEvent(new CustomEvent<number>(LEVEL_UP_EVENT, { detail: progress.level }))
  }
}

/** Fired on `window` whenever saved progress reaches a higher level; `detail` is the new level. */
export const LEVEL_UP_EVENT = 'psidle:level-up'

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
  window.localStorage.removeItem(`${STORAGE_PREFIX}:session:daily`)
  window.localStorage.removeItem(`${STORAGE_PREFIX}:session:practice`)
  window.localStorage.removeItem(`${STORAGE_PREFIX}:practice-selection`)
}

function getSessionKey(mode: ActiveSession['mode'], caseDate?: string): string {
  return `${STORAGE_PREFIX}:session:${mode}${caseDate ? `:${caseDate}` : ''}`
}

/** Pass `caseDate` to read the in-progress session of a past daily case from the archive. */
export function getActiveSession(mode: ActiveSession['mode'], caseDate?: string): ActiveSession | null {
  const session = safeParse<ActiveSession | null>(localStorage.getItem(getSessionKey(mode, caseDate)), null)
  // Cases from the old generator are dropped so in-progress games restart with a rewritten case.
  if (!session || !session.caseData.tags?.includes('authored_v3') || !isPlayableDisorder(session.caseData.correctDisorderId)) return null
  return mode !== 'daily' || caseDate || session.date === getTodayKey() ? session : null
}

export function saveActiveSession(session: ActiveSession): void {
  localStorage.setItem(getSessionKey(session.mode, session.caseDate), JSON.stringify(session))
}

export function clearActiveSession(mode: ActiveSession['mode'], caseDate?: string): void {
  localStorage.removeItem(getSessionKey(mode, caseDate))
}

export function getPracticeSelection(): { category: string; difficulty: string; adaptive: boolean; servedIds: string[] } {
  const selection = safeParse(localStorage.getItem(`${STORAGE_PREFIX}:practice-selection`), {
    category: 'all', difficulty: 'all', adaptive: true, servedIds: [] as string[],
  })
  return { ...selection, category: selection.category === 'all' ? 'all' : canonicalCategory(selection.category) ?? 'all' }
}

export function savePracticeSelection(value: ReturnType<typeof getPracticeSelection>): void {
  localStorage.setItem(`${STORAGE_PREFIX}:practice-selection`, JSON.stringify(value))
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

const TUTORIAL_KEY = `${STORAGE_PREFIX}:tutorial-seen`

export function hasSeenTutorial(): boolean {
  try {
    return localStorage.getItem(TUTORIAL_KEY) === '1'
  } catch {
    return true
  }
}

export function markTutorialSeen(): void {
  try {
    localStorage.setItem(TUTORIAL_KEY, '1')
  } catch {
    // Storage unavailable: the tutorial will simply show again next visit.
  }
}

const SEEN_ACHIEVEMENTS_KEY = `${STORAGE_PREFIX}:achievements-seen`

/** Achievement ids the player has already seen on the profile, used to animate new unlocks once. */
export function getSeenAchievements(): string[] {
  try {
    return JSON.parse(localStorage.getItem(SEEN_ACHIEVEMENTS_KEY) ?? 'null') ?? []
  } catch {
    return []
  }
}

export function markAchievementsSeen(ids: string[]): void {
  try {
    localStorage.setItem(SEEN_ACHIEVEMENTS_KEY, JSON.stringify(ids))
  } catch {
    // Storage unavailable: new-unlock animations will simply replay.
  }
}
