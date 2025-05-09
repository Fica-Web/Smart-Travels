import React from 'react'
import SectionHeading from '../../reusable/SectionHeading'
import { destinations } from '../../../data/HomeSection/destinationData'
import { ArrowUpRight } from 'lucide-react'

const Destination = () => {
  return (
    <div className="px-6">
      <SectionHeading
        backgroundText="Destination"
        heading="Featured Destinations"
        subtext="Handpicked travel experiences to the most iconic, breathtaking, and exciting locations. Choose your next adventure and start making memories today."
      />

      {/* Masonry-like layout */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 mt-14 pt-5">
        {destinations.map((item, index) => (
          <div
            key={index}
            className="relative rounded-2xl overflow-hidden shadow-lg group transform transition-transform duration-300 hover:scale-105"
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-110"
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
  )
}

export default Destination
