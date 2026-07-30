import type { TodoType, TodoStatus } from '../types/Todo'

const STATUS_LABELS: Record<TodoStatus, string> = {
  todo: 'To do',
  in_progress: 'In progress',
  done: 'Done',
  blocked: 'Blocked',
}

function kindLabel(kind: TodoType['kind']): string {
  switch (kind) {
    case 'work':
      return 'Work'
    case 'learning':
      return 'Learning'
    default:
      return 'Standard'
  }
}

export default function TodoItem({ todo }: { todo: TodoType }) {
  return (
    <article className='border border-[var(--border)] rounded-lg p-4 text-left space-y-3 bg-[var(--code-bg)]/40'>
      <div className='flex flex-wrap items-start justify-between gap-2'>
        <div>
          <p className='text-xs uppercase tracking-wide text-[var(--text)] m-0 mb-1'>
            {kindLabel(todo.kind)}
          </p>
          <h3 className='text-lg m-0 text-[var(--text-h)]'>{todo.title}</h3>
        </div>
        <span className='text-xs px-2 py-1 rounded-full bg-[var(--accent-bg)] border border-[var(--accent-border)]'>
          {todo.priority} priority
        </span>
      </div>

      {todo.description && (
        <p className='text-sm m-0 text-[var(--text)]'>{todo.description}</p>
      )}

      {todo.kind === 'work' && (
        <p className='text-sm m-0'>
          <strong>Assignee:</strong> {todo.assignee} · <strong>Project:</strong>{' '}
          {todo.project}
        </p>
      )}

      {todo.kind === 'learning' && (
        <p className='text-sm m-0'>
          <strong>Topic:</strong> {todo.topic}
          {todo.resourceUrl && (
            <>
              {' '}
              ·{' '}
              <a
                className='text-[var(--accent)] underline'
                href={todo.resourceUrl}
                target='_blank'
                rel='noreferrer'
              >
                Resource
              </a>
            </>
          )}
        </p>
      )}

      <p className='text-sm m-0 text-[var(--text)]'>
        Status: {STATUS_LABELS[todo.status]}
      </p>
    </article>
  )
}
