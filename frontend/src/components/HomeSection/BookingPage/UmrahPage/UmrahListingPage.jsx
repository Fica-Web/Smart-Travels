import { Link } from 'react-router-dom';
import umrahPackages from '../../../../data/HomeSection/umrahPackages';
import bgImg from '../../../../assets/image/booking/umrah/bg-img.png';
import img2 from '../../../../assets/image/booking/umrah/img2.png'

export const UmrahListingPage = () => {
    return (
        <section className="py-12 bg-white">
            <div className="text-center lg:max-w-5xl mx-auto mb-8  lg:mb-12">
                <h2 className="text-2xl font-bold mb-3 text-center text-secondary-blue ">
                    Trusted Umrah Services for a Spiritual Journey
                </h2>
                <p className="text-secondary-blue">
                    Embark on a blessed journey with our carefully designed Umrah packages.
                    Enjoy hassle-free visa processing, comfortable accommodations, and guided
                    ziyarah to the most sacred sites. We take care of every detail so you can
                    focus on your prayers and spiritual fulfillment.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {umrahPackages.map((pkg) => (
                    <SingleUmrahCard key={pkg.id} pkg={pkg} />
                ))}
            </div>

            <div
                className="relative bg-cover w-full h-auto pt-10 mt-7 rounded-tl-4xl rounded-tr-4xl rounded-br-4xl"
                style={{ backgroundImage: `url(${bgImg})` }}
            >
                {/* Blue overlay */}
                <div className="absolute inset-0 bg-primary-blue/60 rounded-tl-4xl rounded-tr-4xl rounded-br-4xl"></div>

                {/* Content */}
                <div className='lg:flex hidden gap-5'>
                    <img
                        src={img2}
                        alt="Umrah Hero"
                        className="relative z-10 lg:w-1/2"
                    />

                    <div className='lg:w-1/2 flex flex-col gap-5 justify-center items-center lg:px-24 text-white z-10'>
                        <h2 className='text-4xl font-semibold'>
                            “Travel with Confidence, Worship with Peace.”
                        </h2>
                        <p className='text-lg'>
                            Complete Umrah packages with flights, visa, hotels & guided ziyarat — everything arranged for your blessed journey.
                        </p>
                    </div>
                </div>
            </div>

        </section>
    )
}

const SingleUmrahCard = ({ pkg }) => {
    return (
        <div className="rounded-2xl overflow-hidden">
            {/* Image as background */}
            <div
                className="relative h-80 bg-center bg-cover text-secondary-blue"
                style={{ backgroundImage: `url(${pkg.image})` }}
            >

                <span className="absolute top-5 right-5  text-xs px-3 py-1 rounded-md z-10 bg-white/90">
                    {pkg.tag}
                </span>

                {/* Content section */}
                <div className="p-5 z-10 absolute bottom-0 left-0 right-0 flex text-white">
                    <div className='w-7/12'>
                        <h3 className="lg:text-2xl text-lg font-semibold">
                            {pkg.title}
                        </h3>
                        <p className="text-sm mt-1">{pkg.nights}</p>
                    </div>

                    <div className="mt-4 flex flex-col justify-end gap-5 items-end w-5/12">
                        <span className="px-3 py-1 rounded-md text-xs border border-white">
                            {pkg.price}
                        </span>
                        <Link to={`/bookings/umrah/${pkg.slug}`} className="bg-white/90 text-primary-blue text-sm  px-5 py-1 rounded-md hover:scale-105 transition transform duration-300 cursor-pointer">
                            View Details
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};