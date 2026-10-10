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
        achievementResult.rewardXp ? ' (+ bônus de conquista)' : ''
      }.`,
      achievementResult.rewardXp ? 'reward' : 'success',
      achievementResult.rewardXp ? 'Conquista liberada' : 'Meta concluída',
    )
  }

  const doneCount = tasks.filter((task) => task.completed).length

  return (
    <div className="page-stack">
      <header className="page-header">
        <h1 className="display">Tarefas</h1>
        <div className="card task-summary">
          <div className="flex items-baseline justify-between gap-3">
            <span className="stat-label">Concluídas</span>
            <span className="stat-value" style={{ fontSize: 28 }}>{doneCount}<small>/ {tasks.length}</small></span>
          </div>
          <div className="progress progress-ok"><span style={{ width: `${tasks.length ? (doneCount / tasks.length) * 100 : 0}%` }} /></div>
        </div>
      </header>

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
