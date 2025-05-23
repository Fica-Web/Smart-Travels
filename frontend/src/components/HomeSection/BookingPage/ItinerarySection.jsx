import React from 'react'
import { IoLocationSharp } from "react-icons/io5";

const ItinerarySection = ({ destination }) => {
  return (
    <div className='pt-6 text-secondary-blue'>
      <h1 className='text-xl font-bold'>Day-by-Day Itinerary</h1>
      <div className='pt-6'>
  {destination.days?.map((day, index) => (


<div className="relative pl-6">
  {destination.days?.map((day, index) => (
    <div key={index} className="mb-6 relative border-l border-dashed border-gray-400 pl-6">
      {/* Location icon */}
      <div className="absolute -left-3 top-0  p-1 ">
        <IoLocationSharp className="" size={18} />
      </div>

      <h2 className="text-lg font-semibold">Day {index + 1}: {day.title}</h2>
      <p className="text-gray-600">{day.description}</p>
    </div>
  ))}
</div>

  ))}
</div>

    </div>
  )
}

export default ItinerarySection