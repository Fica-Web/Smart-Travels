import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { TbLocationFilled } from "react-icons/tb";
import economy from '../../assets/image/booking/umrah/economy.svg'
import { getSettings } from "../../services/api/settingsApi";
import umrahPackages from "../../data/HomeSection/umrahPackages";
import ContactForm from "../../components/reusable/ContactForm";
import HelpBox from "../../components/reusable/HelpBox";
import ImportantNote from "../../components/HomeSection/BookingPage/UmrahPage/ImportantNote";

const UmrahDetailsPage = () => {
    const [settings, setSettings] = useState({})
    const { slug } = useParams();

    // Find the package with matching slug
    const pkg = umrahPackages.find((item) => item.slug === slug);

    if (!pkg) {
        return <div className="p-10 text-center text-red-500">Package not found</div>;
    }

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await getSettings();
                setSettings(res.data.data);
            } catch (err) {
                console.log('Failed to load settings');
            }
        };
        fetchSettings();
    }, []);

    const umrahData = {
        serviceType: 'umrah',
        umrahPackageName: pkg.title,
    }

    return (
        <div>
            {/* Header */}
            <div className="mb-5 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-secondary-blue">
                    {pkg.title || "Umrah Package"}
                </h2>
                <div className="lg:flex hidden items-center gap-1 ">
                    <img src={economy} alt="icon" />
                    <p className="">Economy</p>
                </div>
            </div>

            {/* Main content */}
            <div className="flex flex-col lg:flex-row gap-10 items-start">
                {/* Itinerary */}
                <div className=" lg:w-1/2 w-full">
                    <ItineraryList title="Day-by-Day Itinerary" items={pkg.inclusions} />
                    <ItineraryList title="Umrah VISA Documents" items={pkg.documents} />
                    <ItineraryList title="Package Exclusions" items={pkg.exclusions} />
                </div>

                {/* Contact Form */}
                <div className="flex flex-col gap-5 items-end w-full lg:mt-5">
                    <ContactForm
                        title="Send a Query"
                        buttonText="Send Query"
                        messageFieldName="location"
                        messageLabel="Location"
                        messagePlaceholder="Enter your location"
                        destination={umrahData}
                    />
                    <HelpBox settings={settings} />

                    <ImportantNote />

                </div>
            </div>
        </div>
    );
};

export default UmrahDetailsPage;

// Reusable itinerary list component
const ItineraryList = ({ title, items }) => {
    if (!items || items.length === 0) {
        return null;
    }

    return (
        <div className="relative my-5">
            <h2 className="font-semibold text-secondary-blue lg:text-xl text-lg mb-5">
                {title}
            </h2>

            {items.map((item, index) => (
                <div key={index} className="pb-6 relative pl-6">
                    {/* Left vertical dashed line - hide for last element */}
                    {index !== items.length - 1 && (
                        <div className="absolute left-1 top-3 bottom-0 w-px border-l border-dashed border-gray-400 z-0" />
                    )}

                    {/* Icon */}
                    <div className="absolute left-[-4px] top-2 z-10 rounded-full bg-white">
                        <TbLocationFilled size={14} className="text-secondary-blue rotate-45" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 text-secondary-blue text-">
                        <p>{item}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};