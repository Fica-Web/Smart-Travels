import React from 'react'

const UserSignupForm = () => {
    return (
        <>
            <form className="space-y-6">
                <div>
                    <label className="block text-gray-600 mb-1 text-sm">Full Name</label>
                    <input
                        type="text"
                        placeholder="John Doe"
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4a94d0]"
                    />
                </div>

                <div>
                    <label className="block text-gray-600 mb-1 text-sm">Email</label>
                    <input
                        type="email"
                        placeholder="email@example.com"
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4a94d0]"
                    />
                </div>

                <div>
                    <label className="block text-gray-600 mb-1 text-sm">Password</label>
                    <input
                        type="password"
                        placeholder="********"
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4a94d0]"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#2e6bbf] hover:bg-[#4a94d0] text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4a94d0] focus:ring-offset-2 transition"
                >
                    Signup
                </button>
            </form>
        </>
    )
}

export default UserSignupForm
