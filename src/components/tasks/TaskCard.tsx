import type { DailyTask } from '../../types/models'
import { audioManager } from '../../lib/audio'

interface TaskCardProps {
  task: DailyTask
  onClaim: (taskId: string) => void
}

export function TaskCard({ task, onClaim }: TaskCardProps) {
  const progressPercent = task.goal > 0 ? Math.round((task.progress / task.goal) * 100) : 0

  return (
    <article className="panel panel-motion p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-semibold text-[color:var(--text-strong)]">{task.title}</h3>
        <span className="text-xs font-semibold text-[color:var(--text-muted)]">
          {task.progress}/{task.goal}
        </span>
      </div>
      <p className="mt-2 text-sm text-[color:var(--text-body)]">{task.description}</p>

      <div className="mt-3 h-2 overflow-hidden rounded-full border border-[color:var(--border-soft)] bg-[color:rgba(31,45,90,0.5)]">
        <div
          className="progress-flow h-full rounded-full bg-gradient-to-r from-[#3bd7b0] via-[#5e8fff] to-[#8a6cff] transition-all duration-700"
          style={{ width: `${Math.max(0, Math.min(100, progressPercent))}%` }}
        />
      </div>

      <div className="mt-3 flex items-center justify-between gap-3 text-sm">
        <p className="text-[color:var(--text-muted)]">
          +{task.rewardXp} XP | +{task.rewardCoins} moedas
        </p>
        <button
          type="button"
          disabled={!task.completed || task.claimed}
          onClick={() => {
            audioManager.playClick()
            onClaim(task.id)
          }}
          className="btn-primary"
        >
          {task.claimed ? 'Resgatada' : 'Resgatar'}
        </button>
      </div>
    </article>
  )
}
