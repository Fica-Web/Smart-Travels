import { useState } from 'react';
import { userSignupApi } from '../../services/api/userApi';
import PasswordInput from '../reusable/PasswordInput';
import ReusableSubmitButton from '../reusable/ReusableSubmitButton';
import MobileInput from '../reusable/MobileInput';
import { toast } from 'react-toastify';

const UserSignupForm = ({ onOTPSent }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [validatePassword, setValidatePassword] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const [loading, setLoading] = useState(false); // ✅ Added missing loading state

    const validateForm = () => {
        setValidatePassword(true);
        const newErrors = {};

        if (!formData.name || !formData.name.trim()) {
            newErrors.name = "Username is required!";
        }
        if (!formData.email.trim()) {
            newErrors.email = "Email is required!";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid!";
        }

        if (Object.keys(newErrors).length > 0 || passwordError) {
            setFormErrors(newErrors);
            return false;
        }

        setFormErrors({});
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validateForm();
        if (!isValid) return;

        try {
            setLoading(true);
            const response = await userSignupApi(formData);
            if (response.success) {
                toast.success("OTP sent! Please verify your email.");
                onOTPSent(formData.email);
            } else {
                toast.error(response.error || 'Signup failed');
            }
        } catch (err) {
            console.error(err);
            toast.error('An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-gray-600 mb-1 text-sm">Full Name</label>
                <input
                    name="name"
                    value={formData.name}
                    type="text"
                    placeholder="John Doe"
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4a94d0]"
                />
                {formErrors.name && <small className="text-red-500">{formErrors.name}</small>}
            </div>

            <div>
                <label className="block text-gray-600 mb-1 text-sm">Email</label>
                <input
                    name="email"
                    value={formData.email}
                    type="email"
                    placeholder="username@gmail.com"
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4a94d0]"
                />
                {formErrors.email && <small className="text-red-500">{formErrors.email}</small>}
            </div>

            <MobileInput />

            <PasswordInput
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                validate={validatePassword}
                onValidationChange={setPasswordError}
            />

            <ReusableSubmitButton
                loading={loading}
                type="submit"
                text="Sign Up"
                loadingText="Creating Account..."
            />
        </form>
    );
};

export default UserSignupForm;