import type {
  CreateTodoInput,
  TodoFilter,
  Todo,
} from '../types/todo.type.ts'

import { fetchTodos as fetchCachedTodos, saveTodos as saveCachedTodos } from '../repositories/localStorage.repository.ts'



const BASE_URL = "http://localhost:3000/api/todos"

export async function getTodos(): Promise<Todo[]> {

  const response = await fetch(BASE_URL)
  if (!response.ok) {
    throw new Error(`Failed to fetch todos: ${response.statusText}`)
  }

  return response.json()
}

export async function createTodo(input: CreateTodoInput): Promise<Todo> {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  })

  if (!response.ok) {
    throw new Error(`Failed to create todo: ${response.statusText}`)
  }

  return response.json()
}

export async function filterTodosBy(
  filter: TodoFilter,
): Promise<Todo[]> {
  const todos = fetchCachedTodos()
  return todos.filter((todo) =>
    (Object.entries(filter) as [keyof TodoFilter, TodoFilter[keyof TodoFilter]][]).every(
      ([property, value]) => value === 'all' || todo[property] === value,
    ),
  )
}

export async function updateTodo(updated: Todo): Promise<Todo> {
  const todos = fetchCachedTodos()
  const updatedTodos = todos.map((todo) =>
    todo.id === updated.id ? updated : todo,
  )

  saveCachedTodos(updatedTodos)
  return updated
}

