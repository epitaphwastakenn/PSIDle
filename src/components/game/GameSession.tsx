import { useEffect, useMemo, useState } from 'react'
import { disorders } from '../../data/disorders'
import type { Attempt, Case } from '../../types/models'
import { applyAchievementUnlocks } from '../../lib/achievementEngine'
import { getTodayKey } from '../../lib/daily'
import { findDisorderByGuess, isCorrectGuess } from '../../lib/guessing'
import {
  awardCoins,
  awardXp,
  getCompletionRewards,
  getDailySolveSpeedXpBonus,
  updateStreak,
} from '../../lib/rewards'
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
import { RewardToast } from '../common/RewardToast'
import { AttemptHistory } from './AttemptHistory'
import { CaseCard } from './CaseCard'
import { ClueList } from './ClueList'
import { GuessInput } from './GuessInput'
import { ResultPanel } from './ResultPanel'

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

type GuessFeedbackType = 'idle' | 'correct' | 'wrong'

interface GuessFeedbackState {
  type: GuessFeedbackType
  message: string
}

const DAILY_MAX_ERRORS = 5
const FEEDBACK_RESET_MS = 1800

function createId(prefix: string): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `${prefix}-${crypto.randomUUID()}`
  }

  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10_000)}`
}

function playGuessFeedbackSound(type: Exclude<GuessFeedbackType, 'idle'>): void {
  if (typeof window === 'undefined') {
    return
  }

  try {
    const audioWindow = window as Window & { webkitAudioContext?: typeof AudioContext }
    const AudioContextConstructor = window.AudioContext ?? audioWindow.webkitAudioContext
    if (!AudioContextConstructor) {
      return
    }

    const audioContext = new AudioContextConstructor()
    const now = audioContext.currentTime

    const playTone = (frequencyStart: number, frequencyEnd: number, startOffset: number, duration: number) => {
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.type = type === 'correct' ? 'triangle' : 'sawtooth'
      oscillator.frequency.setValueAtTime(frequencyStart, now + startOffset)
      oscillator.frequency.linearRampToValueAtTime(frequencyEnd, now + startOffset + duration)

      gainNode.gain.setValueAtTime(0.0001, now + startOffset)
      gainNode.gain.exponentialRampToValueAtTime(0.07, now + startOffset + 0.02)
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + startOffset + duration)

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      oscillator.start(now + startOffset)
      oscillator.stop(now + startOffset + duration)
    }

    if (type === 'correct') {
      playTone(560, 740, 0, 0.09)
      playTone(760, 960, 0.11, 0.09)
    } else {
      playTone(320, 210, 0, 0.18)
    }

    window.setTimeout(() => {
      audioContext.close().catch(() => undefined)
    }, 320)
  } catch {
    // no-op: sound feedback is optional
  }
}

export function GameSession({ caseData, mode, onComplete }: GameSessionProps) {
  const [guesses, setGuesses] = useState<string[]>([])
  const [wrongGuessesCount, setWrongGuessesCount] = useState(0)
  const [revealedCluesCount, setRevealedCluesCount] = useState(0)
  const [solved, setSolved] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [selectedGuess, setSelectedGuess] = useState('')
  const [result, setResult] = useState<SessionResult | null>(null)
  const [reviewAdded, setReviewAdded] = useState(false)
  const [explanationReviewed, setExplanationReviewed] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [showToast, setShowToast] = useState(false)
  const [guessFeedback, setGuessFeedback] = useState<GuessFeedbackState>({
    type: 'idle',
    message: '',
  })

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

  const maxWrongGuessesAllowed = mode === 'daily' ? DAILY_MAX_ERRORS : caseData.clues.length + 1

  useEffect(() => {
    if (guessFeedback.type === 'idle' || completed) {
      return
    }

    const timeout = window.setTimeout(() => {
      setGuessFeedback({ type: 'idle', message: '' })
    }, FEEDBACK_RESET_MS)

    return () => window.clearTimeout(timeout)
  }, [guessFeedback.type, completed])

  function pushToast(message: string) {
    setToastMessage(message)
    setShowToast(true)
  }

  function showGuessFeedback(type: Exclude<GuessFeedbackType, 'idle'>, message: string) {
    setGuessFeedback({ type, message })
    playGuessFeedbackSound(type)
  }

  function finalizeAttempt(
    attemptGuesses: string[],
    didSolve: boolean,
    finalCluesUsed: number,
    wrongGuesses: number,
    guessedDisorderId?: string,
  ) {
    if (!correctDisorder) {
      return
    }

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

    const speedBonusXp = mode === 'daily' && didSolve ? getDailySolveSpeedXpBonus(wrongGuesses) : 0

    progress = awardXp(progress, baseRewards.xp)
    progress = awardCoins(progress, baseRewards.coins)

    if (speedBonusXp > 0) {
      progress = awardXp(progress, speedBonusXp)
    }

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

    const totalXp = baseRewards.xp + speedBonusXp + achievementResult.rewardXp
    const totalCoins = baseRewards.coins + achievementResult.rewardCoins

    if (achievementResult.unlockedIds.length) {
      pushToast(`+${totalXp} XP e +${totalCoins} moedas. Nova conquista: ${achievementResult.unlockedIds.length}.`)
    } else if (speedBonusXp > 0) {
      pushToast(`+${totalXp} XP e +${totalCoins} moedas. Bonus de velocidade: +${speedBonusXp} XP.`)
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

    if (isCorrectGuess(guess, correctDisorder)) {
      const speedBonusXp = mode === 'daily' ? getDailySolveSpeedXpBonus(wrongGuessesCount) : 0
      const solvedMessage =
        mode === 'daily'
          ? `Resposta correta. Bonus por acerto cedo: +${speedBonusXp} XP.`
          : 'Resposta correta.'

      setGuesses(nextGuesses)
      showGuessFeedback('correct', solvedMessage)
      finalizeAttempt(nextGuesses, true, revealedCluesCount, wrongGuessesCount, guessedDisorder?.id)
      return
    }

    const nextWrongGuessesCount = wrongGuessesCount + 1
    const nextClues = Math.min(caseData.clues.length, revealedCluesCount + 1)

    setGuesses(nextGuesses)
    setSelectedGuess('')
    setWrongGuessesCount(nextWrongGuessesCount)
    setRevealedCluesCount(nextClues)

    if (mode === 'daily') {
      const remaining = Math.max(0, DAILY_MAX_ERRORS - nextWrongGuessesCount)
      if (remaining > 0) {
        showGuessFeedback('wrong', `Palpite incorreto. Restam ${remaining} erro(s) no caso diario.`)
      } else {
        showGuessFeedback('wrong', 'Limite de 5 erros atingido. Caso encerrado e enviado para revisao.')
      }
    } else {
      showGuessFeedback('wrong', 'Palpite incorreto. Uma nova pista foi liberada.')
    }

    if (nextWrongGuessesCount >= maxWrongGuessesAllowed) {
      finalizeAttempt(nextGuesses, false, nextClues, nextWrongGuessesCount, guessedDisorder?.id)
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
    pushToast('Caso adicionado a fila de revisao.')
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
    pushToast('+20 XP por revisar a explicacao.')
  }

  if (!correctDisorder) {
    return (
      <section className="panel p-4 text-sm text-[color:var(--danger)]">
        Nao foi possivel carregar o caso.
      </section>
    )
  }

  const dailyHelperText =
    mode === 'daily' && !completed
      ? `Erros no caso diario: ${wrongGuessesCount}/${DAILY_MAX_ERRORS} (maximo de ${DAILY_MAX_ERRORS})`
      : undefined

  return (
    <div className="space-y-4">
      <CaseCard caseData={caseData} />
      <GuessInput
        value={selectedGuess}
        options={disorders.map((disorder) => disorder.namePt)}
        disabled={completed}
        helperText={dailyHelperText}
        feedbackType={guessFeedback.type}
        feedbackMessage={guessFeedback.message}
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
