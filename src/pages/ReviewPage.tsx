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
import type { Case } from '../types/models'

export function ReviewPage() {
  const [items, setItems] = useState(() => getReviewItems())
  const [toastMessage, setToastMessage] = useState('')
  const [showToast, setShowToast] = useState(false)

  const dueItems = useMemo(() => getDueReviewItems(items), [items])
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

  function handleGrade(itemId: string, correct: boolean) {
    const target = items.find((item) => item.id === itemId)
    if (!target) {
      return
    }

    const updatedItem = gradeReviewItem(target, correct)
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
        <p className="text-sm text-[color:var(--text-body)]">
          Pendentes agora: <span className="font-semibold text-[color:var(--text-strong)]">{dueItems.length}</span>
        </p>
      </section>

      {currentItem && currentCase && correctDisorder ? (
        <ReviewCard
          key={currentItem.id}
          item={currentItem}
          caseData={currentCase}
          correctDisorderName={correctDisorder.namePt}
          onGrade={handleGrade}
        />
      ) : (
        <section className="panel p-5 text-sm text-[color:var(--text-body)]">
          Nenhum item vencido agora. Jogue treino e finalize casos para alimentar sua fila de revisao.
        </section>
      )}

      <RewardToast show={showToast} message={toastMessage} onClose={() => setShowToast(false)} />
    </div>
  )
}
