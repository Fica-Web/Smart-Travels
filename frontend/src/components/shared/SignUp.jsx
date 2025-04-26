import React from "react";

export default function UserSignup() {
  return (
    <div className="flex items-center justify-center bg-gray-100 py-16 px-4">
      <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-lg overflow-hidden max-w-4xl w-full">

      <div className="hidden md:flex md:w-1/2 flex-col justify-center items-center bg-gradient-to-t from-[#2e6bbf] via-[#4a94d0] to-[#6ec9e7] text-white p-10 text-center">
  <div className="text-2xl md:text-4xl font-semibold mb-2 tracking-wider opacity-90">
    Welcome to
  </div>
  <div className="text-4xl md:text-6xl font-extrabold tracking-wide drop-shadow-lg mb-4">
    Rukn Travels
  </div>
  <p className="text-sm md:text-base font-light tracking-wide opacity-90">
    Explore the world with confidence and comfort.
  </p>
</div>


        {/* Right Side - Form Section */}
        <div className="md:w-1/2 p-8 md:p-12">
        <div className="mb-6 text-center md:text-left">
  {/* Desktop and larger screens */}
  <h2 className="text-4xl font-extrabold text-gray-800 tracking-wide opacity-90 hidden md:block">
    Signup
  </h2>
  <p className="text-gray-500 text-sm mt-3 hidden md:block">
    Join us by creating your account and unlock all the amazing features.
  </p>

  {/* Mobile view */}
  <h2 className="text-4xl font-extrabold text-gray-800 tracking-wider block md:hidden mb-2">
    Join Us!
  </h2>
  <p className="text-gray-500 text-sm mt-3 block md:hidden max-w-xs mx-auto">
    Create your account and become part of our community. Let’s get started!
  </p>
</div>


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

          <p className="mt-6 text-sm text-center text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-[#2e6bbf] hover:text-[#4a94d0]">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
