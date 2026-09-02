import type {
  CreateTodoInput,
  TodoFilter,
  Todo,
} from '../types/todo.type.ts'


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

  const params = new URLSearchParams()

  console.log(params)

  for (const [key, value] of Object.entries(filter)) {
    if (value !== 'all') {
      params.set(key, value)
    }
  }

  console.log(params)

  const query = params.toString()
  const url = query ? `${BASE_URL}?${query}` : BASE_URL
  console.log(url)
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Failed to filter todos: ${response.statusText}`)
  }

  return response.json()
}


export async function updateTodo(updated: Todo): Promise<Todo> {
  const response = await fetch(`${BASE_URL}/${updated.id}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      status: updated.status,
      priority: updated.priority,
    }),
  })

  if (!response.ok) {
    throw new Error(`Failed to update todo: ${response.statusText}`)
  }

  return response.json()
}

