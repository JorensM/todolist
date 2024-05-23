// Core
import { RouterProvider } from 'react-router-dom'

// Util
import router from './router'
import useFoldersStore from './state/foldersStore'
import useTodoItemsStore from './state/todoItemsStore';
import { useEffect } from 'react';


function App() {

  const initFoldersStore = useFoldersStore(state => state.init);
  const initTodoItemsStore = useTodoItemsStore(state => state.init);

  useEffect(() => {
    initFoldersStore();
    initTodoItemsStore();
  })
  
  return (
    <div className='h-full'>
      <RouterProvider
        router={router}
      />
    </div>
  )
}

export default App
