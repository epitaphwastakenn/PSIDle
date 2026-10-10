import type { DailyTask } from '../../types/models'
import { audioManager } from '../../lib/audio'
import { Icon } from '../common/Icon'

interface TaskCardProps {
  task: DailyTask
  onClaim: (taskId: string) => void
}

export function TaskCard({ task, onClaim }: TaskCardProps) {
  const progressPercent = task.goal > 0 ? Math.round((task.progress / task.goal) * 100) : 0
  const claimReady = task.completed && !task.claimed

  return (
    <article className={['card task-card', claimReady ? 'task-ready' : '', task.claimed ? 'task-claimed' : ''].join(' ')}>
      <div className="task-card-head">
        <span className={`tile tile-sm ${task.claimed ? 'tile-ok' : claimReady ? 'tile-accent' : ''}`}>
          {task.claimed ? <Icon name="check" /> : claimReady ? <Icon name="spark" /> : null}
        </span>
        <div>
          <h3 className="h3">{task.title}</h3>
          <p className="desc">{task.description}</p>
        </div>
        <span className="mono small muted">{task.progress}/{task.goal}</span>
      </div>

      <div role="progressbar" aria-label={task.title} aria-valuemin={0} aria-valuemax={task.goal} aria-valuenow={task.progress}
        className={`progress progress-thin${task.completed ? ' progress-ok' : ''}`}>
        <span style={{ width: `${Math.max(0, Math.min(100, progressPercent))}%` }} />
      </div>

      <div className="task-card-foot">
        <div className="flex gap-2">
          <span className="tag tag-accent">+{task.rewardXp} XP</span>
          <span className="tag">+{task.rewardCoins} moedas</span>
        </div>
        <button
          type="button"
          disabled={!task.completed || task.claimed}
          onClick={() => {
            audioManager.playClick()
            onClaim(task.id)
          }}
          className={`btn btn-sm ${claimReady ? 'btn-primary reward-ready' : 'btn-secondary'}`}
        >
          {task.claimed ? 'Resgatada' : claimReady ? 'Resgatar' : 'Em andamento'}
        </button>
      </div>
    </article>
  )
}
