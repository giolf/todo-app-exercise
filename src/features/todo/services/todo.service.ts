import type {
  // CreateTodoInput,
  // TodoFilter,
  // TodoPriority,
  // TodoStatus,
  Todo,
} from '../types/todo.type.ts'
// import todos from './../../../todos.json' 

export async function fetchTodos(): Promise<Todo[]> {
  const response = await fetch('/todos.json')
  if (!response.ok) {
    throw new Error('Failed to fetch todos')
  }
  const data = await response.json()
  console.log(data)
  return data.todos as Todo[]
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

