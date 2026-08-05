import { useState } from 'react'
import Button from '../../shared/components/Button'
import {
  type CreateTodoInput,
  type TodoKind,
  type TodoPriority,
} from '../types/todo.type.ts'

import { TODO_PRIORITIES } from '../types/todo.type.ts'

const fieldClass =
  'border border-[var(--border)] rounded-md px-3 py-2 bg-[var(--bg)]'

export default function CreateTodoForm({
  onCreate,
  onCancel,
}: {
  onCreate: (input: CreateTodoInput) => void
  onCancel: () => void
}) {
  const [kind, setKind] = useState<TodoKind>('standard')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)

    const data = new FormData(event.currentTarget)
    const title = String(data.get('title') ?? '')
    const description = String(data.get('description') ?? '')
    const priority = String(data.get('priority') ?? 'low') as TodoPriority

    try {
      if (kind === 'work') {
        onCreate({
          kind,
          title,
          description,
          priority,
          assignee: String(data.get('assignee') ?? ''),
          project: String(data.get('project') ?? ''),
        })
      } else if (kind === 'learning') {
        const resourceUrl = String(data.get('resourceUrl') ?? '').trim()
        onCreate({
          kind,
          title,
          description,
          priority,
          topic: String(data.get('topic') ?? ''),
          resourceUrl: resourceUrl || undefined,
        })
      } else {
        onCreate({ kind: 'standard', title, description, priority })
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not create todo.')
    }
  }

  return (
    <form className='space-y-4' onSubmit={handleSubmit}>
      {error && (
        <p className='text-red-600 text-sm m-0' role='alert'>
          {error}
        </p>
      )}

      <label className='flex flex-col gap-1 text-sm'>
        Type
        <select
          className={fieldClass}
          value={kind}
          onChange={(event) => setKind(event.target.value as TodoKind)}
        >
          <option value='standard'>Standard</option>
          <option value='work'>Work</option>
          <option value='learning'>Learning</option>
        </select>
      </label>

      <label className='flex flex-col gap-1 text-sm'>
        Title
        <input name='title' required className={fieldClass} />
      </label>

      <label className='flex flex-col gap-1 text-sm'>
        Description
        <textarea name='description' className={`${fieldClass} min-h-20`} />
      </label>

      <label className='flex flex-col gap-1 text-sm'>
        Priority
        <select name='priority' defaultValue='low' className={fieldClass}>
          {TODO_PRIORITIES.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </label>

      {kind === 'work' && (
        <>
          <label className='flex flex-col gap-1 text-sm'>
            Assignee
            <input name='assignee' required className={fieldClass} />
          </label>
          <label className='flex flex-col gap-1 text-sm'>
            Project
            <input name='project' required className={fieldClass} />
          </label>
        </>
      )}

      {kind === 'learning' && (
        <>
          <label className='flex flex-col gap-1 text-sm'>
            Topic
            <input name='topic' required className={fieldClass} />
          </label>
          <label className='flex flex-col gap-1 text-sm'>
            Resource URL
            <input name='resourceUrl' type='url' className={fieldClass} />
          </label>
        </>
      )}

      <div className='flex gap-2 justify-end pt-2'>
        <Button text='Cancel' variant='secondary' onClick={onCancel} />
        <Button text='Create' type='submit' />
      </div>
    </form>
  )
}
