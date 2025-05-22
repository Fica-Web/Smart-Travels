import React from 'react'
import ReusableHero from '../../components/reusable/ReusableHero'
import img from '../../assets/image/booking/booking-hero.jpg'

const BookingPage = () => {
  return (
    <div>
       <ReusableHero 
                title="Blog"
                bgImage={img}
            />
    </div>
  )
}

export default BookingPage