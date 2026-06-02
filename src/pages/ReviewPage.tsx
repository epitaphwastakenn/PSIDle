import { useMemo, useState } from 'react'
import { RewardToast } from '../components/common/RewardToast'
import type { RewardToastVariant } from '../components/common/RewardToast'
import { ReviewCard } from '../components/review/ReviewCard'
import { approvedCases } from '../data/cases'
import { disorders } from '../data/disorders'
import { applyAchievementUnlocks } from '../lib/achievementEngine'
import { audioManager } from '../lib/audio'
import { awardCoins, awardXp } from '../lib/rewards'
import { getDueReviewItems, gradeReviewItem } from '../lib/review'
import {
  ensureDailyTasksForToday,
  getReviewItems,
  getUserProgress,
  saveDailyTasks,
  saveReviewItems,
  saveUserProgress,
} from '../lib/storage'
import { generateDailyTasks, updateTaskProgress } from '../lib/taskEngine'
import type { Case, ReviewItem } from '../types/models'

type ReviewTab = 'due' | 'reviewed'

function getReviewTabClass(tab: ReviewTab, activeTab: ReviewTab): string {
  return tab === activeTab ? 'review-tab review-tab-active' : 'review-tab'
}

export function ReviewPage() {
  const [items, setItems] = useState(() => getReviewItems())
  const [activeTab, setActiveTab] = useState<ReviewTab>('due')
  const [toastMessage, setToastMessage] = useState('')
  const [toastTitle, setToastTitle] = useState('')
  const [toastVariant, setToastVariant] = useState<RewardToastVariant>('review')
  const [toastKey, setToastKey] = useState(0)
  const [showToast, setShowToast] = useState(false)

  const dueItems = useMemo(() => getDueReviewItems(items), [items])
  const reviewedItems = useMemo(
    () =>
      items
        .filter((item) => (item.reviewHistory?.length ?? 0) > 0)
        .sort((a, b) => {
          const aDate = a.reviewHistory?.[0]?.reviewedAt ?? a.createdAt
          const bDate = b.reviewHistory?.[0]?.reviewedAt ?? b.createdAt
          return new Date(bDate).getTime() - new Date(aDate).getTime()
        }),
    [items],
  )
  const currentItem = dueItems[0]

  const currentCase: Case | undefined = currentItem
    ? approvedCases.find((item) => item.id === currentItem.caseId) ?? currentItem.caseSnapshot
    : undefined
  const correctDisorder = currentItem
    ? disorders.find((disorder) => disorder.id === currentItem.correctDisorderId)
    : undefined
  const totalItems = items.length
  const masteredItems = items.filter((item) => item.status === 'mastered').length

  function pushToast(
    message: string,
    variant: RewardToastVariant = 'review',
    title = '',
  ) {
    setToastTitle(title)
    setToastVariant(variant)
    setToastMessage(message)
    setToastKey((current) => current + 1)
    setShowToast(true)
  }

  function handleGrade(itemId: string, correct: boolean, guess?: string) {
    const target = items.find((item) => item.id === itemId)
    if (!target) {
      return
    }

    const updatedItem = gradeReviewItem(target, correct, guess)
    const updatedItems = items.map((item) => (item.id === itemId ? updatedItem : item))
    saveReviewItems(updatedItems)
    setItems(updatedItems)

    const taskList = ensureDailyTasksForToday(() => generateDailyTasks(new Date()))
    const taskUpdated = updateTaskProgress(taskList, { type: 'review_completed', correct })
    saveDailyTasks(taskUpdated)

    let progress = getUserProgress()
    progress = awardXp(progress, correct ? 40 : 20)
    progress = awardCoins(progress, correct ? 10 : 4)

    const achievementResult = applyAchievementUnlocks(progress, updatedItems)
    progress = achievementResult.progress
    progress = awardXp(progress, achievementResult.rewardXp)
    progress = awardCoins(progress, achievementResult.rewardCoins)
    saveUserProgress(progress)

    if (correct) {
      audioManager.playCorrect()
      pushToast(
        `Revisao registrada. +40 XP${achievementResult.rewardXp ? ' + bonus de conquista' : ''}.`,
        achievementResult.rewardXp ? 'reward' : 'success',
        achievementResult.rewardXp ? 'Conquista liberada' : 'Revisao correta',
      )
      return
    }

    audioManager.playWrong()
    pushToast(
      `Revisao registrada. +20 XP${achievementResult.rewardXp ? ' + bonus de conquista' : ''}.`,
      'review',
      'Caso continua em foco',
    )
  }

  function handleTabChange(tab: ReviewTab) {
    if (tab === activeTab) {
      return
    }

    audioManager.playClick()
    setActiveTab(tab)
  }

  return (
    <div className="space-y-4">
      <section className="panel review-hero p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="hero-kicker">Revisao</span>
            <h1 className="page-title mt-2 text-3xl">Fila de estudo ativo</h1>
            <p className="page-subtitle mt-2 max-w-2xl text-sm">
              Casos perdidos retornam com espacamento simples para consolidar diferencas clinicas importantes.
            </p>
          </div>
          <div className="review-metric-grid">
            <div className="mini-stat">
              <span className="mini-stat-label">Pendentes</span>
              <span className="mini-stat-value">{dueItems.length}</span>
            </div>
            <div className="mini-stat">
              <span className="mini-stat-label">Revisados</span>
              <span className="mini-stat-value">{reviewedItems.length}</span>
            </div>
            <div className="mini-stat">
              <span className="mini-stat-label">Dominados</span>
              <span className="mini-stat-value">{masteredItems}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="panel review-control-panel p-3 md:p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="filter-caption mt-0">
            Total na revisao: <span className="font-semibold text-[color:var(--text-strong)]">{totalItems}</span>
          </p>
          <div className="review-tabs" role="tablist" aria-label="Secoes de revisao">
            <button
              type="button"
              onClick={() => handleTabChange('due')}
              className={getReviewTabClass('due', activeTab)}
              role="tab"
              aria-selected={activeTab === 'due'}
            >
              Fila ({dueItems.length})
            </button>
            <button
              type="button"
              onClick={() => handleTabChange('reviewed')}
              className={getReviewTabClass('reviewed', activeTab)}
              role="tab"
              aria-selected={activeTab === 'reviewed'}
            >
              Casos revisados ({reviewedItems.length})
            </button>
          </div>
        </div>
      </section>

      <div key={activeTab} className="tab-content-motion">
        {activeTab === 'due' ? (
          currentItem && currentCase && correctDisorder ? (
            <ReviewCard
              key={currentItem.id}
              item={currentItem}
              caseData={currentCase}
              correctDisorderName={correctDisorder.namePt}
              onGrade={handleGrade}
            />
          ) : (
            <section className="panel empty-state-card p-6 text-sm text-[color:var(--text-body)]">
              <span className="empty-state-icon">OK</span>
              <h2 className="page-title mt-3 text-2xl">Nada vencido agora</h2>
              <p className="mt-2 max-w-xl">
                Finalize tentativas erradas ou adicione casos manualmente para alimentar sua fila de revisao.
              </p>
            </section>
          )
        ) : (
          <ReviewedCasesList items={reviewedItems} />
        )}
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

function ReviewedCasesList({ items }: { items: ReviewItem[] }) {
  if (!items.length) {
    return (
      <section className="panel empty-state-card p-6 text-sm text-[color:var(--text-body)]">
        <span className="empty-state-icon">0</span>
        <h2 className="page-title mt-3 text-2xl">Historico vazio</h2>
        <p className="mt-2 max-w-xl">Revise um item da fila para criar um arquivo de estudo dos seus erros e acertos.</p>
      </section>
    )
  }

  return (
    <section className="review-history-grid">
      {items.map((item) => {
        const caseData = approvedCases.find((caseItem) => caseItem.id === item.caseId) ?? item.caseSnapshot
        const correctDisorder = disorders.find((disorder) => disorder.id === item.correctDisorderId)
        const cluesUsed = Math.max(0, item.originalCluesUsed ?? 0)
        const usedClues = caseData?.clues.slice(0, cluesUsed) ?? []

        return (
          <article key={item.id} className="panel review-history-card p-4 md:p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-[color:var(--text-muted)]">
                  {caseData?.category ?? 'Categoria indisponivel'}
                </p>
                <h2 className="page-title mt-1 text-xl">{caseData?.title ?? item.caseId}</h2>
              </div>
              <span className={item.reviewHistory?.[0]?.correct ? 'review-status-chip review-status-success' : 'review-status-chip review-status-warning'}>
                {item.reviewHistory?.[0]?.correct ? 'Ultima revisao: acerto' : 'Ultima revisao: erro'}
              </span>
            </div>

            {caseData ? (
              <p className="mt-3 text-sm leading-relaxed text-[color:var(--text-body)]">{caseData.vignette}</p>
            ) : null}

            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <div className="review-detail-box">
                <p className="text-sm font-semibold text-[color:var(--text-strong)]">Respostas dadas na partida</p>
                {item.originalGuesses?.length ? (
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[color:var(--text-body)]">
                    {item.originalGuesses.map((guess, index) => (
                      <li key={`${item.id}-guess-${index}`}>{guess}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 text-sm text-[color:var(--text-muted)]">Nenhuma resposta registrada.</p>
                )}
              </div>

              <div className="review-detail-box">
                <p className="text-sm font-semibold text-[color:var(--text-strong)]">Resposta correta</p>
                <p className="mt-2 text-sm text-[color:var(--text-body)]">{correctDisorder?.namePt ?? item.correctDisorderId}</p>
                <p className="mt-2 text-xs text-[color:var(--text-muted)]">Pistas usadas: {cluesUsed}</p>
              </div>
            </div>

            {usedClues.length ? (
              <div className="review-detail-box mt-3">
                <p className="text-sm font-semibold text-[color:var(--text-strong)]">Pistas usadas</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[color:var(--text-body)]">
                  {usedClues.map((clue) => (
                    <li key={`${item.id}-${clue.id}`}>{clue.text}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="review-detail-box mt-3">
              <p className="text-sm font-semibold text-[color:var(--text-strong)]">Historico de revisao</p>
              <ul className="mt-2 space-y-1 text-sm text-[color:var(--text-body)]">
                {(item.reviewHistory ?? []).map((entry) => (
                  <li key={entry.id}>
                    {new Date(entry.reviewedAt).toLocaleDateString('pt-BR')} - {entry.correct ? 'acertou' : 'errou'}
                    {entry.guess ? ` (${entry.guess})` : ''}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        )
      })}
    </section>
  )
}
