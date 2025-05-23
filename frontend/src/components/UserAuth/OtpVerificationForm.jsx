import { useState, useEffect } from 'react';
import { verifyOtpApi, resendOtpApi } from '../../services/api/userApi';
import { toast } from 'react-toastify';

const OtpVerificationForm = ({ email, onVerified }) => {
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);
    const [success, setSuccess] = useState('');
    const [resendTimer, setResendTimer] = useState(120); // 2-minute resend timer

    // Proper countdown timer without multiple intervals
    useEffect(() => {
        if (resendTimer <= 0) return;

        const interval = setInterval(() => {
            setResendTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [resendTimer > 0]); // Only restart when timer is active again

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess('');

        try {
            const response = await verifyOtpApi({ email, otp: otp.trim() });
            if (response.success) {
                setSuccess('✅ OTP verified successfully!');
                onVerified();
                toast.success('OTP verified successfully!');
            } else {
                toast.error(response.error || 'OTP verification failed');
            }
        } catch (error) {
            toast.error('An unexpected error occurred');
            console.error(error);
        }

        setLoading(false);
    };

    const handleResendOtp = async () => {
        if (resendTimer > 0 || resending) return;

        setResending(true);
        try {
            const response = await resendOtpApi(email);
            if (response.success) {
                toast.success('OTP resent successfully!');
                setOtp('');
                setResendTimer(120);
            } else {
                toast.error(response.error || 'Failed to resend OTP');
            }
        } catch (error) {
            toast.error('An error occurred while resending OTP');
            console.error(error);
        }
        setResending(false);
    };

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' + s : s}`;
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <p className="text-sm text-gray-600">
                📩 OTP sent to <span className="font-medium">{email}</span>
            </p>

            <div>
                <label className="block text-sm text-gray-600 mb-1">Enter OTP</label>
                <input
                    type="text"
                    value={otp}
                    onChange={(e) => {
                        const value = e.target.value.trim();
                        if (/^\d{0,6}$/.test(value)) {
                            setOtp(value);
                        }
                    }}
                    maxLength={6}
                    placeholder="6-digit code"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4a94d0]"
                    required
                />
            </div>

            <button
                type="submit"
                disabled={loading || otp.length !== 6}
                className={`w-full font-semibold py-2 px-4 rounded-xl transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
                    ${loading || otp.length !== 6
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-[#2e6bbf] hover:bg-[#4a94d0] text-white cursor-pointer'}`}
            >
                {loading ? 'Verifying...' : 'Verify OTP'}
            </button>

            {success && (
                <p className="text-sm text-green-600 text-center mt-2">{success}</p>
            )}

            <p className="text-sm text-center text-gray-500 mt-4">
                Didn't receive the code?{' '}
                <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={resendTimer > 0 || resending}
                    className={`${
                        resendTimer > 0 || resending
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-secondary-blue hover:underline cursor-pointer'
                    }`}
                >
                    {resending
                        ? 'Resending...'
                        : `Resend OTP${resendTimer > 0 ? ` in ${formatTime(resendTimer)}` : ''}`}
                </button>
            </p>
        </form>
    );
};

export default OtpVerificationForm;