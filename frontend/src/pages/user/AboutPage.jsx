import React from 'react'
import AboutUs from '../../components/HomeSection/AboutPage/AboutUs'
import ReusableHero from '../../components/reusable/ReusableHero'
import ChooseUs from '../../components/HomeSection/HomePage/ChooseUs'
import img from '../../assets/image/about/about-hero.jpg'
import Services from '../../components/HomeSection/HomePage/Services'

const AboutPage = () => {
  return (
    <div className='pb-15'>
          <ReusableHero 
                title="About"
                bgImage={img}
            />
        <AboutUs />
        <Services />
        <ChooseUs />
    </div>
  )
}

export default AboutPage