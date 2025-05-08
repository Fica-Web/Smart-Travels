import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { forgotPasswordApi } from '../../services/api/userApi';

const TIMER_KEY = 'forgot_password_timer_expiry';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);
    const [timer, setTimer] = useState(0);

    // On mount, check for an existing timer in localStorage
    useEffect(() => {
        const expiry = localStorage.getItem(TIMER_KEY);

        if (expiry) {
            const remaining = Math.floor((+expiry - Date.now()) / 1000);
            if (remaining > 0) {
                setIsDisabled(true);
                setTimer(remaining);
            } else {
                localStorage.removeItem(TIMER_KEY);
            }
        }
    }, []);

    // Countdown effect
    useEffect(() => {
        let countdown;

        if (timer > 0) {
            countdown = setInterval(() => {
                setTimer((prev) => {
                    if (prev <= 1) {
                        setIsDisabled(false);
                        localStorage.removeItem(TIMER_KEY);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => clearInterval(countdown);
    }, [timer]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            setMessage("Please enter a valid email address.");
            return;
        }

        const response = await forgotPasswordApi(email);

        if (response.success) {
            setMessage('')
            toast.success("Password reset email sent. Please check your inbox.");
            setIsDisabled(true);
            const expiryTime = Date.now() + 120000; // 2 minutes in ms
            localStorage.setItem(TIMER_KEY, expiryTime.toString());
            setTimer(120);
        } else {
            setMessage(response.error || "Failed to send reset email. Please try again.");
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
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
                        <div className="text-center text-sm text-red-600 mt-2">{message}</div>
                    )}
                    <button
                        type="submit"
                        disabled={isDisabled}
                        className={`w-full ${
                            isDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#2e6bbf] hover:bg-[#4a94d0]'
                        } text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4a94d0] focus:ring-offset-2 transition`}
                    >
                        {isDisabled ? `Wait ${formatTime(timer)}` : 'Send Reset Link'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;