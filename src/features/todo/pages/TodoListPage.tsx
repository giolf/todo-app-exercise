import { useEffect, useState } from 'react'
import type {
  Todo,
  CreateTodoInput,
  TodoFilter,
} from '../types/todo.type'
import Filters from '../components/TodoFilters'
import CreateTodoForm from '../components/CreateTodoForm'
import TodoList from '../components/TodoList'
import Button from '../../shared/components/Button'
import Modal from '../../shared/components/Modal'
import {
  getTodos,
  createTodo,
  filterTodosBy,
  updateTodo,
} from '../services/todo.service'

export default function TodoListPage() {
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
    <>
      <Filters filter={filter} onChange={handleFilterChange} />
      <TodoList todos={todos} onTodoChange={handleUpdateTodo} />
      <Button text='Add Todo' onClick={() => setIsModalOpen(true)} />
      {isModalOpen && (
        <Modal title='Add Todo' onClose={() => setIsModalOpen(false)}>
          <CreateTodoForm onCreate={handleCreateTodo} onCancel={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </>
  )
}
