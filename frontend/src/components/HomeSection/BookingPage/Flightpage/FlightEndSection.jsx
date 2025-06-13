import React from 'react'
import img from '../../../../assets/image/booking/flight/flightendimg.png'

const FlightEndSection = () => {
  return (
    <div className="relative hidden sm:block w-full py-2">
  <img src={img} alt="Flight Background" className="w-full h-auto object-cover" />

  <div className="absolute top-11 md:top-1/2 left-3 md:left-1 lg:left-8 transform md:-translate-y-1/2 text-white max-w-md md:max-w-lg md:px-5 lg:px-10">
<h2 className="font-bold text-sm md:text-[34px] leading-tight md:leading-[42px]  capitalize pb-1 md:pb-3 max-w-[20ch] md:max-w-[36ch]">
      Your Journey Starts with Comfort & Confidence
    </h2>
<p className="hidden sm:block text-lg leading-[28px] max-w-[40ch] ">
      We make flight bookings smooth, secure, and budget-friendly — so you can focus on the adventure ahead.
    </p>
  </div>
</div>

  )
}

export default FlightEndSection
