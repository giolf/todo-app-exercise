import { useState } from 'react'
import type { CreateTodoInput, TodoKind } from '../types/Todo'
import { TODO_PRIORITIES } from '../types/Todo'
import { ValidationError } from '../validation'
import Button from '../../shared/components/Button'

export default function CreateTodoForm({
  onCreate,
  onCancel,
}: {
  onCreate: (input: CreateTodoInput) => void
  onCancel: () => void
}) {
  const [kind, setKind] = useState<TodoKind>('standard')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<(typeof TODO_PRIORITIES)[number]>('low')
  const [assignee, setAssignee] = useState('')
  const [project, setProject] = useState('')
  const [topic, setTopic] = useState('')
  const [resourceUrl, setResourceUrl] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setError(null)

    try {
      if (kind === 'work') {
        onCreate({
          kind: 'work',
          title,
          description,
          priority,
          assignee,
          project,
        })
      } else if (kind === 'learning') {
        onCreate({
          kind: 'learning',
          title,
          description,
          priority,
          topic,
          resourceUrl: resourceUrl || undefined,
        })
      } else {
        onCreate({
          kind: 'standard',
          title,
          description,
          priority,
        })
      }
    } catch (err) {
      setError(err instanceof ValidationError ? err.message : 'Could not create todo.')
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
          className='border border-[var(--border)] rounded-md px-3 py-2 bg-[var(--bg)]'
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
        <input
          required
          className='border border-[var(--border)] rounded-md px-3 py-2 bg-[var(--bg)]'
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </label>

      <label className='flex flex-col gap-1 text-sm'>
        Description
        <textarea
          className='border border-[var(--border)] rounded-md px-3 py-2 bg-[var(--bg)] min-h-20'
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </label>

      <label className='flex flex-col gap-1 text-sm'>
        Priority
        <select
          className='border border-[var(--border)] rounded-md px-3 py-2 bg-[var(--bg)]'
          value={priority}
          onChange={(event) =>
            setPriority(event.target.value as (typeof TODO_PRIORITIES)[number])
          }
        >
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
            <input
              required
              className='border border-[var(--border)] rounded-md px-3 py-2 bg-[var(--bg)]'
              value={assignee}
              onChange={(event) => setAssignee(event.target.value)}
            />
          </label>
          <label className='flex flex-col gap-1 text-sm'>
            Project
            <input
              required
              className='border border-[var(--border)] rounded-md px-3 py-2 bg-[var(--bg)]'
              value={project}
              onChange={(event) => setProject(event.target.value)}
            />
          </label>
        </>
      )}

      {kind === 'learning' && (
        <>
          <label className='flex flex-col gap-1 text-sm'>
            Topic
            <input
              required
              className='border border-[var(--border)] rounded-md px-3 py-2 bg-[var(--bg)]'
              value={topic}
              onChange={(event) => setTopic(event.target.value)}
            />
          </label>
          <label className='flex flex-col gap-1 text-sm'>
            Resource URL
            <input
              type='url'
              className='border border-[var(--border)] rounded-md px-3 py-2 bg-[var(--bg)]'
              value={resourceUrl}
              onChange={(event) => setResourceUrl(event.target.value)}
            />
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
