import type {
  CreateTodoInput,
  TodoFilter,
  // TodoPriority,
  // TodoStatus,
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
  properties: (keyof Pick<Todo, 'status' | 'priority'>)[],
  values: Array<TodoFilter[keyof TodoFilter]>,
): Promise<Todo[]> {
  const todos = fetchCachedTodos()
  return todos.filter((todo) => properties.every((property, i) => {
    const value = values[i]
    return value === 'all' || todo[property] === value
  }))
}


// function nextId(todos: TodoType[]): number {
//   if (todos.length === 0) return 1
//   return Math.max(...todos.map((todo) => todo.id)) + 1
// }

// export function createTodo(
//   input: CreateTodoInput,
//   todos: TodoType[],
// ): TodoType {
//   return {
//     ...input,
//     id: nextId(todos),
//     status: 'todo',
//     completed: false,
//   }
// }

// export function filterTodos(
//   todos: TodoType[],
//   filter: TodoFilter,
// ): TodoType[] {
//   return todos.filter((todo) => {
//     const statusOk =
//       filter.status === 'all' || todo.status === filter.status
//     const priorityOk =
//       filter.priority === 'all' || todo.priority === filter.priority
//     return statusOk && priorityOk
//   })
// }

// export function updateStatus(
//   todos: TodoType[],
//   id: number,
//   status: TodoStatus,
// ): TodoType[] {
//   return todos.map((todo) => {
//     if (todo.id !== id) return todo


//     return {
//       ...todo,
//       status: status,
//     }
//   })
// }

// export function updatePriority(
//   todos: TodoType[],
//   id: number,
//   priority: TodoPriority,
// ): TodoType[] {
//   return todos.map((todo) =>
//     todo.id === id ? { ...todo, priority } : todo,
//   )
// }

// export function deleteTodo(todos: TodoType[], id: number): TodoType[] {
//   return todos.filter((todo) => todo.id !== id)
// }

