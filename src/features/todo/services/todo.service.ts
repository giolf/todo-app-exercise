import type {
  CreateTodoInput,
  TodoFilter,
  Todo,
} from '../types/todo.type.ts'


const BASE_URL = "http://localhost:3000/api"

const DEFAULT_HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
}

async function apiCall<T>(
  endpoint: string,
  method: "GET" | "POST" | "PATCH" = "GET",
  body?: unknown
): Promise<T> {
  const options: RequestInit = {
    method,
    headers: DEFAULT_HEADERS,
  }

  if (body) {
    options.body = JSON.stringify(body)
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, options)

  if (!response.ok) {
    throw new Error(`Failed to ${method} ${endpoint}: ${response.statusText}`)
  }

  return response.json()
}

export async function getTodos(): Promise<Todo[]> {
  return apiCall<Todo[]>("/todos")
}

export async function createTodo(input: CreateTodoInput): Promise<Todo> {

  return apiCall<Todo>("/todos", "POST", input)

}

export async function filterTodosBy(
  filter: TodoFilter,
): Promise<Todo[]> {

  const params = new URLSearchParams()

  for (const [key, value] of Object.entries(filter)) {
    if (value !== 'all') {
      params.set(key, value)
    }
  }

  const query = params.toString()

  return apiCall<Todo[]>(query ? `/todos?${query}` : "/todos")
}

export async function updateTodo(updated: Todo): Promise<Todo> {

  return apiCall<Todo>(`/todos/${updated.id}`, "PATCH",
    {
      status: updated.status,
      priority: updated.priority,
    }
  )
}

