import React from 'react'
import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer'
import InventoryDashboard from './InventoryDashboard'

const InventoryManagement = () => {
  return (
    <div>
        <Header/>
        <InventoryDashboard/>
        <Footer/>
    </div>
  )
}

export default InventoryManagement
