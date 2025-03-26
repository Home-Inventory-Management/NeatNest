import React from 'react'
import Hero from './Hero'
import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer'
import Overview from './Overview'
import Inventorytable from './Inventorytable'
import Recommendations from './Recommendations'
import RecentActivity from './RecentActivity'
import ConsumptionGraphs from './ConsumptionGraphs'

const Homepage = () => {
  return (
    <div>
      <Header/>
      <Hero/>
      <Overview/>
      <Inventorytable/>
      <Recommendations/>
      <RecentActivity/>
      <ConsumptionGraphs/>
      <Footer/>
    </div>
    
  )
}

export default Homepage