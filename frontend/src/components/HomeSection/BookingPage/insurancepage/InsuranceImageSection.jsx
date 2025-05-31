import React from 'react'
import img from '../../../../assets/image/booking/insurance/insuranceimg.png'

const InsuranceImageSection = () => {
  return (
     <div className="relative w-full my-15">
     <img src={img} alt=" insurance" className="w-full h-auto object-cover" />

  <div className="absolute top-0 left-0 h-full w-1/4 rounded-l-[20px] pointer-events-none"
     style={{
       background: 'linear-gradient(to right, rgba(74, 148, 208, 0.8) 0%, rgba(255, 255, 255, 0) 100%)'
     }}
/>


   
     <div className="absolute top-11 md:top-1/2 left-3 md:left-1 lg:left-8 transform md:-translate-y-1/2 text-white max-w-md md:max-w-lg md:px-5 lg:px-10">
   <h2 className="font-bold text-sm md:text-[34px] leading-tight md:leading-[42px]  capitalize pb-1 md:pb-3 max-w-[20ch] md:max-w-[36ch]">
         Travel Confidently with Our Insurance Plans
       </h2>
   <p className="hidden sm:block text-xl leading-[28px] max-w-[40ch] ">
         Get worry-free travel protection for every adventure — from family trips to solo getaways.
       </p>
     </div>
   </div>
  )
}

export default InsuranceImageSection