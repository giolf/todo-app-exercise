import type { Todo } from '../types/todo.type'


const STORAGE_KEY = 'todos'


export function loadTodos(): Todo[] {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (raw === null) return []
  return JSON.parse(raw) as Todo[]
}

export function saveTodos(todos: Todo[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
}