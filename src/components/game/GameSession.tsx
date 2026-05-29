import { useMemo, useState } from 'react'
import { disorders } from '../../data/disorders'
import type { Attempt, Case } from '../../types/models'
import { applyAchievementUnlocks } from '../../lib/achievementEngine'
import { getTodayKey } from '../../lib/daily'
import { findDisorderByGuess, isCorrectGuess } from '../../lib/guessing'
import { awardCoins, awardXp, getCompletionRewards, updateStreak } from '../../lib/rewards'
import { addReviewItem } from '../../lib/review'
import { calculateScore } from '../../lib/scoring'
import {
  ensureDailyTasksForToday,
  getReviewItems,
  getUserProgress,
  saveDailyTasks,
  saveReviewItems,
  saveUserProgress,
} from '../../lib/storage'
import { generateDailyTasks, updateTaskProgress } from '../../lib/taskEngine'
import { AttemptHistory } from './AttemptHistory'
import { CaseCard } from './CaseCard'
import { ClueList } from './ClueList'
import { GuessInput } from './GuessInput'
import { ResultPanel } from './ResultPanel'
import { RewardToast } from '../common/RewardToast'

interface GameSessionProps {
  caseData: Case
  mode: 'daily' | 'practice'
  onComplete?: (attempt: Attempt) => void
}

interface SessionResult {
  score: number
  xpGained: number
  coinsGained: number
}

