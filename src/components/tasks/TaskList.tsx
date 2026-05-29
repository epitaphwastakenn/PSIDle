import type { DailyTask } from '../../types/models'
import { TaskCard } from './TaskCard'

interface TaskListProps {
  tasks: DailyTask[]
  onClaim: (taskId: string) => void
}

export function TaskList({ tasks, onClaim }: TaskListProps) {
  if (!tasks.length) {
    return (
      <section className="rounded-2xl border border-surface-200 bg-white p-4 text-sm text-slate-700 shadow-card">
        Nenhuma tarefa disponível no momento.
      </section>
    )
  }

  return (
    <section className="grid gap-4 md:grid-cols-2">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onClaim={onClaim} />
      ))}
    </section>
  )
}
