import React from 'react'
import Navbar from '../screen/landing/Navbar'
import HeroSection from '../screen/landing/HeroSection'
import Footer from '../screen/landing/Footer'
import SportsBook from '../screen/landing/SportsBook'
import StatsSection from '../screen/landing/StatsSection'
import CardGames from '../screen/landing/CardGames'
import ExchangeGames from '../screen/landing/ExchangeGames'

const LandingPage = () => {
  return (
    <div className='bg-black'>
      <Navbar />
      <HeroSection />
      <SportsBook />
      <CardGames />
      <ExchangeGames />
      <StatsSection />
      <Footer />
    </div>
  )
}

export default LandingPage
