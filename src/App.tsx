import Footer from './features/core/components/Footer'
import Header from './features/core/components/Header'
import TodoList from './features/todo/components/TodoList'

export default function App() {
  return (
    <div className='flex flex-col min-h-screen text-left'>
      <Header />
      <main className='flex-grow px-4 py-8'>
        <div className='max-w-3xl mx-auto'>
          <h1 className='text-center'>Your todos</h1>
          <TodoList todos={[]} />
        </div>
      </main>
      <Footer />
    </div>
  )
}