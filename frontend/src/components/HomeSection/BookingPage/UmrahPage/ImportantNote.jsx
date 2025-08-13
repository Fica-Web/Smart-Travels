import React from 'react'

const ImportantNote = () => {
    return (
        <div className='text-title-blue bg-light-blue gap-5 p-6 lg:p-8  rounded-3xl  lg:max-w-lg w-full text-secondary-blue '>
            <h2 className='text-xl font-bold text-secondary-blue uppercase mb-5'>IMPORTANT NOTE</h2>
            <ul className="space-y-5 list-disc list-outside pl-7">
                <li>Umrah VISA subject to approval (3 working days for processing)</li>
                <li>Rates are net and non-refundable</li>
                <li>Package confirmation subject to availability</li>
                <li>Price may fluctuate according to the availability of the rooms</li>
                <li>Above mentioned package rates are per person basis</li>
            </ul>
        </div>
    )
}

export default ImportantNote