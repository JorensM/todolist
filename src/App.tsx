// Core
import { RouterProvider } from 'react-router-dom'

// Util
import router from './router'


function App() {

  return (
    <div className='h-full'>
      <RouterProvider
        router={router}
      />
    </div>
  )
}

export default App
