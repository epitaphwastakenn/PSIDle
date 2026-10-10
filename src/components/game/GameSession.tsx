import { useEffect, useMemo, useRef, useState } from 'react'
import { disorders, findDisorder } from '../../data/disorders'
import type { Attempt, Case } from '../../types/models'
import { applyAchievementUnlocks } from '../../lib/achievementEngine'
import { audioManager } from '../../lib/audio'
import { ARCHIVE_REWARD_FACTOR, getAttemptDayKey, getTodayKey, parseDayKey } from '../../lib/daily'
import { buildShareText, getGuessTone, toneTileClass } from '../../lib/feedback'
import { findDisorderByGuess, isCorrectGuess } from '../../lib/guessing'
import { normalizeText } from '../../lib/normalize'
import { difficultyLabels } from '../../lib/study'
import {
  awardCoins,
  awardXp,
  getCompletionRewards,
  getDailySolveSpeedXpBonus,
  getPracticeRewardFactor,
  updateStreak,
} from '../../lib/rewards'
import { addReviewItem } from '../../lib/review'
import { calculateScore, getHintCost } from '../../lib/scoring'
import {
  ensureDailyTasksForToday,
  getActiveSession,
  saveActiveSession,
  clearActiveSession,
  getReviewItems,
  getUserProgress,
  saveDailyTasks,
  saveReviewItems,
  saveUserProgress,
} from '../../lib/storage'
import { generateDailyTasks, updateTaskProgress } from '../../lib/taskEngine'
import { Icon } from '../common/Icon'
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
  onNext?: () => void
  /** Day key (YYYY-MM-DD) of a past daily case being played from the archive. */
  caseDate?: string
}

interface SessionResult {
  score: number
  xpGained: number
  coinsGained: number
}

type GuessFeedbackType = 'idle' | 'correct' | 'near' | 'wrong'

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

