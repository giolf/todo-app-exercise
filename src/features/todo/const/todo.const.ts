import type { TodoStatus, TodoPriority, TodoKind } from '../types/todo.type'

export const TODO_STATUSES: TodoStatus[] = ['todo', 'in_progress', 'done', 'blocked']
export const TODO_PRIORITIES: TodoPriority[] = ['low', 'medium', 'high']

export const STATUS_LABELS: Record<TodoStatus, string> = {
    todo: 'To do',
    in_progress: 'In progress',
    done: 'Done',
    blocked: 'Blocked',
  }

  export const KIND_LABELS: Record<TodoKind, string> = {
    work: 'Work',
    learning: 'Learning',
    standard: 'Standard',
  }