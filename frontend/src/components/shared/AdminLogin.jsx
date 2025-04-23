import React, { useState } from 'react';
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleLogin = () => {
        localStorage.setItem('token', 'my_token');
        navigate('/admin');
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // prevent default form action

        const newErrors = {};
        if (!username.trim()) {
            newErrors.username = "Username is required!";
        }
        if (!email.trim()) {
            newErrors.email = "Email is required!";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Email is invalid!";
        }
        if (!password.trim()) {
            newErrors.password = "Password is required!";
          } else if (password.length > 8) {
            newErrors.password = "Password must be at most 8 characters long!";
          } else if (!/\d/.test(password)) {
            newErrors.password = "Password must contain at least one number!";
          } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            newErrors.password = "Password must contain at least one symbol!";
          }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            setErrors({});
            handleLogin(); // call login only after validation
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
                            className="w-full border border-gray-200 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                        />
                        {errors.username && <small className="text-red-500">{errors.username}</small>}
                    </div>

                    <div className="flex flex-col gap-3 mb-5">
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                        <InputText
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-200 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                        />
                        {errors.email && <small className="text-red-500">{errors.email}</small>}
                    </div>

                    <div className="flex flex-col gap-3 mb-6">
                        <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
                        <Password
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            toggleMask
                            feedback={false}
                            className="border-2 border-gray-300 rounded-lg shadow-sm focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition duration-300"
                            inputClassName="border-0 focus:ring-0 focus:outline-none px-22 py-2"
                        />
                        {errors.password && <small className="text-red-500">{errors.password}</small>}
                    </div>

                    <Button
                        label="Log in"
                        type="submit"
                        className="w-full bg-[#3578E5] hover:bg-[#285fb8] text-white font-semibold py-3 rounded-lg shadow-lg transition"
                    />
                </form>
            </div>
        </div>
    );
}
