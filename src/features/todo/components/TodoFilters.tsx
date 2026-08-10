import {
  type TodoPriority,
  type TodoStatus,
  type TodoFilter,
} from '../types/todo.type.ts'

import { TODO_STATUSES, TODO_PRIORITIES } from '../const/todo.const.ts'

const STATUS_LABELS: Record<TodoStatus, string> = {
  todo: 'To do',
  in_progress: 'In progress',
  done: 'Done',
  blocked: 'Blocked',
}

export default function TodoFilters({
  filter,
  onChange,
}: {
  filter: TodoFilter
  onChange: (next: TodoFilter) => void
}) {
  return (
    <div className='flex flex-wrap gap-4 justify-center items-end mb-6 text-left'>
      <label className='flex flex-col gap-1 text-sm'>
        Status
        <select
          className='border border-[var(--border)] rounded-md px-3 py-2 bg-[var(--bg)] text-[var(--text-h)]'
          value={filter.status ?? 'all'}
          onChange={(event) =>
            onChange({
              ...filter,
              status: event.target.value as TodoStatus | 'all',
            })
          }
        >
          <option value='all'>All statuses</option>
          {TODO_STATUSES.map((status) => (
            <option key={status} value={status}>
              {STATUS_LABELS[status]}
            </option>
          ))}
        </select>
      </label>

      <label className='flex flex-col gap-1 text-sm'>
        Priority
        <select
          className='border border-[var(--border)] rounded-md px-3 py-2 bg-[var(--bg)] text-[var(--text-h)]'
          value={filter.priority ?? 'all'}
          onChange={(event) =>
            onChange({
              ...filter,
              priority: event.target.value as TodoPriority | 'all',
            })
          }
        >
          <option value='all'>All priorities</option>
          {TODO_PRIORITIES.map((priority) => (
            <option key={priority} value={priority}>
              {priority}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}
