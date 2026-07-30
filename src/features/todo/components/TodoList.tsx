import type { TodoType } from '../types/Todo'
import TodoItem from './TodoItem'

export default function TodoList({ todos }: { todos: TodoType[] }) {
  if (todos.length === 0) {
    return (
      <p className='text-[var(--text)] text-sm mb-6'>
        No todos yet.
      </p>
    )
  }

  return (
    <ul className='space-y-4 list-none p-0 m-0 mb-6'>
      {todos.map((todo) => (
        <li key={todo.id}>
          <TodoItem todo={todo} />
        </li>
      ))}
    </ul>
  )
}
