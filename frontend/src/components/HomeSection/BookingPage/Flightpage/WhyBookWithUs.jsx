import React from 'react'
import CircleIconLabel from '../../../../components/reusable/CircleIconLabel'
import { whyBookWithUsData } from '../../../../data/HomeSection/whyBookWithUsData'


const WhyBookWithUs = () => {
  return (
     <div className='md:px-10 lg:px-12 py-13 ' >
      <h2 className="text-2xl font-bold mb-8 text-center pb-6 text-secondary-blue">
        Why Booking With Us
      </h2>
       <div className="grid grid-cols-2  md:grid-cols-4 place-items-center  gap-3 px-1 lg:px-18  ">
               {whyBookWithUsData.map(({ icon, step }, index) => (
  <CircleIconLabel key={index} icon={icon} step={step} index={index} page="flight" />
))}
            </div>
    </div>
  )
}

export default WhyBookWithUs