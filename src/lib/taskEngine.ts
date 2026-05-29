import { disorderCategories } from '../data/disorders'
import { taskTemplates } from '../data/tasks'
import type { DailyTask, Difficulty, TaskTemplate } from '../types/models'

export type TaskEvent =
  | {
      type: 'case_completed'
      mode: 'daily' | 'practice'
      solved: boolean
      category: string
      difficulty: Difficulty
      cluesUsed: number
      score: number
    }
  | {
      type: 'review_completed'
      correct: boolean
    }
  | {
      type: 'explanation_reviewed'
    }

function toDateKey(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function toSeed(date: Date): number {
  return Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86_400_000)
}

function nextSeed(seed: number): number {
  return (seed * 1664525 + 1013904223) % 4294967296
}

function pickBySeed<T>(list: T[], seed: number): { value: T; seed: number } {
  const updatedSeed = nextSeed(seed)
  const index = updatedSeed % list.length
  return {
    value: list[index],
    seed: updatedSeed,
  }
}

function instantiateTask(
  template: TaskTemplate,
  dateKey: string,
  seed: number,
  order: number,
): { task: DailyTask; seed: number } {
  let workingSeed = seed
  let description = template.description
  let targetCategory: string | undefined
  let targetDifficulty: Difficulty | undefined

  if (template.requiresCategory) {
    const categoryPick = pickBySeed(disorderCategories, workingSeed)
    workingSeed = categoryPick.seed
    targetCategory = categoryPick.value
    description = `Resolva 1 caso da categoria ${targetCategory}.`
  }

  if (template.requiresDifficulty) {
    const difficulties: Difficulty[] = ['easy', 'medium', 'hard']
    const diffPick = pickBySeed(difficulties, workingSeed)
    workingSeed = diffPick.seed
    targetDifficulty = diffPick.value
    const labels: Record<Difficulty, string> = {
      easy: 'fácil',
      medium: 'médio',
      hard: 'difícil',
    }
    description = `Resolva 1 caso ${labels[targetDifficulty]}.`
  }

  return {
    seed: workingSeed,
    task: {
      id: `${dateKey}-${template.id}-${order}`,
      type: template.type,
      title: template.title,
      description,
      goal: template.goal,
      progress: 0,
      completed: false,
      claimed: false,
      rewardXp: template.rewardXp,
      rewardCoins: template.rewardCoins,
      date: dateKey,
      maxClues: template.maxClues,
      targetCategory,
      targetDifficulty,
    },
  }
}

export function generateDailyTasks(date: Date): DailyTask[] {
  const dateKey = toDateKey(date)
  let seed = toSeed(date)

  const mandatoryTemplate = taskTemplates.find((template) => template.type === 'complete_daily')
  const optionalTemplates = taskTemplates.filter((template) => template.type !== 'complete_daily')
  const selected: TaskTemplate[] = []

  if (mandatoryTemplate) {
    selected.push(mandatoryTemplate)
  }

  while (selected.length < 3 && optionalTemplates.length > 0) {
    const picked = pickBySeed(optionalTemplates, seed)
    seed = picked.seed
    const candidate = picked.value
    if (!selected.some((task) => task.id === candidate.id)) {
      selected.push(candidate)
    }
  }

  const result: DailyTask[] = []
  selected.forEach((template, index) => {
    const item = instantiateTask(template, dateKey, seed, index)
    seed = item.seed
    result.push(item.task)
  })

  return result
}

export function updateTaskProgress(tasks: DailyTask[], event: TaskEvent): DailyTask[] {
  return tasks.map((task) => {
    if (task.completed) {
      return task
    }

    let increment = 0

    if (event.type === 'case_completed') {
      if (task.type === 'complete_daily' && event.mode === 'daily') {
        increment = 1
      }

      if (task.type === 'practice_cases' && event.mode === 'practice') {
        increment = 1
      }

      if (task.type === 'solve_with_few_clues' && event.solved && event.cluesUsed <= (task.maxClues ?? 2)) {
        increment = 1
      }

      if (task.type === 'solve_category' && event.solved && task.targetCategory === event.category) {
        increment = 1
      }

      if (
        task.type === 'solve_difficulty' &&
        event.solved &&
        task.targetDifficulty &&
        task.targetDifficulty === event.difficulty
      ) {
        increment = 1
      }

      if (task.type === 'perfect_score' && event.solved && event.score === 100) {
        increment = 1
      }

      if (task.type === 'solve_any' && event.solved) {
        increment = 1
      }

      if (task.type === 'solve_practice' && event.solved && event.mode === 'practice') {
        increment = 1
      }
    }

    if (event.type === 'review_completed' && task.type === 'review_items') {
      increment = 1
    }

    if (event.type === 'explanation_reviewed' && task.type === 'read_explanation') {
      increment = 1
    }

    if (!increment) {
      return task
    }

    const progress = Math.min(task.goal, task.progress + increment)
    const completed = progress >= task.goal

    return {
      ...task,
      progress,
      completed,
    }
  })
}

export function claimTaskReward(tasks: DailyTask[], taskId: string): {
  tasks: DailyTask[]
  rewardXp: number
  rewardCoins: number
} {
  let rewardXp = 0
  let rewardCoins = 0

  const updatedTasks = tasks.map((task) => {
    if (task.id !== taskId || !task.completed || task.claimed) {
      return task
    }

    rewardXp = task.rewardXp
    rewardCoins = task.rewardCoins

    return {
      ...task,
      claimed: true,
    }
  })

  return {
    tasks: updatedTasks,
    rewardXp,
    rewardCoins,
  }
}
