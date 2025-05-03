import { Import } from 'lucide-react';
import React from 'react'
import { useState } from 'react';
import PasswordInput from '../reusable/PasswordInput';

const UserSignupForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [validatePassword, setValidatePassword] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [formErrors, setFormErrors] = useState({});
    // const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setValidatePassword(true); // Trigger internal validation
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
            return;
        }

        setFormErrors({});
        
    }


    return (

        <>
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

                <PasswordInput
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    validate={validatePassword}
                    onValidationChange={setPasswordError}
                />

                <button
                    type="submit"
                    className="w-full bg-[#2e6bbf] hover:bg-[#4a94d0] text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4a94d0] focus:ring-offset-2 transition"
                >
                    Signup
                </button>
            </form>
        </>
    )
}

export default UserSignupForm
