import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { userLoginApi } from '../../services/api/userApi';

const UserLoginForm = () => {
    const { setUser, setAccessToken } = useAuth(); // Access the context values
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState(null); // State to hold error messages

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Perform login action here, e.g., call an API
            const response = await userLoginApi(formData);
            console.log("Login form submitted", response);
            // if (response.error) {
            //     setError(response.error); // Set error message if login fails
            // }
            // if (response?.accessToken) {
            //     setAccessToken(response.accessToken); // Store access token in context
            //     setUser(response.user); // Set user data in context
            // }
        } catch (error) {
            console.error("Login error:", error.response?.data);
            setError("Login failed. Please check your credentials and try again.");

        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-gray-600 mb-1 text-sm">Email</label>
                    <input
                        name='email'
                        value={formData.email}
                        type="email"
                        placeholder="username@gmail.com"
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4a94d0]"
                    />
                </div>

                <div>
                    <label className="block text-gray-600 mb-1 text-sm">Password</label>
                    <input
                        name="password"
                        value={formData.password}
                        type="password"
                        placeholder="********"
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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