import React from 'react'
import { IoLocationSharp } from "react-icons/io5";
import { IoMdCheckmark } from "react-icons/io";
import ContactForm from '../../reusable/ContactForm';



const TripDetails = ({ destination }) => {
  return (
    <div className='flex flex-col gap-4 ' >
      <ItinerarySection destination={destination} />
      <Inclusions destination={destination} />
    </div>
  )
}

export default TripDetails

const ItinerarySection = ({ destination }) => {
  return (
    <div className='pt-6 text-secondary-blue '>
      <h1 className='text-xl font-bold text-secondary-blue'>Day-by-Day Itinerary</h1>

      <div className='pt-6 '>
        <div className="relative">
          {destination.days?.map((day, index) => (
            <div key={index} className="pb-6 relative pl-6 ">
              {/* Left vertical dashed line - hide for last element */}
              {index !== destination.days.length - 1 && (
                <div className="absolute left-1 top-1 bottom-0 w-px border-l border-dashed border-gray-400 z-0" />
              )}

              {/* Icon on top of the border */}
              <div className="absolute left-[-6px] top-1 z-10 bg-white rounded-full">
                <IoLocationSharp size={20} className="text-secondary-blue" />
              </div>

              {/* Content */}
              <div className="relative z-10 text-secondary-blue">
                <h2 className="text-lg font-semibold">
                  Day {index + 1}: {day.title}
                </h2>
                <p className="text-sm sm:text-base text-secondary-blue/80 max-w-1xl text-justify  ">{day.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}





const Inclusions = ({ destination }) => {
  console.log("Inclusions array:", destination.inclusions);

  return (
    <div className="p-4 text-secondary-blue md:max-w-[337.6px]">
      <h2 className="text-lg font-bold mb-2">Inclusions</h2>
      <div className="grid grid-cols-2 gap-x-0 gap-y-1">
        {destination.inclusions?.map((inclusion, index) => (
          <div key={index} className="flex items-center gap-1">
            <IoMdCheckmark size={16} className="shrink-0" />
            <p className="text-base">{inclusion}</p>
          </div>
        ))}
      </div>
    </div>
  );
};


