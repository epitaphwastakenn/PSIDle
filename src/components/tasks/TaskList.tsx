import type { DailyTask } from '../../types/models'
import { TaskCard } from './TaskCard'

interface TaskListProps {
  tasks: DailyTask[]
  onClaim: (taskId: string) => void
}

export function TaskList({ tasks, onClaim }: TaskListProps) {
  if (!tasks.length) {
    return (
      <section className="panel p-4 text-sm text-[color:var(--text-body)]">
        Nenhuma tarefa disponivel no momento.
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
