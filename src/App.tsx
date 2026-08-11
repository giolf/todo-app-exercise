import Footer from './features/core/components/Footer'
import Header from './features/core/components/Header'
import TodoList from './features/todo/components/TodoList'
import { getTodos, createTodo } from './features/todo/services/todo.service.ts'
import { useEffect, useState } from 'react'
import type { Todo, CreateTodoInput } from './features/todo/types/todo.type'
import Filters from './features/todo/components/TodoFilters'
import CreateTodoForm from './features/todo/components/CreateTodoForm'
import Button from './features/shared/components/Button'
import Modal from './features/shared/components/Modal'

export default function App() {
const [todos, setTodos] = useState<Todo[]>([])
const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const loadTodos = async () => {
      const todos = await getTodos()
      setTodos(todos)
    }
    loadTodos()
  }, [])

  const handleCreateTodo = (input: CreateTodoInput) => {
    setTodos((prev) => createTodo(input, prev))
    setIsModalOpen(false)
  }

  return (
    <div className='flex flex-col min-h-screen text-left'>
      <Header />
      <main className='flex-grow px-4 py-8'>
        <Filters filter={{ status: 'all', priority: 'all' }} onChange={() => {}} />
        <TodoList todos={todos} />
        <Button text='Add Todo' onClick={() => setIsModalOpen(true)} />
        {isModalOpen && ( 
        <Modal title='Add Todo' onClose={() => setIsModalOpen(false) }>
          <CreateTodoForm onCreate={handleCreateTodo } onCancel={() => setIsModalOpen(false) } />
        </Modal>
        )}
      </main>
      <Footer />
    </div>
  )
}