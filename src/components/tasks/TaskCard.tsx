import type { DailyTask } from '../../types/models'

interface TaskCardProps {
  task: DailyTask
  onClaim: (taskId: string) => void
}

export function TaskCard({ task, onClaim }: TaskCardProps) {
  const progressPercent = task.goal > 0 ? Math.round((task.progress / task.goal) * 100) : 0

  return (
    <article className="rounded-2xl border border-surface-200 bg-white p-4 shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-semibold text-denim-600">{task.title}</h3>
        <span className="text-xs font-semibold text-slate-500">
          {task.progress}/{task.goal}
        </span>
      </div>
      <p className="mt-2 text-sm text-slate-700">{task.description}</p>

      <div className="mt-3 h-2 overflow-hidden rounded-full bg-surface-200">
        <div
          className="h-full rounded-full bg-gradient-to-r from-mint-500 to-denim-400 transition-all"
          style={{ width: `${Math.max(0, Math.min(100, progressPercent))}%` }}
        />
      </div>

      <div className="mt-3 flex items-center justify-between text-sm">
        <p className="text-slate-600">
          +{task.rewardXp} XP | +{task.rewardCoins} moedas
        </p>
        <button
          type="button"
          disabled={!task.completed || task.claimed}
          onClick={() => onClaim(task.id)}
          className="rounded-xl bg-denim-600 px-3 py-1.5 font-semibold text-white transition hover:bg-denim-500 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {task.claimed ? 'Resgatada' : 'Resgatar'}
        </button>
      </div>
    </article>
  )
}
