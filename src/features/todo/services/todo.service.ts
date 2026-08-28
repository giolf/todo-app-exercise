import type {
  CreateTodoInput,
  TodoFilter,
  Todo,
} from '../types/todo.type.ts'

import { fetchTodos as fetchCachedTodos, saveTodos as saveCachedTodos } from '../repositories/localStorage.repository.ts'
import { fetchTodos as fetchTodosFromJson } from '../repositories/jsonFile.repository.ts'



export async function getTodos(): Promise<Todo[]> {
  const cachedTodos = fetchCachedTodos()

  if (cachedTodos.length > 0) return cachedTodos

  const todosFromJson = await fetchTodosFromJson()
  saveCachedTodos(todosFromJson)
  return todosFromJson 
  
}

function nextId(todos: Todo[]):number {
  if (todos.length === 0) return 1
  return Math.max(...todos.map(todo=>todo.id)) + 1
}

export async function createTodo(input: CreateTodoInput): Promise<Todo> {
  const todos = fetchCachedTodos()
  const newTodo: Todo = {
    ...input,
    id: nextId(todos),
    status: 'todo',
    completed: false,
  }

  saveCachedTodos([...todos, newTodo])
  console.log('newTodo', newTodo)
  return newTodo
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

