import { type Todo } from '../types/todo.type'
import { useParams, Link } from 'react-router'
import { useEffect, useState } from 'react'
import { getTodo } from '../services/todo.service'
import { KIND_LABELS, STATUS_LABELS } from '../const/todo.const'
import Header from '../../core/components/Header'
import Footer from '../../core/components/Footer'

export default function TodoDetail() {
  const { id } = useParams()
  const [todo, setTodo] = useState<Todo | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadTodo = async () => {
      if (!id) {
        setLoading(false)
        return
      }
      try {
        const fetchedTodo = await getTodo(id)
        setTodo(fetchedTodo)
      } catch {
        setTodo(null)
      } finally {
        setLoading(false)
      }
    }
    loadTodo()
  }, [id])

  return (
    <div className='flex flex-col min-h-screen text-left'>
      <Header />
      <main className='flex-grow px-4 py-8'>
        <div className='max-w-2xl mx-auto space-y-6'>
          <Link
            to='/'
            className='inline-flex items-center gap-1 text-sm text-[var(--accent)] hover:underline'
          >
            ← Back to list
          </Link>

          {loading && (
            <p className='text-sm text-[var(--text)] m-0'>Loading…</p>
          )}

          {!loading && !todo && (
            <article className='border border-[var(--border)] rounded-lg p-6 bg-[var(--code-bg)]/40 space-y-2'>
              <h1 className='text-2xl m-0 text-[var(--text-h)]'>Todo not found</h1>
              <p className='text-sm m-0 text-[var(--text)]'>
                This todo may have been removed or the link is invalid.
              </p>
            </article>
          )}

          {!loading && todo && (
            <article className='border border-[var(--border)] rounded-lg p-6 bg-[var(--code-bg)]/40 space-y-5'>
              <header className='space-y-2'>
                <p className='text-xs uppercase tracking-wide text-[var(--text)] m-0'>
                  {KIND_LABELS[todo.kind]}
                </p>
                <h1 className='text-3xl m-0 text-[var(--text-h)]'>{todo.title}</h1>
                {todo.description && (
                  <p className='text-base m-0 text-[var(--text)]'>{todo.description}</p>
                )}
              </header>

              <dl className='grid grid-cols-1 sm:grid-cols-2 gap-4 m-0'>
                <div className='space-y-1'>
                  <dt className='text-xs uppercase tracking-wide text-[var(--text)] m-0'>
                    Status
                  </dt>
                  <dd className='text-sm m-0 text-[var(--text-h)] font-medium'>
                    {STATUS_LABELS[todo.status]}
                  </dd>
                </div>
                <div className='space-y-1'>
                  <dt className='text-xs uppercase tracking-wide text-[var(--text)] m-0'>
                    Priority
                  </dt>
                  <dd className='text-sm m-0 text-[var(--text-h)] font-medium capitalize'>
                    {todo.priority}
                  </dd>
                </div>

                {todo.kind === 'work' && (
                  <>
                    <div className='space-y-1'>
                      <dt className='text-xs uppercase tracking-wide text-[var(--text)] m-0'>
                        Assignee
                      </dt>
                      <dd className='text-sm m-0 text-[var(--text-h)] font-medium'>
                        {todo.assignee}
                      </dd>
                    </div>
                    <div className='space-y-1'>
                      <dt className='text-xs uppercase tracking-wide text-[var(--text)] m-0'>
                        Project
                      </dt>
                      <dd className='text-sm m-0 text-[var(--text-h)] font-medium'>
                        {todo.project}
                      </dd>
                    </div>
                  </>
                )}

                {todo.kind === 'learning' && (
                  <>
                    <div className='space-y-1'>
                      <dt className='text-xs uppercase tracking-wide text-[var(--text)] m-0'>
                        Topic
                      </dt>
                      <dd className='text-sm m-0 text-[var(--text-h)] font-medium'>
                        {todo.topic}
                      </dd>
                    </div>
                    {todo.resourceUrl && (
                      <div className='space-y-1'>
                        <dt className='text-xs uppercase tracking-wide text-[var(--text)] m-0'>
                          Resource
                        </dt>
                        <dd className='text-sm m-0'>
                          <a
                            className='text-[var(--accent)] underline'
                            href={todo.resourceUrl}
                            target='_blank'
                            rel='noreferrer'
                          >
                            Open resource
                          </a>
                        </dd>
                      </div>
                    )}
                  </>
                )}
              </dl>
              <footer className='text-sm m-0 text-[var(--text)]'>   
                Created at: {new Date(todo.createdAt).toLocaleString()} 
                <br />
                Updated at: {new Date(todo.updatedAt).toLocaleString()}
              </footer>
            </article>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
