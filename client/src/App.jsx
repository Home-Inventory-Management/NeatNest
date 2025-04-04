import './App.css'

import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'

import Homepage from './Pages/Homepage/Homepage'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Grocery from './Pages/Grocery/OrganicProductBanner'
import GroceryList from './Pages/Grocery/GroceryListManagement'
import AddGrocery from './Pages/Grocery/AddGrocery'
import EditGrocery from './Pages/Grocery/EditGrocery'

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
    path: '/grocery',
    element: <div><Header/><Grocery/></div>
  },
  {
    path: '/grocery-list',
    element: <div><Header/><GroceryList/></div>
  },
  {
    path: '/edit-grocery/:id',
    element: <div><Header/><EditGrocery/></div>
  },
  {
    path: '/add-grocery',
    element: <div><Header/><AddGrocery/></div>
  }
])

function App() {
  return (
      <div>
        <RouterProvider router={router}/>
        <Footer/>
      </div>
  )
}

export default App
