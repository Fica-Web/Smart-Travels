import React, { useState } from 'react';
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';
import PasswordInput from '../../reusable/PasswordInput';
import { adminLoginApi } from '../../../services/api/adminApi'; // Adjust path as needed

export default function AdminLogin() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validatePassword, setValidatePassword] = useState(false);
    const [passwordError, setPasswordError] = useState("");

    // const [passwordError, setPasswordError] = useState("");
    // const [validatePassword, setValidatePassword] = useState(false);
    // const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setValidatePassword(true); // ✅ triggers internal validation in PasswordInput

        const newErrors = {};
        if (!username.trim()) newErrors.username = "Username is required!";
        if (!email.trim()) {
            newErrors.email = "Email is required!";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Email is invalid!";
        }

        if (Object.keys(newErrors).length > 0 || passwordError) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        setApiError('');

        try {
            const response = await adminLoginApi({ username, email, password });

            if (response?.token) {
                console.log('✅ Admin login successful:', response);
                navigate('/admin');
            }
        } catch (error) {
            console.error('❌ Admin login error:', error);
        }
    };


    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
            <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl ring-1 ring-gray-200">
                <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Admin Login</h1>

                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-3 mb-5">
                        <label htmlFor="username" className="text-sm font-medium text-gray-700">Username</label>
                        <InputText
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4a94d0]"
                        />
                        {errors.username && <small className="text-red-500">{errors.username}</small>}
                    </div>

                    <div className="flex flex-col gap-3 mb-5">
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                        <InputText
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4a94d0]"
                        />
                        {errors.email && <small className="text-red-500">{errors.email}</small>}
                    </div>

                    <PasswordInput
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        validate={validatePassword}
                        onValidationChange={setPasswordError}
                    />


                    {apiError && (
                        <div className="mb-4 text-sm text-red-600 text-center">{apiError}</div>
                    )}

                    <Button
                        label="Log in"
                        type="submit"
                        // disabled={!!passwordError}
                        className="w-full bg-[#3578E5] hover:bg-[#285fb8] text-white font-semibold py-3 rounded-lg shadow-lg transition"
                    />
                </form>
            </div>
        </div>
    );
}
