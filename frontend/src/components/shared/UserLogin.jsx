import React from "react";

export default function UserLogin() {
  return (
    <div className="flex items-center justify-center bg-gray-100 py-16 px-4">
      <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-lg overflow-hidden max-w-4xl w-full">

        {/* Left Side - Welcome Section */}
        <div className="hidden md:flex md:w-1/2 flex-col justify-center items-center bg-gradient-to-t from-[#2e6bbf] via-[#4a94d0] to-[#6ec9e7] text-white p-10 text-center">
  <div className="text-2xl md:text-4xl font-light mb-2 tracking-wide opacity-90">
    Welcome
  </div>
  <div className="text-4xl md:text-6xl font-extrabold tracking-wider drop-shadow-lg">
    Back!
  </div>
</div>


        {/* Right Side - Form Section */}
        <div className="md:w-1/2 p-8 md:p-12">
        <div className="mb-6 text-center md:text-left">
  {/* Desktop and larger screens */}
  <h2 className="text-3xl font-extrabold text-gray-800 tracking-wide hidden md:block">
    Login
  </h2>
  <p className="text-gray-500 text-sm mt-2 hidden md:block">
    Enter your details below to access your account.
  </p>

{/* Mobile view */}
<h2 className="text-4xl font-extrabold text-gray-800 tracking-wider block md:hidden mb-2">
  Welcome Back!
</h2>
<p className="text-gray-500 text-sm mt-3 block md:hidden max-w-xs mx-auto">
  Login to your account and continue where you left off. Let’s get you back on track!
</p>

</div>



          <form className="space-y-6">
            <div>
              <label className="block text-gray-600 mb-1 text-sm">User Name</label>
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
              <a href="#" className="text-[#2e6bbf] hover:text-[#4a94d0] hover:underline">Forgot Password?</a>
            </div>

            <button
              type="submit"
              className="w-full bg-[#2e6bbf] hover:bg-[#4a94d0] text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4a94d0] focus:ring-offset-2 transition"
            >
              Login
            </button>
          </form>

          <p className="mt-6 text-sm text-center text-gray-600">
            New User? <a href="/signup" className="text-[#2e6bbf] hover:text-[#4a94d0]">Signup</a>
          </p>
        </div>
      </div>
    </div>
  );
}
