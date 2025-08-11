import { useParams } from "react-router-dom";
import { FaPlay } from "react-icons/fa"; // for the small arrow icon
import { TbLocationFilled } from "react-icons/tb";
import umrahPackages from "../../data/HomeSection/umrahPackages";
import ContactSection from "../../components/HomeSection/BookingPage/ContactSection";

const UmrahDetailsPage = () => {
    const { slug } = useParams();

    // Find the package with matching slug
    const pkg = umrahPackages.find((item) => item.slug === slug);

    if (!pkg) {
        return <div className="p-10 text-center text-red-500">Package not found</div>;
    }

    return (
        <div>
            <div>
                <h2>
                    Umrah Packages
                </h2>
            </div>

            <div className="flex flex-col lg:flex-row gap-10 items-start">
                <div className="relative lg:w-1/2 w-full my-5">
                    <h2 className="font-semibold text-secondary-blue lg:text-xl text-lg mb-4">
                        Day-by-Day Itinerary
                    </h2>
                    {pkg.inclusions?.map((item, index) => (
                        <div key={index} className="pb-6 relative pl-6 ">
                            {/* Left vertical dashed line - hide for last element */}
                            {index !== pkg.inclusions.length - 1 && (
                                <div className="absolute left-1 top-3 bottom-0 w-px border-l border-dashed border-gray-400 z-0 "/>
                            )}

                            {/* Icon on top of the border */}
                            <div className="absolute left-[-4px] top-2 z-10  rounded-full">
                                <TbLocationFilled size={14} className="text-secondary-blue rotate-45" />
                            </div>

                            {/* Content */}
                            <div className="relative z-10 text-secondary-blue  text-lg">
                                <p className="">
                                    {item}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* <div className='w-full md:w-[500px] flex flex-col '>
                    <ContactSection  destination={destination} />
                </div> */}
            </div>
        </div>
    );
};

export default UmrahDetailsPage;
