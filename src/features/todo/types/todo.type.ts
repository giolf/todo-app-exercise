export type TodoStatus = 'todo' | 'in_progress' | 'done' | 'blocked'
export type TodoPriority = 'low' | 'medium' | 'high'
export type TodoKind = 'standard' | 'work' | 'learning'
export type Todo = BaseTodo | WorkTodo | LearningTodo
export type TodoFilter = {
  status: TodoStatus | 'all'
  priority: TodoPriority | 'all'
}

export const TODO_STATUSES: TodoStatus[] = ['todo', 'in_progress', 'done', 'blocked']
export const TODO_PRIORITIES: TodoPriority[] = ['low', 'medium', 'high']

export type BaseTodo = {
  id: number
  title: string
  description: string
  completed: boolean
  status: TodoStatus
  priority: TodoPriority
}

export type LearningTodo = BaseTodo & {
  kind: Extract<TodoKind, 'learning'>
  topic: string
  resourceUrl?: string
}

export type WorkTodo = BaseTodo & {
  kind: Extract<TodoKind, 'work'>
  assignee: string
  project: string
}


type CreateTodoBase = {
  title: string
  description: string
  priority: TodoPriority
}

export type CreateTodoInput =
  | (CreateTodoBase & { kind: 'standard' })
  | (CreateTodoBase & { kind: 'work'; assignee: string; project: string })
  | (CreateTodoBase & { kind: 'learning'; topic: string; resourceUrl?: string })

