import React from 'react'
import { useRef, useState ,useEffect} from 'react';
import SectionHeading from '../../reusable/SectionHeading'
// import { destinations } from '../../../data/HomeSection/destinationData'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { getPublishedDestinationsApi } from '../../../services/api/destinationApi';

const Destination = () => {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [destinations, setDestinations] = useState([]);

useEffect(() => {
  const fetchDestinations = async () => {
    const result = await getPublishedDestinationsApi();
    console.log("Fetched destinations:", result.data);
    if (result.success) {
      setDestinations(result.data.destinations || []);

    } else {
      console.error('Failed to load destinations:', result.message);
    }
  };

  fetchDestinations();
}, []);


  return (
    <div className="px-4 md:px-20">
      <SectionHeading
        backgroundText="Destination"
        heading="Featured Destinations"
        subtext="Handpicked travel experiences to the most iconic, breathtaking, and exciting locations. Choose your next adventure and start making memories today."
      />

      {/* Wrap swiper and nav buttons */}
      <div className="relative mt-10 ">

        {/* Left nav button (conditionally shown) */}
        {activeIndex > 0 && (
          <button
            className="absolute top-1/2 left-0 -translate-y-1/2 bg-white/90 hover:bg-white text-black rounded-full p-2 shadow cursor-pointer transition-transform duration-200 hover:scale-110 z-30"
            onClick={() => swiperRef.current?.slidePrev()}
            aria-label="Previous Slide"
          >
            <IoIosArrowBack size={18} />
          </button>
        )}

        {/* Right nav button */}
        <button
          className="absolute top-1/2 right-0 -translate-y-1/2 bg-white/90 hover:bg-white text-black rounded-full p-2 shadow cursor-pointer transition-transform duration-200 hover:scale-110 z-30"
          onClick={() => swiperRef.current?.slideNext()}
          aria-label="Next Slide"
        >
          <IoIosArrowForward size={18} />
        </button>

        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          navigation={false}
          centeredSlides={false}
          loop={false}
          slidesPerView={3}
          breakpoints={{
            320: { slidesPerView: 1.2, spaceBetween: 10 },
            640: { slidesPerView: 2.2, spaceBetween: 15 },
            1024: { slidesPerView: 3, spaceBetween: 20 },
            1280: { slidesPerView: 4, spaceBetween: 24 },
          }}
          className="destinationSwiper"
        >
          {Array.isArray(destinations) && destinations.slice(0, 6).map((destination, index)=> (
            <SwiperSlide key={index}>
              <div
                className="h-64 rounded-3xl overflow-hidden shadow-lg group relative bg-cover bg-center transition-transform duration-300 hover:scale-100"
                style={{ backgroundImage: `url(${destination.coverImage})` }}
              >
                <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-4">
                  <h3 className="text-white text-xl font-semibold mb-1">{destination.country}</h3>
                  {/* <p className="text-white text-sm">{destination.description}</p> */}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Destination;
