import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { normalizeText } from '../lib/normalize'
import { Icon } from '../components/common/Icon'
import { RewardToast } from '../components/common/RewardToast'
import type { RewardToastVariant } from '../components/common/RewardToast'
import { ReviewCard } from '../components/review/ReviewCard'
import { approvedCases } from '../data/cases'
import { findDisorder } from '../data/disorders'
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
  return tab === activeTab ? 'segment segment-active' : 'segment'
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
    ? findDisorder(currentItem.correctDisorderId)
    : undefined
  const totalItems = items.length
  const masteredItems = items.filter((item) => item.status === 'mastered').length
  const nextReview = items.filter((item) => !dueItems.some((due) => due.id === item.id))
    .toSorted((a, b) => a.dueAt.localeCompare(b.dueAt))[0]

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
        `Revisão registrada. +40 XP${achievementResult.rewardXp ? ' + bônus de conquista' : ''}.`,
        achievementResult.rewardXp ? 'reward' : 'success',
        achievementResult.rewardXp ? 'Conquista liberada' : 'Revisão correta',
      )
      return
    }

    audioManager.playWrong()
    pushToast(
      `Revisão registrada. +20 XP${achievementResult.rewardXp ? ' + bônus de conquista' : ''}.`,
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
    <div className="page-stack">
      <header className="page-header">
        <h1 className="display">Revisão</h1>
        <div className="header-stats">
          <div className="card-muted stat"><span className="stat-label">Pendentes</span><span className="stat-value">{dueItems.length}</span></div>
          <div className="card-muted stat"><span className="stat-label">Revisados</span><span className="stat-value">{reviewedItems.length}</span></div>
          <div className="card-muted stat"><span className="stat-label">Dominados</span><span className="stat-value">{masteredItems}</span></div>
        </div>
      </header>

      <div className="review-toolbar">
        <div className="segmented" role="tablist" aria-label="Seções de revisão" onKeyDown={(event) => {
          if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return
          event.preventDefault()
          const next = event.key === 'Home' ? 'due' : event.key === 'End' ? 'reviewed' : activeTab === 'due' ? 'reviewed' : 'due'
          handleTabChange(next)
          document.getElementById(`review-tab-${next}`)!.focus()
        }}>
          <button type="button" onClick={() => handleTabChange('due')} className={getReviewTabClass('due', activeTab)} role="tab" id="review-tab-due"
            aria-controls="review-panel" tabIndex={activeTab === 'due' ? 0 : -1} aria-selected={activeTab === 'due'}>
            Fila<span className="segment-count">{dueItems.length}</span>
          </button>
          <button type="button" onClick={() => handleTabChange('reviewed')} className={getReviewTabClass('reviewed', activeTab)} role="tab" id="review-tab-reviewed"
            aria-controls="review-panel" tabIndex={activeTab === 'reviewed' ? 0 : -1} aria-selected={activeTab === 'reviewed'}>
            Histórico<span className="segment-count">{reviewedItems.length}</span>
          </button>
        </div>
        <span className="small muted">{totalItems} no total</span>
      </div>

      <div key={activeTab} id="review-panel" role="tabpanel" aria-labelledby={`review-tab-${activeTab}`} className="tab-content-motion">
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
            <section className="card empty-state">
              <span className="tile tile-ok"><Icon name="check" /></span>
              <h2 className="h2">Tudo em dia</h2>
              <p className="muted">
                {nextReview ? `Próxima revisão em ${new Date(nextReview.dueAt).toLocaleDateString('pt-BR')}.` : 'Casos que você errar aparecem aqui.'}
              </p>
              <Link to="/practice" className="text-link">Ir para o treino<Icon name="arrow" /></Link>
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
  const [search, setSearch] = useState('')
  const filtered = items.filter((item) => {
    const caseData = approvedCases.find((entry) => entry.id === item.caseId) ?? item.caseSnapshot
    const disorder = findDisorder(item.correctDisorderId)
    return normalizeText(`${caseData?.title} ${caseData?.category} ${disorder?.namePt}`).includes(normalizeText(search))
  })
  if (!items.length) {
    return (
      <section className="card empty-state">
        <span className="tile tile-filled"><Icon name="book" /></span>
        <h2 className="h2">Nada revisado ainda</h2>
      </section>
    )
  }

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <input className="input search-field" type="search" aria-label="Buscar" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar…" />
        <p className="small muted" role="status">{filtered.length} {filtered.length === 1 ? 'caso' : 'casos'}</p>
      </div>
      <section className="history-grid">
        {filtered.map((item) => {
          const caseData = approvedCases.find((caseItem) => caseItem.id === item.caseId) ?? item.caseSnapshot
          const correctDisorder = findDisorder(item.correctDisorderId)
          const cluesUsed = Math.max(0, item.originalCluesUsed ?? 0)
          const usedClues = caseData?.clues.slice(0, cluesUsed) ?? []
          const lastCorrect = item.reviewHistory?.[0]?.correct

          return (
            <article key={item.id} className="card history-card">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="kicker">{caseData?.category ?? 'Categoria indisponível'}</p>
                  <h2 className="h3 mt-1">{caseData?.title ?? item.caseId}</h2>
                </div>
                <span className={`tag ${lastCorrect ? 'tag-ok' : 'tag-bad'}`}>{lastCorrect ? 'Acertou' : 'Errou'}</span>
              </div>

              <details>
                <summary>Detalhes<Icon name="chevron" width="18" height="18" /></summary>
                <div className="history-body">
                  {caseData ? <p className="small">{caseData.vignette}</p> : null}
                  <div className="grid gap-2 md:grid-cols-2">
                    <div className="card-muted">
                      <h4>Seus palpites</h4>
                      {item.originalGuesses?.length ? (
                        <ul>{item.originalGuesses.map((guess, index) => <li key={`${item.id}-guess-${index}`}>{guess}</li>)}</ul>
                      ) : <p className="small muted">Nenhuma resposta registrada.</p>}
                    </div>
                    <div className="card-muted">
                      <h4>Resposta correta</h4>
                      <p className="small">{correctDisorder?.namePt ?? item.correctDisorderId}</p>
                      <p className="small muted mt-1">Pistas usadas: {cluesUsed}</p>
                    </div>
                  </div>
                  {usedClues.length ? (
                    <div className="card-muted">
                      <h4>Pistas usadas</h4>
                      <ul>{usedClues.map((clue) => <li key={`${item.id}-${clue.id}`}>{clue.text}</li>)}</ul>
                    </div>
                  ) : null}
                  <div className="card-muted">
                    <h4>Revisões</h4>
                    <ul>
                      {(item.reviewHistory ?? []).map((entry) => (
                        <li key={entry.id}>
                          {new Date(entry.reviewedAt).toLocaleDateString('pt-BR')} · {entry.correct ? 'acertou' : 'errou'}{entry.guess ? ` (${entry.guess})` : ''}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {caseData && <div className="card-muted"><h4>Explicação</h4><p className="small">{caseData.explanation}</p></div>}
                </div>
              </details>
            </article>
          )
        })}
      </section>
    </div>
  )
}
