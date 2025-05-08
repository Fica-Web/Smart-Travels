import { useState } from 'react';
import { forgotPasswordApi } from '../../services/api/userApi';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if email is valid
        if (!email) {
            setMessage("Please enter a valid email address.");

            return;
        }

        // Call API to send password reset email (pseudo code)
        const response = await forgotPasswordApi(email);

        if (response.success) {
            setMessage("Password reset email sent. Please check your inbox.");
        } else {
            setMessage(response.error || "Failed to send reset email. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Forgot Password</h2>
                <p className="text-gray-500 mb-8 text-sm text-center">Enter your email to receive password reset instructions.</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-600 mb-1 text-sm">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="example@example.com"
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4a94d0]"
                        />
                    </div>
                    {message && (
                        <div className="text-center text-sm text-gray-600 mt-2">{message}</div>
                    )}
                    <button
                        type="submit"
                        className="w-full bg-[#2e6bbf] hover:bg-[#4a94d0] text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4a94d0] focus:ring-offset-2 transition"
                    >
                        Send Reset Link
                    </button>
                </form>
            </div>
        </div>
    );
}


export default ForgotPasswordPage;