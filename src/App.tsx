import { RouterProvider } from 'react-router-dom'
import router from './components/router'
import "./App.css"

const App = () => {

  return (
    <>
      <main className='font-[tajawal] bg-page-pic' >
        <RouterProvider router={router} />
      </main>
    </>
  )
}

export default App
