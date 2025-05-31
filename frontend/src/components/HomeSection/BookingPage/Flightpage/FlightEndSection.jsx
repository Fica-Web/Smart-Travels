import React from 'react'
import img from '../../../../assets/image/booking/flight/flightendimg.png'

const FlightEndSection = () => {
  return (
    <div className="relative w-full py-2">
      <img src={img} alt="Flight Background" className="w-full h-auto object-cover" />

      <div className="absolute top-1/2 left-8 transform -translate-y-1/2 text-white max-w-lg px-10">
        <h2 className="font-bold text-[34px] leading-[42px] tracking-normal capitalize pb-3">Your Journey Starts with Comfort & Confidence</h2>
        <p className="text-lg leading-[28px] max-w-lg ">
  We make flight bookings smooth, secure,<br /> and budget-friendly — so you can focus on <br />the adventure ahead.
</p>

      </div>
    </div>
  )
}

export default FlightEndSection
