import { useMemo, useState } from 'react'
import { RewardToast } from '../components/common/RewardToast'
import { ReviewCard } from '../components/review/ReviewCard'
import { approvedCases } from '../data/cases'
import { disorders } from '../data/disorders'
import { applyAchievementUnlocks } from '../lib/achievementEngine'
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

export function ReviewPage() {
  const [items, setItems] = useState(() => getReviewItems())
  const [activeTab, setActiveTab] = useState<ReviewTab>('due')
  const [toastMessage, setToastMessage] = useState('')
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

  function pushToast(message: string) {
    setToastMessage(message)
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

    pushToast(`Revisao registrada. +${correct ? 40 : 20} XP${achievementResult.rewardXp ? ' + bonus de conquista' : ''}.`)
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="page-title text-3xl">Revisao</h1>
        <p className="page-subtitle text-sm">Itens errados retornam para consolidar memoria de longo prazo.</p>
      </div>

      <section className="panel p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-[color:var(--text-body)]">
            Pendentes agora: <span className="font-semibold text-[color:var(--text-strong)]">{dueItems.length}</span>
          </p>
          <div className="flex rounded-xl border border-[color:var(--border-soft)] p-1">
            <button
              type="button"
              onClick={() => setActiveTab('due')}
              className={activeTab === 'due' ? 'btn-primary px-3 py-2 text-xs' : 'btn-ghost px-3 py-2 text-xs'}
            >
              Fila
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('reviewed')}
              className={activeTab === 'reviewed' ? 'btn-primary px-3 py-2 text-xs' : 'btn-ghost px-3 py-2 text-xs'}
            >
              Casos revisados
            </button>
          </div>
        </div>
      </section>

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
          <section className="panel p-5 text-sm text-[color:var(--text-body)]">
            Nenhum item vencido agora. Adicione casos manualmente ou finalize tentativas erradas para alimentar sua fila.
          </section>
        )
      ) : (
        <ReviewedCasesList items={reviewedItems} />
      )}

      <RewardToast show={showToast} message={toastMessage} onClose={() => setShowToast(false)} />
    </div>
  )
}

function ReviewedCasesList({ items }: { items: ReviewItem[] }) {
  if (!items.length) {
    return (
      <section className="panel p-5 text-sm text-[color:var(--text-body)]">
        Nenhum caso revisado ainda. Revise um item da fila para criar seu historico de estudo.
      </section>
    )
  }

  return (
    <section className="grid gap-4">
      {items.map((item) => {
        const caseData = approvedCases.find((caseItem) => caseItem.id === item.caseId) ?? item.caseSnapshot
        const correctDisorder = disorders.find((disorder) => disorder.id === item.correctDisorderId)
        const cluesUsed = Math.max(0, item.originalCluesUsed ?? 0)
        const usedClues = caseData?.clues.slice(0, cluesUsed) ?? []

        return (
          <article key={item.id} className="panel panel-motion p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-[color:var(--text-muted)]">
                  {caseData?.category ?? 'Categoria indisponivel'}
                </p>
                <h2 className="page-title mt-1 text-xl">{caseData?.title ?? item.caseId}</h2>
              </div>
              <span className="chip rounded-full px-3 py-1 text-xs font-semibold">
                {item.reviewHistory?.[0]?.correct ? 'Ultima revisao: acerto' : 'Ultima revisao: erro'}
              </span>
            </div>

            {caseData ? (
              <p className="mt-3 text-sm leading-relaxed text-[color:var(--text-body)]">{caseData.vignette}</p>
            ) : null}

            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <div className="panel-soft p-3">
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

              <div className="panel-soft p-3">
                <p className="text-sm font-semibold text-[color:var(--text-strong)]">Resposta correta</p>
                <p className="mt-2 text-sm text-[color:var(--text-body)]">{correctDisorder?.namePt ?? item.correctDisorderId}</p>
                <p className="mt-2 text-xs text-[color:var(--text-muted)]">Pistas usadas: {cluesUsed}</p>
              </div>
            </div>

            {usedClues.length ? (
              <div className="panel-soft mt-3 p-3">
                <p className="text-sm font-semibold text-[color:var(--text-strong)]">Pistas usadas</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[color:var(--text-body)]">
                  {usedClues.map((clue) => (
                    <li key={`${item.id}-${clue.id}`}>{clue.text}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="panel-soft mt-3 p-3">
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
