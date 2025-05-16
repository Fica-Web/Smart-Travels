import React from 'react'
import AboutUs from '../../components/HomeSection/AboutPage/AboutUs'
import ReusableHero from '../../components/reusable/ReusableHero'
import ChooseUs from '../../components/HomeSection/HomePage/ChooseUs'

const AboutPage = () => {
  return (
    <div>
          <ReusableHero 
                title="About"
            />
        <AboutUs />
        <ChooseUs />
    </div>
  )
}

export default AboutPage