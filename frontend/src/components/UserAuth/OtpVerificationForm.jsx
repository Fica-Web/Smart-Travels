import { useState } from 'react';
import { verifyOtpApi } from '../../services/api/userApi';

const OtpVerificationForm = ({ email, onVerified }) => {
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        const response = await verifyOtpApi({ email, otp });
        if (response.success) {
            setSuccess('OTP verified successfully!');
            onVerified();
        } else {
            console.error('OTP verification error:', response.error);
            setError(response.error || 'OTP verification failed');
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <p>OTP sent to: {email}</p>
            <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                required
            />
            <button type="submit" disabled={loading}>
                {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </form>
    );
};

export default OtpVerificationForm;