export interface ScoreInput {
  solved: boolean
  cluesUsed: number
  wrongGuesses: number
}

export interface ScoreResult {
  score: number
  baseScore: number
  penalty: number
}

const CLUE_BASE_SCORE = [100, 80, 60, 40, 25]

export function calculateScore(input: ScoreInput): ScoreResult {
  if (!input.solved) {
    return {
      score: 0,
      baseScore: 0,
      penalty: 0,
    }
  }

  const clueIndex = Math.max(0, Math.min(input.cluesUsed, CLUE_BASE_SCORE.length - 1))
  const baseScore = CLUE_BASE_SCORE[clueIndex]
  const penalty = Math.max(0, input.wrongGuesses) * 5
  const score = Math.max(10, baseScore - penalty)

  return {
    score,
    baseScore,
    penalty,
  }
}
