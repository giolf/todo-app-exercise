import { TODO_STATUSES, TODO_PRIORITIES, STATUS_LABELS, KIND_LABELS } from '../const/todo.const.ts'
import type { TodoStatus, Todo, TodoPriority } from '../types/todo.type.ts'



export default function TodoItem({ todo, onTodoChange }: { todo: Todo, updateTodo: (todo: Todo) => void }) {
  return (
    <article className='border border-[var(--border)] rounded-lg p-4 text-left space-y-3 bg-[var(--code-bg)]/40'>
      <div className='flex flex-wrap items-start justify-between gap-2'>
        <div>
          <p className='text-xs uppercase tracking-wide text-[var(--text)] m-0 mb-1'>
            {KIND_LABELS[todo.kind]}
          </p>
          <h3 className='text-lg m-0 text-[var(--text-h)]'>{todo.title}</h3>
        </div>
        <label className='flex flex-col gap-1 text-xs'>
          Priority
          <select
            name='priority'
            className='border border-[var(--border)] rounded-md px-2 py-1 bg-[var(--bg)] text-[var(--text-h)]'
            value={todo.priority}
            onChange={(e) =>
              onTodoChange({ ...todo, priority: e.target.value as TodoPriority })
            }
          >
            {TODO_PRIORITIES.map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>
        </label>
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

      <label className='flex flex-col gap-1 text-sm'>
        Status
        <select
          name='status'
          className='border border-[var(--border)] rounded-md px-2 py-1 bg-[var(--bg)] text-[var(--text-h)]'
          value={todo.status}
          onChange={(e) =>
            onTodoChange({ ...todo, status: e.target.value as TodoStatus })
          }
        >
          {TODO_STATUSES.map((status) => (
            <option key={status} value={status}>
              {STATUS_LABELS[status]}
            </option>
          ))}
        </select>
      </label>
    </article>
  )
}
