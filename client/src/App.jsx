import './App.css'
import Homepage from './Pages/Homepage/Homepage'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'

import{
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <div><Login/></div>
  },
  {
    path: '/register',
    element: <div><Register/></div>
  },
  {
    path: '/homepage',
    element: <div><Homepage/></div>
  },
])

function App() {
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
