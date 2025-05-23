import visaData from '../../../data/visaData';

const VisaListing = () => {
    return (
        <div className="px-4 py-8">
            <h2 className="text-2xl font-bold mb-6">
                Trusted Visa Services for These Popular Destinations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {visaData.map((visa, index) => (
                    <VisaCard key={index} {...visa} />
                ))}
            </div>
        </div>
    );
};

const VisaCard = ({ country, flag, processingTime }) => {
    return (
        <div className="border border-secondary-blue/70 rounded-2xl p-4 shadow-sm text-sm flex flex-col gap-2 text-secondary-blue">
            <div className="flex justify-between items-center">
                <img src={flag} alt={`${country} flag`} className="h-10" />
                <span className="text-xs bg-primary-blue/30 rounded px-4 py-1">E-Visa</span>
            </div>
            <div className="mt-1 font-semibold text-lg">{country}</div>
            <div>Tourist & Transit Visas</div>
            <div>Processing Time: {processingTime}</div>
            <div className='flex justify-end'>
                <button className="mt-auto bg-primary-blue/90 hover:bg-primary-blue text-white px-6 py-2 rounded-lg self-start">
                    Apply Now
                </button>
            </div>
        </div>
    );
};

export default VisaListing;