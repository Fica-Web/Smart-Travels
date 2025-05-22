import React from 'react'
import ReusableHero from '../../components/reusable/ReusableHero'
import TopIcons from '../../components/HomeSection/BookingPage/TopIcons'
import img from '../../assets/image/booking/booking-hero.jpg'

const BookingPage = () => {
  return (
    <div>
      <ReusableHero
        title="Start Your Journey – Book Now"
        bgImage={img}
      />
      <div className="relative md:-mt-8 md:z-10">
        <TopIcons />
      </div>

    </div>
  )
}

export default BookingPage