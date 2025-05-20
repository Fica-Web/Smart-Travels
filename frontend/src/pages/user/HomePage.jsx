import React from 'react'
import Hero from '../../components/HomeSection/HomePage/Hero'
import Destination from '../../components/HomeSection/HomePage/Destination'
import ChooseUs from '../../components/HomeSection/HomePage/ChooseUs'
import BlogSection from '../../components/HomeSection/HomePage/BlogSection'
import Services from '../../components/HomeSection/HomePage/Services'

const HomePage = () => {
    return (
        <div className='pb-15'>
            <Hero />
            <Destination />
            <Services />
            <ChooseUs />
            <BlogSection isHomePage={true}  />


        </div>
    )
}

export default HomePage
