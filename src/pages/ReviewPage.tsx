import { useMemo, useState } from 'react'
import { approvedCases } from '../data/cases'
import { disorders } from '../data/disorders'
import { RewardToast } from '../components/common/RewardToast'
import { ReviewCard } from '../components/review/ReviewCard'
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

export function ReviewPage() {
  const [items, setItems] = useState(() => getReviewItems())
  const [toastMessage, setToastMessage] = useState('')
  const [showToast, setShowToast] = useState(false)

  const dueItems = useMemo(() => getDueReviewItems(items), [items])
  const currentItem = dueItems[0]

  const currentCase = currentItem ? approvedCases.find((item) => item.id === currentItem.caseId) : undefined
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

    pushToast(`Revisão registrada. +${correct ? 40 : 20} XP${achievementResult.rewardXp ? ' + bônus de conquista' : ''}.`)
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-title text-3xl text-denim-600">Revisão</h1>
        <p className="text-sm text-slate-600">Itens errados voltam para revisão com repetição espaçada simples.</p>
      </div>

      <section className="rounded-2xl border border-surface-200 bg-white p-4 shadow-card">
        <p className="text-sm text-slate-700">
          Pendentes agora: <span className="font-semibold text-denim-600">{dueItems.length}</span>
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
        <section className="rounded-2xl border border-surface-200 bg-white p-5 text-sm text-slate-700 shadow-card">
          Nenhum item de revisão vencido agora. Volte depois ou erre um caso no treino para gerar nova revisão.
        </section>
      )}

      <RewardToast show={showToast} message={toastMessage} onClose={() => setShowToast(false)} />
    </div>
  )
}
