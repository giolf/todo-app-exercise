import Footer from './features/core/components/Footer'
import Header from './features/core/components/Header'
import { todoRoutes } from './features/todo/routes/todo.routes.ts'
import { RouterProvider } from 'react-router'


export default function App() {
  return (
    <div className='flex flex-col min-h-screen text-left'>
      <Header />
      <main className='flex-grow px-4 py-8'>      
        <RouterProvider router={todoRoutes} />
        </main>
      <Footer />
    </div>
  )
}
