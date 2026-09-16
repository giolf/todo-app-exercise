import { createBrowserRouter } from 'react-router'
import TodoDetailPage from '../pages/TodoDetailPage'
import TodoListPage from '../pages/TodoListPage'

export const todoRoutes = createBrowserRouter([
  {
    path: '/',
    Component: TodoListPage,
  },
  {
    path: '/:id',
    Component: TodoDetailPage,
  },
])