function createId(prefix: string): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `${prefix}-${crypto.randomUUID()}`
  }

  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10_000)}`
}

export function GameSession({ caseData, mode, onComplete }: GameSessionProps) {
  const [guesses, setGuesses] = useState<string[]>([])
  const [revealedCluesCount, setRevealedCluesCount] = useState(0)
  const [solved, setSolved] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [selectedGuess, setSelectedGuess] = useState('')
  const [result, setResult] = useState<SessionResult | null>(null)
  const [reviewAdded, setReviewAdded] = useState(false)
  const [explanationReviewed, setExplanationReviewed] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [showToast, setShowToast] = useState(false)

  const correctDisorder = useMemo(
    () => disorders.find((disorder) => disorder.id === caseData.correctDisorderId),
    [caseData.correctDisorderId],
  )

  const differentialItems = useMemo(
    () =>
      caseData.differentials.map((item) => {
        const disorder = disorders.find((entry) => entry.id === item.disorderId)
        return {
          disorderName: disorder?.namePt ?? item.disorderId,
          whyNot: item.whyNot,
        }
      }),
    [caseData.differentials],
  )

  function pushToast(message: string) {
    setToastMessage(message)
    setShowToast(true)
  }

  function finalizeAttempt(
    attemptGuesses: string[],
    didSolve: boolean,
    finalCluesUsed: number,
    guessedDisorderId?: string,
  ) {
    if (!correctDisorder) {
      return
    }

    const wrongGuesses = didSolve ? Math.max(0, attemptGuesses.length - 1) : attemptGuesses.length
    const scoreResult = calculateScore({
      solved: didSolve,
      cluesUsed: finalCluesUsed,
      wrongGuesses,
    })

    const attempt: Attempt = {
      id: createId('attempt'),
      caseId: caseData.id,
      mode,
      date: getTodayKey(),
      guesses: attemptGuesses,
      solved: didSolve,
      score: scoreResult.score,
      cluesUsed: finalCluesUsed,
      caseCategory: caseData.category,
      caseDifficulty: caseData.difficulty,
    }

    let progress = getUserProgress()
    progress = {
      ...progress,
      attempts: [...progress.attempts, attempt],
      playedCaseIds: progress.playedCaseIds.includes(caseData.id)
        ? progress.playedCaseIds
        : [...progress.playedCaseIds, caseData.id],
    }

    if (mode === 'daily') {
      progress = updateStreak(progress)
    }

    const baseRewards = getCompletionRewards({
      mode,
      solved: didSolve,
      score: scoreResult.score,
      explanationReviewed: false,
    })
    progress = awardXp(progress, baseRewards.xp)
    progress = awardCoins(progress, baseRewards.coins)

    let reviewItems = getReviewItems()

    if (!didSolve) {
      reviewItems = addReviewItem(reviewItems, {
        caseId: caseData.id,
        correctDisorderId: caseData.correctDisorderId,
        guessedDisorderId,
        caseSnapshot: caseData,
      })
      saveReviewItems(reviewItems)
      setReviewAdded(true)
    }

    const todaysTasks = ensureDailyTasksForToday(() => generateDailyTasks(new Date()))
    const updatedTasks = updateTaskProgress(todaysTasks, {
      type: 'case_completed',
      mode,
      solved: didSolve,
      category: caseData.category,
      difficulty: caseData.difficulty,
      cluesUsed: finalCluesUsed,
      score: scoreResult.score,
    })
    saveDailyTasks(updatedTasks)

    const achievementResult = applyAchievementUnlocks(progress, reviewItems)
    progress = achievementResult.progress

    if (achievementResult.rewardXp) {
      progress = awardXp(progress, achievementResult.rewardXp)
    }
    if (achievementResult.rewardCoins) {
      progress = awardCoins(progress, achievementResult.rewardCoins)
    }

    saveUserProgress(progress)

    const totalXp = baseRewards.xp + achievementResult.rewardXp
    const totalCoins = baseRewards.coins + achievementResult.rewardCoins

    if (achievementResult.unlockedIds.length) {
      pushToast(
        `+${totalXp} XP e +${totalCoins} moedas. Nova conquista desbloqueada: ${achievementResult.unlockedIds.length}.`,
      )
    } else {
      pushToast(`+${totalXp} XP e +${totalCoins} moedas recebidos.`)
    }

    setResult({
      score: scoreResult.score,
      xpGained: totalXp,
      coinsGained: totalCoins,
    })
    setSolved(didSolve)
    setCompleted(true)
    setSelectedGuess('')
    onComplete?.(attempt)
  }

  function handleSubmitGuess() {
    if (completed || !correctDisorder) {
      return
    }

    const guess = selectedGuess.trim()
    if (!guess) {
      return
    }

    const guessedDisorder = findDisorderByGuess(guess, disorders)
    const guessLabel = guessedDisorder?.namePt ?? guess
    const nextGuesses = [...guesses, guessLabel]
    const maxGuesses = caseData.clues.length + 1

    if (isCorrectGuess(guess, correctDisorder)) {
      setGuesses(nextGuesses)
      finalizeAttempt(nextGuesses, true, revealedCluesCount, guessedDisorder?.id)
      return
    }

    const nextClues = Math.min(caseData.clues.length, revealedCluesCount + 1)

    setGuesses(nextGuesses)
    setSelectedGuess('')
    setRevealedCluesCount(nextClues)

    if (nextGuesses.length >= maxGuesses) {
      finalizeAttempt(nextGuesses, false, nextClues, guessedDisorder?.id)
    }
  }

  function handleAddToReview() {
    if (reviewAdded) {
      return
    }

    const reviewItems = addReviewItem(getReviewItems(), {
      caseId: caseData.id,
      correctDisorderId: caseData.correctDisorderId,
      caseSnapshot: caseData,
    })
    saveReviewItems(reviewItems)
    setReviewAdded(true)
    pushToast('Caso adicionado à fila de revisão.')
  }

  function handleReviewExplanation() {
    if (explanationReviewed || !completed || !result) {
      return
    }

    let progress = getUserProgress()
    progress = awardXp(progress, 20)
    saveUserProgress(progress)

    const todaysTasks = ensureDailyTasksForToday(() => generateDailyTasks(new Date()))
    const updatedTasks = updateTaskProgress(todaysTasks, { type: 'explanation_reviewed' })
    saveDailyTasks(updatedTasks)

    setExplanationReviewed(true)
    setResult({
      ...result,
      xpGained: result.xpGained + 20,
    })
    pushToast('+20 XP por revisar a explicação.')
  }

  if (!correctDisorder) {
    return (
      <section className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        Não foi possível carregar o caso.
      </section>
    )
  }

  return (
    <div className="space-y-4">
      <CaseCard caseData={caseData} />
      <GuessInput
        value={selectedGuess}
        options={disorders.map((disorder) => disorder.namePt)}
        disabled={completed}
        onChange={setSelectedGuess}
        onSubmit={handleSubmitGuess}
      />

      <div className="grid gap-4 md:grid-cols-2">
        <ClueList clues={caseData.clues} revealedCluesCount={revealedCluesCount} />
        <AttemptHistory guesses={guesses} />
      </div>

      {result ? (
        <ResultPanel
          solved={solved}
          score={result.score}
          correctDisorderName={correctDisorder.namePt}
          explanation={caseData.explanation}
          differentials={differentialItems}
          xpGained={result.xpGained}
          coinsGained={result.coinsGained}
          onAddToReview={handleAddToReview}
          onReviewExplanation={handleReviewExplanation}
          addedToReview={reviewAdded}
          explanationReviewed={explanationReviewed}
        />
      ) : null}

      <RewardToast show={showToast} message={toastMessage} onClose={() => setShowToast(false)} />
    </div>
  )
}
