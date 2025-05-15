import React from 'react'
import AboutUs from '../../components/HomeSection/AboutPage/AboutUs'
import ReusableHero from '../../components/reusable/ReusableHero'

const AboutPage = () => {
  return (
    <div>
          <ReusableHero 
                title="About"
            />
        <AboutUs />
    </div>
  )
}

export default AboutPage