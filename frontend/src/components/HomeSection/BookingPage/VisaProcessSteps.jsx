import React from 'react'
import { visaProcessStepsData } from '../../../data/HomeSection/visaProcessStepsData'

const VisaProcessSteps = () => {
  return (
    <div className='px-4 py-13'>
      <h2 className="text-2xl font-bold mb-8 text-center pb-6">
        Smart, Simple, Secured. Visa Booking with Rukn Travels
      </h2>
       <div className="flex flex-col md:flex-row justify-between items-center gap-6 px-12">
                {visaProcessStepsData.map((step, index) => (
                    <SingleProcessSteps key={index} {...step} />
                ))}
            </div>
    </div>
  )
}

export default VisaProcessSteps




const SingleProcessSteps = ({ icon,step}) => {
  return (
    <div className="w-40 h-40 bg-[#4A94D0]/20 rounded-full flex flex-col items-center justify-center">
  <img src={icon} alt="" className="w-12 h-12 mb-2" /> {/* Optional: adjust size/margin */}
<p className="max-w-[110px] text-xs text-secondary-blue text-center trim-cap-height leading-[18px]">{step}</p></div>

  )
}
