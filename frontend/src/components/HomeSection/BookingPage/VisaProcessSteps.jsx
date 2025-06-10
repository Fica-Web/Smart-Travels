import React from 'react'
import { visaProcessStepsData } from '../../../data/HomeSection/visaProcessStepsData'
import CircleIconLabel from '../../../components/reusable/CircleIconLabel'

const VisaProcessSteps = () => {
  return (
    <div className='lg:px-1 py-13 '>
      <h2 className="text-2xl font-bold mb-8 text-center pb-6">
        Smart, Simple, Secured. Visa Booking with Rukn Travels
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 place-items-center gap-3 md:gap-4 lg:gap-6 px-1 md:px-1 lg:px-4">
        {visaProcessStepsData.map((step, index) => (
          <div
            key={index}
            className={`w-full flex justify-center ${index === 4 ? 'col-span-2 md:col-span-1' : ''}`}
          >


            <CircleIconLabel {...step} />
          </div>
        ))}
      </div>


    </div>
  )
}

export default VisaProcessSteps




