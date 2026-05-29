export type Difficulty = 'easy' | 'medium' | 'hard'

export interface Disorder {
  id: string
  namePt: string
  nameOriginal?: string
  category: string
  aliases: string[]
  shortSummary: string
  studyNote: string
  difficulty: Difficulty
}

export type CaseClueType =
  | 'chief_complaint'
  | 'symptoms'
  | 'duration'
  | 'impairment'
  | 'exclusion'
  | 'differential'

export interface CaseClue {
  id: string
  order: number
  type: CaseClueType
  text: string
}

export interface CaseDifferential {
  disorderId: string
  whyNot: string
}

export interface Case {
  id: string
  title: string
  category: string
  difficulty: Difficulty
  vignette: string
  correctDisorderId: string
  clues: CaseClue[]
  explanation: string
  differentials: CaseDifferential[]
  tags: string[]
  sourceNote?: string
  status: 'approved' | 'draft'
}

export interface Attempt {
  id: string
  caseId: string
  mode: 'daily' | 'practice'
  date: string
  guesses: string[]
  solved: boolean
  score: number
  cluesUsed: number
}

export interface UserProgress {
  xp: number
  level: number
  coins: number
  streak: number
  lastPlayedDailyDate?: string
  playedCaseIds: string[]
  attempts: Attempt[]
  achievements: string[]
  unlockedThemes: string[]
}

export interface DailyTask {
  id: string
  type: string
  title: string
  description: string
  goal: number
  progress: number
  completed: boolean
  claimed: boolean
  rewardXp: number
  rewardCoins: number
  date: string
  targetCategory?: string
  targetDifficulty?: Difficulty
  maxClues?: number
}

export interface ReviewItem {
  id: string
  caseId: string
  correctDisorderId: string
  guessedDisorderId?: string
  createdAt: string
  dueAt: string
  interval: number
  ease: number
  status: 'due' | 'learning' | 'mastered'
}

export interface Achievement {
  id: string
  title: string
  description: string
  conditionKey: string
  rewardXp: number
  rewardCoins: number
}

export interface TaskTemplate {
  id: string
  type: string
  title: string
  description: string
  goal: number
  rewardXp: number
  rewardCoins: number
  requiresCategory?: boolean
  requiresDifficulty?: boolean
  maxClues?: number
}
