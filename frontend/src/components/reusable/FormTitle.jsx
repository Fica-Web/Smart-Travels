import React from 'react'

const FormTitle = ({
    title,
    description,
    mobileTitle,
    mobileDescription
}) => {
    return (
        <div className="mb-6 text-center md:text-left">
            {/* Desktop and larger screens */}
            <h2 className="text-4xl font-extrabold text-gray-800 tracking-wide opacity-90 hidden md:block">
                { title}
            </h2>
            <p className="text-gray-500 text-sm mt-3 hidden md:block">
                { description }
            </p>

            {/* Mobile view */}
            <h2 className="text-4xl font-extrabold text-gray-800 tracking-wider block md:hidden mb-2">
                { mobileTitle }
            </h2>
            <p className="text-gray-500 text-sm mt-3 block md:hidden max-w-xs mx-auto">
                { mobileDescription }
            </p>
        </div>
    )
}

export default FormTitle
