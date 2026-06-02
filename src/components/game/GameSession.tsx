import { useEffect, useMemo, useRef, useState } from 'react'
import { disorders } from '../../data/disorders'
import type { Attempt, Case } from '../../types/models'
import { applyAchievementUnlocks } from '../../lib/achievementEngine'
import { audioManager } from '../../lib/audio'
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
import type { RewardToastVariant } from '../common/RewardToast'
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
  const [toastTitle, setToastTitle] = useState('')
  const [toastVariant, setToastVariant] = useState<RewardToastVariant>('reward')
  const [toastKey, setToastKey] = useState(0)
  const [showToast, setShowToast] = useState(false)
  const [guessFeedback, setGuessFeedback] = useState<GuessFeedbackState>({
    type: 'idle',
    message: '',
  })
  const [guessFeedbackKey, setGuessFeedbackKey] = useState(0)
  const resultRef = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    if (!(mode === 'practice' && completed && !solved && result)) {
      return
    }

    const frame = window.requestAnimationFrame(() => {
      resultRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    })

    return () => window.cancelAnimationFrame(frame)
  }, [mode, completed, solved, result])

  function pushToast(
    message: string,
    variant: RewardToastVariant = 'reward',
    title = '',
  ) {
    setToastTitle(title)
    setToastVariant(variant)
    setToastMessage(message)
    setToastKey((current) => current + 1)
    setShowToast(true)
  }

  function showGuessFeedback(type: Exclude<GuessFeedbackType, 'idle'>, message: string) {
    setGuessFeedback({ type, message })
    setGuessFeedbackKey((current) => current + 1)
    if (type === 'correct') {
      audioManager.playCorrect()
    } else {
      audioManager.playWrong()
    }
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
        originalGuesses: attemptGuesses,
        originalCluesUsed: finalCluesUsed,
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
      pushToast(
        `+${totalXp} XP e +${totalCoins} moedas. Nova conquista: ${achievementResult.unlockedIds.length}.`,
        'reward',
        'Conquista liberada',
      )
    } else if (speedBonusXp > 0) {
      pushToast(
        `+${totalXp} XP e +${totalCoins} moedas. Bonus de velocidade: +${speedBonusXp} XP.`,
        'success',
        'Acerto veloz',
      )
    } else if (didSolve) {
      pushToast(`+${totalXp} XP e +${totalCoins} moedas recebidos.`, 'success', 'Caso resolvido')
    } else {
      pushToast(`+${totalXp} XP e +${totalCoins} moedas recebidos.`, 'review', 'Caso enviado para revisao')
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

    audioManager.playClick()
    const reviewItems = addReviewItem(getReviewItems(), {
      caseId: caseData.id,
      correctDisorderId: caseData.correctDisorderId,
      caseSnapshot: caseData,
      originalGuesses: guesses,
      originalCluesUsed: revealedCluesCount,
    })
    saveReviewItems(reviewItems)
    setReviewAdded(true)
    pushToast('Caso adicionado a fila de revisao.', 'review', 'Revisao atualizada')
  }

  function handleReviewExplanation() {
    if (explanationReviewed || !completed || !result) {
      return
    }

    audioManager.playClick()
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
    pushToast('+20 XP por revisar a explicacao.', 'reward', 'Explicacao revisada')
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

  const guessesRemaining = Math.max(0, maxWrongGuessesAllowed - wrongGuessesCount)
  const clueProgressLabel = `${revealedCluesCount}/${caseData.clues.length}`
  const modeLabel = mode === 'daily' ? 'Caso diario' : 'Modo treino'
  const difficultyLabel: Record<Case['difficulty'], string> = {
    easy: 'Facil',
    medium: 'Media',
    hard: 'Dificil',
  }

  return (
    <div className="space-y-5">
      <section className="panel session-hero p-4 md:p-5">
        <div className="session-hero-grid">
          <div>
            <p className="session-eyebrow">{modeLabel}</p>
            <h2 className="page-title mt-2 text-2xl md:text-3xl">Foco da rodada</h2>
            <p className="page-subtitle mt-2 text-sm leading-relaxed">
              Leia a vinheta, identifique o nucleo do quadro e acompanhe pistas, palpites e resultado em um fluxo unico.
            </p>
          </div>
          <div className="session-stat-grid">
            <div className="mini-stat">
              <span className="mini-stat-label">Categoria</span>
              <span className="mini-stat-value text-base md:text-lg">{caseData.category}</span>
            </div>
            <div className="mini-stat">
              <span className="mini-stat-label">Dificuldade</span>
              <span className="mini-stat-value text-base md:text-lg">{difficultyLabel[caseData.difficulty]}</span>
            </div>
            <div className="mini-stat">
              <span className="mini-stat-label">{mode === 'daily' ? 'Erros restantes' : 'Tentativas restantes'}</span>
              <span className="mini-stat-value text-base md:text-lg">{guessesRemaining}</span>
            </div>
            <div className="mini-stat">
              <span className="mini-stat-label">Pistas abertas</span>
              <span className="mini-stat-value text-base md:text-lg">{clueProgressLabel}</span>
            </div>
          </div>
        </div>
      </section>

      <div className="game-layout-grid">
        <div className="space-y-4">
          <CaseCard caseData={caseData} />
          <GuessInput
            value={selectedGuess}
            options={disorders.map((disorder) => disorder.namePt)}
            disabled={completed}
            helperText={dailyHelperText}
            feedbackType={guessFeedback.type}
            feedbackMessage={guessFeedback.message}
            feedbackPulseKey={guessFeedbackKey}
            onChange={setSelectedGuess}
            onSubmit={handleSubmitGuess}
          />

          {result ? (
            <div ref={resultRef} className="result-anchor">
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
            </div>
          ) : null}
        </div>

        <aside className="space-y-4">
          <ClueList clues={caseData.clues} revealedCluesCount={revealedCluesCount} />
          <AttemptHistory guesses={guesses} />
        </aside>
      </div>

      <RewardToast
        key={toastKey}
        show={showToast}
        message={toastMessage}
        title={toastTitle}
        variant={toastVariant}
        onClose={() => setShowToast(false)}
      />
    </div>
  )
}