export function GameSession({ caseData, mode, onComplete, onNext, caseDate }: GameSessionProps) {
  const dayKey = caseDate ?? getTodayKey()
  const archiveDate = mode === 'daily' && dayKey !== getTodayKey() ? dayKey : undefined
  const [savedAttempt] = useState(() => getUserProgress().attempts.findLast(
    (attempt) => attempt.mode === mode && attempt.caseId === caseData.id && (mode !== 'daily' || getAttemptDayKey(attempt) === dayKey),
  ))
  const [draft] = useState(() => {
    const session = getActiveSession(mode, archiveDate)
    return session?.caseData.id === caseData.id ? session : null
  })
  const [guesses, setGuesses] = useState<string[]>(savedAttempt?.guesses ?? draft?.guesses ?? [])
  const [wrongGuessesCount, setWrongGuessesCount] = useState(savedAttempt ? savedAttempt.guesses.length - Number(savedAttempt.solved) : draft?.wrongGuessesCount ?? 0)
  const [revealedCluesCount, setRevealedCluesCount] = useState(savedAttempt?.cluesUsed ?? draft?.cluesUsed ?? 0)
  const [solved, setSolved] = useState(savedAttempt?.solved ?? false)
  const [completed, setCompleted] = useState(Boolean(savedAttempt))
  const [selectedGuess, setSelectedGuess] = useState('')
  const [result, setResult] = useState<SessionResult | null>(savedAttempt ? {
    score: savedAttempt.score, xpGained: savedAttempt.xpGained ?? 0, coinsGained: savedAttempt.coinsGained ?? 0,
  } : null)
  const [reviewAdded, setReviewAdded] = useState(() => getReviewItems().some((item) => item.caseId === caseData.id))
  const [explanationReviewed, setExplanationReviewed] = useState(savedAttempt?.explanationReviewed ?? false)
  const [validationMessage, setValidationMessage] = useState('')
  const completionLock = useRef(Boolean(savedAttempt))
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
    () => findDisorder(caseData.correctDisorderId),
    [caseData.correctDisorderId],
  )

  const differentialItems = useMemo(
    () =>
      caseData.differentials.map((item) => {
        const disorder = findDisorder(item.disorderId)
        return {
          disorderName: disorder?.namePt ?? item.disorderId,
          whyNot: item.whyNot,
        }
      }),
    [caseData.differentials],
  )

  const maxWrongGuessesAllowed = mode === 'daily' ? DAILY_MAX_ERRORS : caseData.clues.length + 1

  useEffect(() => {
    if (!completed) saveActiveSession({
      caseData, mode, date: getTodayKey(), caseDate: archiveDate, guesses, wrongGuessesCount, cluesUsed: revealedCluesCount,
    })
  }, [caseData, mode, archiveDate, completed, guesses, wrongGuessesCount, revealedCluesCount])

  useEffect(() => {
    if (guessFeedback.type === 'idle' || completed) {
      return
    }

    const timeout = window.setTimeout(() => {
      setGuessFeedback({ type: 'idle', message: '' })
    }, FEEDBACK_RESET_MS)

    return () => window.clearTimeout(timeout)
  }, [guessFeedback.type, guessFeedbackKey, completed])

  useEffect(() => {
    if (!completed || !result || savedAttempt) {
      return
    }

    const frame = window.requestAnimationFrame(() => {
      resultRef.current?.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
        block: 'start',
      })
    })

    return () => window.cancelAnimationFrame(frame)
  }, [completed, result, savedAttempt])

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
    navigator.vibrate?.(type === 'correct' ? [30, 60, 30] : type === 'near' ? 40 : 90)
  }

  function handleHint() {
    if (completed || revealedCluesCount >= caseData.clues.length) return
    audioManager.playClick()
    setRevealedCluesCount(revealedCluesCount + 1)
  }

  async function handleShareImage() {
    audioManager.playClick()
    try {
      const { renderStoryImage } = await import('../../lib/three/storyImage')
      const blob = await renderStoryImage({
        tones: guesses.map((guess) => getGuessTone(guess, correctDisorder!)),
        slots: maxWrongGuessesAllowed,
        solved,
        date: parseDayKey(dayKey) ?? new Date(),
        url: `${window.location.origin}${window.location.pathname}`,
      })
      const file = new File([blob], `psidle-${dayKey}.png`, { type: 'image/png' })
      if (navigator.canShare?.({ files: [file] }) && window.matchMedia('(pointer: coarse)').matches) {
        await navigator.share({ files: [file] })
        return
      }
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = file.name
      link.click()
      window.setTimeout(() => URL.revokeObjectURL(link.href), 4000)
      pushToast('Imagem salva nos downloads.', 'info', 'Pronto para os stories')
    } catch (error) {
      if ((error as Error).name !== 'AbortError') pushToast('Não foi possível gerar a imagem.', 'danger', 'Erro')
    }
  }

  async function handleShare() {
    const text = buildShareText({
      date: parseDayKey(dayKey) ?? new Date(),
      tones: guesses.map((guess) => getGuessTone(guess, correctDisorder!)),
      solved,
      maxAttempts: maxWrongGuessesAllowed,
      url: `${window.location.origin}${window.location.pathname}`,
    })
    audioManager.playClick()
    try {
      if (navigator.share && window.matchMedia('(pointer: coarse)').matches) {
        await navigator.share({ text })
        return
      }
      await navigator.clipboard.writeText(text)
      pushToast('Cole onde quiser.', 'info', 'Resultado copiado')
    } catch (error) {
      if ((error as Error).name !== 'AbortError') pushToast('Não foi possível copiar.', 'danger', 'Erro')
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
    if (completionLock.current) return
    completionLock.current = true
    const existing = getUserProgress().attempts.find((attempt) =>
      mode === 'daily' ? attempt.mode === 'daily' && getAttemptDayKey(attempt) === dayKey : attempt.caseId === caseData.id,
    )
    if (existing) {
      setResult({ score: existing.score, xpGained: existing.xpGained ?? 0, coinsGained: existing.coinsGained ?? 0 })
      setSolved(existing.solved)
      setCompleted(true)
      clearActiveSession(mode, archiveDate)
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
      caseDate: archiveDate,
      guesses: attemptGuesses,
      solved: didSolve,
      score: scoreResult.score,
      cluesUsed: finalCluesUsed,
      caseCategory: caseData.category,
      caseDifficulty: caseData.difficulty,
      correctDisorderId: caseData.correctDisorderId,
      caseSnapshot: caseData,
    }

    let progress = getUserProgress()
    attempt.rewardFactor = mode === 'practice' ? getPracticeRewardFactor(progress.attempts, caseData.correctDisorderId, attempt.date) : archiveDate ? ARCHIVE_REWARD_FACTOR : 1
    progress = {
      ...progress,
      attempts: [...progress.attempts, attempt],
      playedCaseIds: progress.playedCaseIds.includes(caseData.id)
        ? progress.playedCaseIds
        : [...progress.playedCaseIds, caseData.id],
    }

    if (mode === 'daily' && !archiveDate) {
      progress = updateStreak(progress)
    }

    const baseRewards = getCompletionRewards({
      mode,
      solved: didSolve,
      score: scoreResult.score,
      explanationReviewed: false,
    })
    baseRewards.xp = Math.floor(baseRewards.xp * attempt.rewardFactor)
    baseRewards.coins = Math.floor(baseRewards.coins * attempt.rewardFactor)

    const speedBonusXp = mode === 'daily' && !archiveDate && didSolve ? getDailySolveSpeedXpBonus(wrongGuesses) : 0

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
      mode: archiveDate ? 'practice' : mode,
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

    const totalXp = baseRewards.xp + speedBonusXp + achievementResult.rewardXp
    const totalCoins = baseRewards.coins + achievementResult.rewardCoins
    attempt.xpGained = totalXp
    attempt.coinsGained = totalCoins
    saveUserProgress(progress)
    clearActiveSession(mode, archiveDate)

    if (achievementResult.unlockedIds.length) {
      pushToast(
        `+${totalXp} XP e +${totalCoins} moedas. Nova conquista: ${achievementResult.unlockedIds.length}.`,
        'reward',
        'Conquista liberada',
      )
    } else if (speedBonusXp > 0) {
      pushToast(
        `+${totalXp} XP e +${totalCoins} moedas. Bônus de velocidade: +${speedBonusXp} XP.`,
        'success',
        'Acerto veloz',
      )
    } else if (didSolve) {
      pushToast(`+${totalXp} XP e +${totalCoins} moedas recebidos.`, 'success', 'Caso resolvido')
    } else {
      pushToast(`+${totalXp} XP e +${totalCoins} moedas recebidos.`, 'review', 'Caso enviado para revisão')
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
    if (!guessedDisorder) {
      setValidationMessage('Escolha uma opção da lista.')
      return
    }
    const guessLabel = guessedDisorder?.namePt ?? guess
    if (guesses.some((previous) => normalizeText(previous) === normalizeText(guessLabel))) {
      setValidationMessage('Você já tentou essa.')
      return
    }
    setValidationMessage('')
    const nextGuesses = [...guesses, guessLabel]

    if (isCorrectGuess(guess, correctDisorder)) {
      const speedBonusXp = mode === 'daily' && !archiveDate ? getDailySolveSpeedXpBonus(wrongGuessesCount) : 0
      const solvedMessage =
        speedBonusXp > 0
          ? `Correto! +${speedBonusXp} XP de bônus.`
          : 'Correto!'

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

    const near = getGuessTone(guessLabel, correctDisorder) === 'near'
    if (nextWrongGuessesCount >= maxWrongGuessesAllowed) {
      showGuessFeedback(near ? 'near' : 'wrong', 'Tentativas esgotadas.')
    } else {
      const clueNote = nextClues > revealedCluesCount ? ' Nova pista liberada.' : ''
      showGuessFeedback(near ? 'near' : 'wrong', near ? `Mesma família, diagnóstico diferente.${clueNote}` : `Outra família diagnóstica.${clueNote}`)
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
    pushToast('Caso adicionado à fila de revisão.', 'review', 'Revisão atualizada')
  }

  function handleReviewExplanation() {
    if (explanationReviewed || !completed || !result) {
      return
    }

    audioManager.playClick()
    let progress = getUserProgress()
    const attempt = progress.attempts.findLast((item) => item.caseId === caseData.id)
    if (!attempt || attempt.explanationReviewed) return
    const explanationXp = Math.floor(20 * (attempt.rewardFactor ?? 1))
    progress = awardXp(progress, explanationXp)
    progress = { ...progress, attempts: progress.attempts.map((item) => item.id === attempt.id
      ? { ...item, explanationReviewed: true, xpGained: (item.xpGained ?? 0) + explanationXp } : item) }
    saveUserProgress(progress)

    const todaysTasks = ensureDailyTasksForToday(() => generateDailyTasks(new Date()))
    const updatedTasks = updateTaskProgress(todaysTasks, { type: 'explanation_reviewed' })
    saveDailyTasks(updatedTasks)

    setExplanationReviewed(true)
    setResult({
      ...result,
      xpGained: result.xpGained + explanationXp,
    })
    pushToast(explanationXp ? `+${explanationXp} XP.` : 'Registrada no histórico.', 'reward', 'Explicação lida')
  }

  if (!correctDisorder) {
    return (
      <section className="callout callout-warn">
        Não foi possível carregar o caso.
      </section>
    )
  }

  const guessesRemaining = Math.max(0, maxWrongGuessesAllowed - wrongGuessesCount)
  const modeLabel = mode === 'daily' ? 'Caso diário' : 'Treino'
  const sortedClues = caseData.clues.toSorted((a, b) => a.order - b.order)
  const tones = guesses.map((guess) => getGuessTone(guess, correctDisorder))
  const canHint = !completed && revealedCluesCount < caseData.clues.length

  return (
    <div className="page-stack" style={{ gap: 20 }}>
      <section className="card session-bar" aria-label="Progresso da partida">
        <div className="session-bar-group">
          <span className="tag tag-accent"><Icon name={mode === 'daily' ? 'target' : 'shuffle'} />{modeLabel}</span>
          <span className="tag">{difficultyLabels[caseData.difficulty]}</span>
        </div>
        <div className="session-bar-group">
          <span className="attempt-tiles" aria-label={`${guessesRemaining} tentativas restantes`}>
            {Array.from({ length: maxWrongGuessesAllowed }, (_, i) => {
              const tone = tones[i]
              return <span key={i} className={tone ? `tile tile-flip ${toneTileClass[tone]}` : 'tile'}>{tone ? <Icon name={tone === 'ok' ? 'check' : 'x'} /> : null}</span>
            })}
          </span>
          <span className="small muted">{completed ? 'Concluído' : `${guessesRemaining} ${guessesRemaining === 1 ? 'tentativa' : 'tentativas'}`}</span>
        </div>
      </section>

      <div className="game-grid">
        <div className="game-main">
          <CaseCard caseData={caseData} revealCategory={completed} />
          {!completed && revealedCluesCount > 0 && (
            <div key={revealedCluesCount} className="callout mobile-clue clue-reveal">
              <p className="kicker mb-1">Pista {revealedCluesCount}</p>
              <p style={{ color: 'var(--text)' }}>{sortedClues[revealedCluesCount - 1].text}</p>
            </div>
          )}
          <GuessInput
            value={selectedGuess}
            options={disorders}
            disabled={completed}
            feedbackType={guessFeedback.type}
            feedbackMessage={guessFeedback.message}
            feedbackPulseKey={guessFeedbackKey}
            validationMessage={validationMessage}
            onChange={(value) => { setSelectedGuess(value); setValidationMessage('') }}
            onSubmit={handleSubmitGuess}
            onHint={canHint ? handleHint : undefined}
            hintCost={canHint ? getHintCost(revealedCluesCount) : undefined}
          />

          {result ? (
            <div ref={resultRef} className="scroll-anchor grid gap-3">
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
                onShare={mode === 'daily' ? handleShare : undefined}
                onShareImage={mode === 'daily' ? handleShareImage : undefined}
                showCountdown={mode === 'daily' && !archiveDate}
                tones={tones}
                slots={maxWrongGuessesAllowed}
                reference={caseData.reference}
              />
              {mode === 'practice' && <p className="small muted">Repetir a mesma hipótese no dia reduz as recompensas.</p>}
              {onNext && <button type="button" className="btn btn-primary btn-lg btn-block" onClick={onNext}>Próximo caso<Icon name="arrow" width="18" height="18" /></button>}
            </div>
          ) : null}
        </div>

        <aside className="game-side">
          <ClueList clues={caseData.clues} revealedCluesCount={revealedCluesCount} />
          <AttemptHistory guesses={guesses} tones={tones} />
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
