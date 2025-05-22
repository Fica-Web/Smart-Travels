import React from 'react'
import ReusableHero from '../../components/reusable/ReusableHero'
import img from '../../assets/image/booking/booking-hero.jpg'


const Contactpage = () => {
  return (
    <div>
       <ReusableHero
        title="Get in Touch with Us"
        bgImage={img}
      />

    </div>
  )
}

export default Contactpage