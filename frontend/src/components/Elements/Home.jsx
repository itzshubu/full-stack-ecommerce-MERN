import React from 'react'
import Hero from './HomesElement/Hero'
import TopsellingProducts from "./HomesElement/topSellingProducts"
import TopProducts from './HomesElement/TopProducts'
import Banner from './HomesElement/Banner'
import Testimonial from './HomesElement/Testimonial'
const Home = () => {
  return (
    <div>
      <Hero/>
      <TopsellingProducts/>
      <TopProducts/>
      <Banner/>
      <Testimonial/>
      </div>
  )
}

export default Home