import { useState, useEffect } from 'react';
import { verifyOtpApi } from '../../services/api/userApi';
import { toast } from 'react-toastify';

const OTP_EXPIRY_KEY = 'otp_expiry_timestamp';

const OtpVerificationForm = ({ email, onVerified }) => {
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [resendTimer, setResendTimer] = useState(120); // 2 min resend
    const [otpExpirySeconds, setOtpExpirySeconds] = useState(0);
    const [otpExpired, setOtpExpired] = useState(false);

    // Initialize/resume OTP expiry timer
    useEffect(() => {
    const startExpiryTimer = () => {
        const expiry = Number(localStorage.getItem(OTP_EXPIRY_KEY));
        if (!expiry || isNaN(expiry)) return;

        const interval = setInterval(() => {
            const remaining = Math.floor((expiry - Date.now()) / 1000);
            if (remaining <= 0) {
                clearInterval(interval);
                setOtpExpired(true);
                setOtpExpirySeconds(0);
                toast.error('OTP has expired. Please request a new one.');
            } else {
                setOtpExpired(false);
                setOtpExpirySeconds(remaining);
            }
        }, 1000);

        return interval;
    };

    const intervalId = startExpiryTimer();

    // Cleanup on unmount
    return () => clearInterval(intervalId);
}, [localStorage.getItem(OTP_EXPIRY_KEY)]); // <- re-run when expiry timestamp changes

    // 2-minute resend timer
    useEffect(() => {
        if (resendTimer > 0) {
            const interval = setInterval(() => {
                setResendTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [resendTimer]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (otpExpired) {
            toast.error('OTP has expired. Please request a new one.');
            return;
        }

        setLoading(true);
        setSuccess('');

        const response = await verifyOtpApi({ email, otp });
        if (response.success) {
            setSuccess('✅ OTP verified successfully!');
            onVerified();
        } else {
            toast.error(response.error || 'OTP verification failed');
        }

        setLoading(false);
    };

    const handleResendOtp = () => {
        // Call your resend API here (mocked)
        toast.success('OTP resent successfully!');
        setOtp('');
        setResendTimer(120);
        setOtpExpired(false);

        const newExpiry = Date.now() + 5 * 60 * 1000; // 5 mins from now
        localStorage.setItem(OTP_EXPIRY_KEY, newExpiry);
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

            <p className="text-sm text-gray-500">
                OTP expires in: <span className="font-medium">{formatTime(otpExpirySeconds)}</span>
            </p>

            <div>
                <label className="block text-sm text-gray-600 mb-1">Enter OTP</label>
                <input
                    type="text"
                    value={otp}
                    onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d{0,6}$/.test(value)) {
                            setOtp(value);
                        }
                    }}
                    maxLength={6}
                    placeholder="6-digit code"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4a94d0]"
                    required
                    disabled={otpExpired}
                />
            </div>

            <button
                type="submit"
                disabled={loading || otp.length !== 6 || otpExpired}
                className={`w-full font-semibold py-2 px-4 rounded-xl transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
                    ${loading || otp.length !== 6 || otpExpired
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-[#2e6bbf] hover:bg-[#4a94d0] text-white cursor-pointer'}
                `}
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
                    disabled={resendTimer > 0}
                    className={`${
                        resendTimer > 0
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-primary-blue hover:underline cursor-pointer'
                    }`}
                >
                    Resend OTP {resendTimer > 0 && `in ${formatTime(resendTimer)}`}
                </button>
            </p>

            {otpExpired && (
                <p className="text-sm text-red-500 text-center mt-2">
                    ⚠️ OTP has expired. Please resend to get a new code.
                </p>
            )}
        </form>
    );
};

export default OtpVerificationForm;