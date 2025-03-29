import './App.css'
import Homepage from './Pages/Homepage/Homepage'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import InventoryDashboard from './Pages/InventoryManagement/InventoryDashboard'
import AddInventory from './Pages/InventoryManagement/AddInventory'
import InventoryList from './Pages/InventoryManagement/InventoryList'

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
  {
    path: '/inventorydashboard',
    element: <div><InventoryDashboard/></div>
  },
  {
    path: '/addinventory',
    element: <div><AddInventory/></div>
  },
  {
    path: '/inventorylist',
    element: <div><InventoryList/></div>
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
