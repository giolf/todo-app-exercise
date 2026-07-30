export type TodoStatus = 'todo' | 'in_progress' | 'done' | 'blocked'
export type TodoPriority = 'low' | 'medium' | 'high'
export type TodoKind = 'standard' | 'work' | 'learning'
export type TodoType = Todo | WorkTodo | LearningTodo

export const TODO_STATUSES: TodoStatus[] = ['todo', 'in_progress', 'done', 'blocked']
export const TODO_PRIORITIES: TodoPriority[] = ['low', 'medium', 'high']

export type Todo = {
  id: number
  title: string
  description: string
  completed: boolean
  status: TodoStatus
  priority: TodoPriority
}

export type LearningTodo = Todo & {
  kind: Extract<TodoKind, 'learning'>
  topic: string
  resourceUrl?: string
}

export type WorkTodo = Todo & {
  kind: Extract<TodoKind, 'work'>
  assignee: string
  project: string
}

