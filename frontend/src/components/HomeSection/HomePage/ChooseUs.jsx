import React from 'react'
import SectionHeading from '../../reusable/SectionHeading'
import img from '../../../assets/image/Destination/vertical-shot-beautiful-eiffel-tower-captured-paris-france.jpg'
import img2 from '../../../assets/image/hero/Ruknhero.jpg'


const ChooseUs = () => {
    return (
        <div className="sm:px-6 md:px-20 ">
            <SectionHeading
                backgroundText="CHOOSE US"
                heading="Your Trusted Travel Partner"
                subtext="Handpicked travel experiences to the most iconic, breathtaking, and exciting locations. Choose your next adventure and start making memories today."
            />

            <div className="grid grid-cols-[auto_auto_auto] gap-4 px-6 py-12 items-center justify-center">
                {/* Left Column */}
                <div className="flex flex-col justify-between h-[450px] space-y-4 items-center">
                    <div className="sm:w-40 md:w-60 h-[170px] bg-gray-100 rounded-xl shadow overflow-hidden">
                        <img
                            src={img2}
                            alt=""
                            className="w-full h-full object-cover rounded-xl"
                        />
                    </div>

                    <div className="sm:w-40 md:w-60 h-[170px] bg-gray-100 rounded-xl shadow flex items-center justify-center">Box 2</div>
                    <div className="sm:w-40 md:w-60 h-[170px] bg-gray-100 rounded-xl shadow flex items-center justify-center">Box 3</div>
                </div>

                {/* Center Image */}
                <div className="flex items-center justify-center h-[450px]">
                    <img
                        src={img}
                        alt="Center"
                        className="h-full w-auto object-cover rounded-2xl shadow-lg"
                    />
                </div>

                {/* Right Column */}
                <div className="flex flex-col justify-between h-[450px] space-y-4 items-center">
                    <div className="sm:w-50 md:w-60 h-[170px] bg-gray-100 rounded-xl shadow flex items-center justify-center">Box 4</div>
                    <div className="sm:w-50 md:w-60 h-[170px] bg-gray-100 rounded-xl shadow flex items-center justify-center">Box 5</div>
                    <div className="sm:w-50 md:w-60 h-[170px] bg-gray-100 rounded-xl shadow flex items-center justify-center">Box 6</div>
                </div>
            </div>
        </div>
    )
}

export default ChooseUs
