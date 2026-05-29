import { useState } from 'react'
import { RewardToast } from '../components/common/RewardToast'
import { TaskList } from '../components/tasks/TaskList'
import { applyAchievementUnlocks } from '../lib/achievementEngine'
import { awardCoins, awardXp } from '../lib/rewards'
import { claimTaskReward, generateDailyTasks } from '../lib/taskEngine'
import {
  ensureDailyTasksForToday,
  getReviewItems,
  getUserProgress,
  saveDailyTasks,
  saveUserProgress,
} from '../lib/storage'

export function TasksPage() {
  const [tasks, setTasks] = useState(() => ensureDailyTasksForToday(() => generateDailyTasks(new Date())))
  const [toastMessage, setToastMessage] = useState('')
  const [showToast, setShowToast] = useState(false)

  function handleClaim(taskId: string) {
    const result = claimTaskReward(tasks, taskId)
    if (!result.rewardXp && !result.rewardCoins) {
      return
    }

    setTasks(result.tasks)
    saveDailyTasks(result.tasks)

    const reviewItems = getReviewItems()
    let progress = getUserProgress()
    progress = awardXp(progress, result.rewardXp)
    progress = awardCoins(progress, result.rewardCoins)

    const achievementResult = applyAchievementUnlocks(progress, reviewItems)
    progress = achievementResult.progress
    progress = awardXp(progress, achievementResult.rewardXp)
    progress = awardCoins(progress, achievementResult.rewardCoins)
    saveUserProgress(progress)

    setToastMessage(
      `Tarefa resgatada: +${result.rewardXp} XP e +${result.rewardCoins} moedas${
        achievementResult.rewardXp ? ' (+ bônus de conquista)' : ''
      }.`,
    )
    setShowToast(true)
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-title text-3xl text-denim-600">Tarefas diárias</h1>
        <p className="text-sm text-slate-600">Complete metas curtas para acelerar seu progresso de estudo.</p>
      </div>

      <TaskList tasks={tasks} onClaim={handleClaim} />

      <RewardToast show={showToast} message={toastMessage} onClose={() => setShowToast(false)} />
    </div>
  )
}
