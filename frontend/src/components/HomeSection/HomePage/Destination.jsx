import React from 'react'
import SectionHeading from '../../reusable/SectionHeading'
import { destinations } from '../../../data/HomeSection/destinationData'
import { ArrowUpRight } from 'lucide-react'

const Destination = () => {
  return (
 <div className="px-4 md:px-20 ">
  <SectionHeading
    backgroundText="Destination"
    heading="Featured Destinations"
    subtext="Handpicked travel experiences to the most iconic, breathtaking, and exciting locations. Choose your next adventure and start making memories today."
  />

  {/* 3-column custom layout */}
 <div className="flex flex-col md:flex-row w-full gap-6 mt-1 md:mt-11 pt-5  md:p-0">

    {/* Column 1 */}
   {/* Column 1 */}
<div className="flex flex-col gap-6 w-full md:w-1/3">

      {destinations.slice(0, 2).map((item, index) => (
        <div
          key={index}
          className="relative rounded-2xl overflow-hidden shadow-lg group transition-transform duration-300 hover:scale-105"
        >
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-[400px] object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-4 flex flex-col justify-end">
            <h3 className="text-white text-xl font-bold">{item.title}</h3>
            <p className="text-white text-sm">{item.description}</p>
          </div>
          <button className="absolute top-3 right-3 bg-white/90 hover:bg-white text-black rounded-full p-2">
            <ArrowUpRight size={18} />
          </button>
        </div>
      ))}
    </div>

    {/* Column 2 - middle column with taller first image */}
   {/* Column 1 */}
<div className="flex flex-col gap-6 w-full md:w-1/3">

      <div className="relative rounded-2xl overflow-hidden shadow-lg group transition-transform duration-300 hover:scale-105">
        <img
          src={destinations[2].imageUrl}
          alt={destinations[2].title}
          className="w-full h-[500px] object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-4 flex flex-col justify-end">
          <h3 className="text-white text-xl font-bold">{destinations[2].title}</h3>
          <p className="text-white text-sm">{destinations[2].description}</p>
        </div>
        <button className="absolute top-3 right-3 bg-white/90 hover:bg-white text-black rounded-full p-2">
          <ArrowUpRight size={18} />
        </button>
      </div>
      <div className="relative rounded-2xl overflow-hidden shadow-lg group transition-transform duration-300 hover:scale-105">
        <img
          src={destinations[3].imageUrl}
          alt={destinations[3].title}
          className="w-full h-[300px] object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-4 flex flex-col justify-end">
          <h3 className="text-white text-xl font-bold">{destinations[3].title}</h3>
          <p className="text-white text-sm">{destinations[3].description}</p>
        </div>
        <button className="absolute top-3 right-3 bg-white/90 hover:bg-white text-black rounded-full p-2">
          <ArrowUpRight size={18} />
        </button>
      </div>
    </div>

    {/* Column 3 */}
   {/* Column 1 */}
<div className="flex flex-col gap-6 w-full md:w-1/3">
      {destinations.slice(4, 6).map((item, index) => (
        <div
          key={index}
          className="relative rounded-2xl overflow-hidden shadow-lg group transition-transform duration-300 hover:scale-105"
        >
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-[400px] object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-4 flex flex-col justify-end">
            <h3 className="text-white text-xl font-bold">{item.title}</h3>
            <p className="text-white text-sm">{item.description}</p>
          </div>
          <button className="absolute top-3 right-3 bg-white/90 hover:bg-white text-black rounded-full p-2">
            <ArrowUpRight size={18} />
          </button>
        </div>
      ))}
    </div>
  </div>
</div>


  )
}


export default Destination
