import React from 'react'
import Navbar from '../screen/landing/Navbar'
import HeroSection from '../screen/landing/HeroSection'
import Footer from '../screen/landing/Footer'
import SportsBook from '../screen/landing/SportsBook'
import StatsSection from '../screen/landing/StatsSection'

const LandingPage = () => {
  return (
    <div className='bg-black'>
      <Navbar />
      <HeroSection />
      <SportsBook />
      <StatsSection />
      {/* <Footer /> */}
    </div>
  )
}

export default LandingPage
