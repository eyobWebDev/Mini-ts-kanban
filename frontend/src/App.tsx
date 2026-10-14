import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import { Toaster } from 'sonner'

function App() {

  return (
    <div className='w-full'>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      <Toaster position='top-center' />

    </div>
  )
}

export default App
