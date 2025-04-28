import React from 'react';
import { Link } from 'react-router-dom';

const UserLoginForm = ({
    formData,
    setFormData,
    handleSubmit
}) => {
    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-gray-600 mb-1 text-sm">Email</label>
                    <input
                        type="email"
                        placeholder="username@gmail.com"
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

                <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center">
                        <input type="checkbox" id="remember" className="mr-2" />
                        <label htmlFor="remember">Remember Me</label>
                    </div>
                    <Link to="/forgot-password" className="text-[#2e6bbf] hover:text-[#4a94d0] hover:underline">Forgot Password?</Link>
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#2e6bbf] hover:bg-[#4a94d0] text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4a94d0] focus:ring-offset-2 transition"
                >
                    Login
                </button>
            </form>
        </>
    )
}

export default UserLoginForm
