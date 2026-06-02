import { useState } from 'react'
import { RewardToast } from '../components/common/RewardToast'
import type { RewardToastVariant } from '../components/common/RewardToast'
import { TaskList } from '../components/tasks/TaskList'
import { applyAchievementUnlocks } from '../lib/achievementEngine'
import { audioManager } from '../lib/audio'
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
  const [toastTitle, setToastTitle] = useState('')
  const [toastVariant, setToastVariant] = useState<RewardToastVariant>('reward')
  const [toastKey, setToastKey] = useState(0)
  const [showToast, setShowToast] = useState(false)

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

    audioManager.playCorrect()
    pushToast(
      `Tarefa resgatada: +${result.rewardXp} XP e +${result.rewardCoins} moedas${
        achievementResult.rewardXp ? ' (+ bonus de conquista)' : ''
      }.`,
      achievementResult.rewardXp ? 'reward' : 'success',
      achievementResult.rewardXp ? 'Conquista liberada' : 'Meta concluida',
    )
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="page-title text-3xl">Tarefas diarias</h1>
        <p className="page-subtitle text-sm">Metas curtas para manter ritmo de estudo.</p>
      </div>

      <TaskList tasks={tasks} onClaim={handleClaim} />

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
