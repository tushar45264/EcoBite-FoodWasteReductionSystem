import React from 'react'
import Header from './Header'
import Top from './top'
import Quote from './quote'
import MapService from './mapService'
import ChatSection from './chatService'
import TestimonialsSection from './TestimonialsSection'
import Footer from './Footer'

const Home = () => {
  return (
    <div className=' h-screen'>
        <Header />
        <Top />
        <MapService />
        <ChatSection />
        <Quote />
        <TestimonialsSection />
        <Footer />
    </div>
  )
}

export default Home