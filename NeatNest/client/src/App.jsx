import './App.css'

import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'

import Homepage from './Pages/Homepage/Homepage'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Expense from './Pages/Expense/OrganicProductBanner'
import ExpenseList from './Pages/Expense/ExpenseListManagement'
import AddExpense from './Pages/Expense/AddExpense'
import EditExpense from './Pages/Expense/EditExpense'

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
    path: '/expense',
    element: <div><Header/><Expense/></div>
  },
  {
    path: '/expense-list',
    element: <div><Header/><ExpenseList/></div>
  },
  {
    path: '/edit-expense/:id',
    element: <div><Header/><EditExpense/></div>
  },
  {
    path: '/add-expense',
    element: <div><Header/><AddExpense/></div>
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
