import type { Todo } from '../types/todo.type'


export async function loadTodos(): Promise<Todo[]> {
const response = await fetch('/todos.json')

if (!response.ok) {
  throw new Error('Failed to fetch todos')
}

const data = await response.json()
return data.todos as Todo[]
}