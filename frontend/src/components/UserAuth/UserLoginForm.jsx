import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import PasswordInput from '../reusable/PasswordInput';
import ReusableSubmitButton from '../reusable/ReusableSubmitButton';
import { toast } from 'react-toastify';

const UserLoginForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [validatePassword, setValidatePassword] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const [loading, setLoading] = useState(false); // ✅ Track submit loading
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setValidatePassword(true);
        const newErrors = {};

        if (!formData.email.trim()) {
            newErrors.email = "Email is required!";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid!";
        }

        if (Object.keys(newErrors).length > 0 || passwordError) {
            setFormErrors(newErrors);
            return;
        }

        setFormErrors({});
        setLoading(true); // ✅ Start loading

        try {
            await login(formData);
            navigate('/');
        } catch (error) {
            const serverMessage = error.response?.data?.message || error.message || "Login failed. Please try again.";
            toast.error(serverMessage);
        }

        setLoading(false); // ✅ End loading
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
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

            <PasswordInput
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                validate={validatePassword}
                onValidationChange={setPasswordError}
            />

            <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center">
                    <input type="checkbox" id="remember" className="mr-2" />
                    <label htmlFor="remember">Remember Me</label>
                </div>
                <Link to="/forgot-password" className="text-[#2e6bbf] hover:text-[#4a94d0] hover:underline">
                    Forgot Password?
                </Link>
            </div>

            <ReusableSubmitButton
                loading={loading}
                text="Login"
                loadingText="Logging in..."
                type="submit"
            />
        </form>
    );
};

export default UserLoginForm;