import React from 'react'
import SectionHeading from '../../reusable/SectionHeading'
import { servicesData  } from '../../../data/HomeSection/servicesData'
import { ArrowUpRight } from 'lucide-react'

const Services = () => {
  return (
    <div className='px-4 md:px-20'>
        <SectionHeading
        backgroundText="OUR SERVICES"
        heading="What We Offer"
        subtext="From the moment you start planning to the moment you board your flight, we take care of every little detail to ensure a smooth, stress-free, and unforgettable travel experience."
      />
      <div className="flex flex-col md:flex-row w-full gap-6 mt-1 md:mt-11 pt-5  md:p-0">

   {/* Column 1 */}
<div className="flex flex-col gap-6 w-full md:w-1/3">

      {servicesData.slice(0, 2).map((item, index) => (
        <div
          key={index}
          className="relative rounded-3xl overflow-hidden shadow-lg group transition-transform duration-300 hover:scale-105 bg-red-400"
        >
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-[400px] object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent p-4 flex flex-col justify-end">
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

      <div className="relative rounded-3xl overflow-hidden shadow-lg group transition-transform duration-300 hover:scale-105">
        <img
          src={servicesData[2].imageUrl}
          alt={servicesData[2].title}
          className="w-full h-[500px] object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent p-4 flex flex-col justify-end">
          <h3 className="text-white text-xl font-bold">{servicesData[2].title}</h3>
          <p className="text-white text-sm">{servicesData[2].description}</p>
        </div>
        <button className="absolute top-3 right-3 bg-white/90 hover:bg-white text-black rounded-full p-2">
          <ArrowUpRight size={18} />
        </button>
      </div>
      <div className="relative rounded-2xl overflow-hidden shadow-lg group transition-transform duration-300 hover:scale-105">
        <img
          src={servicesData[3].imageUrl}
          alt={servicesData[3].title}
          className="w-full h-[300px] object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-4 flex flex-col justify-end">
          <h3 className="text-white text-xl font-bold">{servicesData[3].title}</h3>
          <p className="text-white text-sm">{servicesData[3].description}</p>
        </div>
        <button className="absolute top-3 right-3 bg-white/90 hover:bg-white text-black rounded-full p-2">
          <ArrowUpRight size={18} />
        </button>
      </div>
    </div>

    {/* Column 3 */}
   {/* Column 1 */}
<div className="flex flex-col gap-6 w-full md:w-1/3">
      {servicesData.slice(4, 6).map((item, index) => (
        <div
          key={index}
          className="relative rounded-3xl overflow-hidden shadow-lg group transition-transform duration-300 hover:scale-105"
        >
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-[400px] object-cover group-hover:scale-110 transition-transform duration-300"
          />

           <button className="absolute top-3 right-3 bg-white/90 hover:bg-white text-black rounded-full p-2">
            <ArrowUpRight size={18} />
          </button> 
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent p-4 flex flex-col justify-end">
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

export default Services