import Footer from './features/core/components/Footer'
import Header from './features/core/components/Header'
import TodoList from './features/todo/components/TodoList'
import { getTodos, createTodo } from './features/todo/services/todo.service.ts'
import { useEffect, useState } from 'react'
import type {
  Todo,
  CreateTodoInput,
  TodoFilter,
} from './features/todo/types/todo.type'
import Filters from './features/todo/components/TodoFilters'
import CreateTodoForm from './features/todo/components/CreateTodoForm'
import Button from './features/shared/components/Button'
import Modal from './features/shared/components/Modal'
import { filterTodosBy, updateTodo } from './features/todo/services/todo.service'

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [filter, setFilter] = useState<TodoFilter>({ status: 'all', priority: 'all' })

  useEffect(() => {
    const loadTodos = async () => {
      const todos = await getTodos()
      setTodos(todos)
    }
    loadTodos()
  }, [])

  function matchesFilter(todo: Todo, filter: TodoFilter): boolean {
    const statusOk = filter.status === 'all' || todo.status === filter.status
    const priorityOk = filter.priority === 'all' || todo.priority === filter.priority
    return statusOk && priorityOk
  }


  const handleCreateTodo = async (input: CreateTodoInput) => {
    const newTodo = await createTodo(input)

    setTodos((prev) => {
      if (matchesFilter(newTodo, filter))
        return [...prev, newTodo]
      else return prev
    })
    
    setIsModalOpen(false)
  }

  const handleFilterChange = async (filter: TodoFilter) => {
    const filteredTodos = await filterTodosBy(filter)
    setFilter(filter)
    setTodos(filteredTodos)
  }

  const handleUpdateTodo = async (todo: Todo) => {
    const updated = await updateTodo(todo)
    setTodos((prev) => {
      if (!matchesFilter(updated, filter)) {
        return prev.filter((item) => item.id !== updated.id)
      }
      return prev.map((item) => (item.id === updated.id ? updated : item))
    })
  }

  return (
    <div className='flex flex-col min-h-screen text-left'>
      <Header />
      <main className='flex-grow px-4 py-8'>
        <Filters filter={filter} onChange={handleFilterChange} />
        <TodoList todos={todos} onTodoChange={handleUpdateTodo} />
        <Button text='Add Todo' onClick={() => setIsModalOpen(true)} />
        {isModalOpen && (
          <Modal title='Add Todo' onClose={() => setIsModalOpen(false)}>
            <CreateTodoForm onCreate={handleCreateTodo} onCancel={() => setIsModalOpen(false)} />
          </Modal>
        )}
      </main>
      <Footer />
    </div>
  )
}