import type { DailyTask } from '../../types/models'
import { TaskCard } from './TaskCard'

interface TaskListProps {
  tasks: DailyTask[]
  onClaim: (taskId: string) => void
}

export function TaskList({ tasks, onClaim }: TaskListProps) {
  if (!tasks.length) {
    return <section className="card empty-state"><p className="lead">Nenhuma tarefa disponível no momento.</p></section>
  }

  return (
    <section className="grid-2">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onClaim={onClaim} />
      ))}
    </section>
  )
}
