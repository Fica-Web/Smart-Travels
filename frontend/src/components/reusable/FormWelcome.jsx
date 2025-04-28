import React from 'react'

const FormWelcome = ({ firstText, secondText, description }) => {
    return (
        <div className="hidden md:flex md:w-1/2 flex-col justify-center items-center bg-gradient-to-t from-[#2e6bbf] via-[#4a94d0] to-[#6ec9e7] text-white p-10 text-center">
            <div className="text-2xl md:text-4xl font-semibold mb-2 tracking-wider opacity-90">
                { firstText}
            </div>
            <div className="text-4xl md:text-6xl font-extrabold tracking-wide drop-shadow-lg mb-4">
                { secondText }
            </div>
            <p className="text-sm md:text-base font-light tracking-wide opacity-90">
                { description}
            </p>
        </div>
    )
}

export default FormWelcome
