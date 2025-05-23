import { useState } from 'react';
import { submitMessageApi } from '../../../services/api/userApi';
import { toast } from 'react-toastify';
import ReusableSubmitButton from '../../reusable/ReusableSubmitButton';

const ContactForm = () => {
    const initialState = {
        name: '',
        email: '',
        phone: '',
        message: '',
    };

    const [formData, setFormData] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        if (!formData.message.trim()) newErrors.message = 'message is required';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setLoading(false);
            return;
        }

        // Placeholder: send formData to backend or email API
        console.log('Submitted Data:', formData);
        const response = await submitMessageApi(formData);

        if (response.success) {
            toast.success(response.data.message || 'Message sent successfully!');
            setFormData(initialState);
        } else {
            toast.error(response.error || 'Failed to send message');
        }

        setErrors({});
        setLoading(false);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className='flex flex-col gap-4 text-title-blue bg-light-blue p-6 lg:p-10 rounded-3xl shadow-md lg:max-w-lg w-full'
        >
            <h2 className='text-3xl font-semibold text-center'>Get In Touch</h2>

            <InputField
                label='Name'
                name='name'
                type='text'
                placeholder='Enter your name'
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
            />
            <InputField
                label='Email'
                name='email'
                type='email'
                placeholder='Enter your email'
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
            />
            <InputField
                label='Phone'
                name='phone'
                type='tel'
                placeholder='Enter your phone number'
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
            />
            <InputField
                label='Message'
                name='message'
                type='textarea'
                placeholder='Your message'
                value={formData.message}
                onChange={handleChange}
                error={errors.message}
            />

            <ReusableSubmitButton
                text='Submit'
                loadingText='Submitting...'
                loading={loading}
            />
        </form>
    );
};

export default ContactForm;

// Reusable Input Component
const InputField = ({ label, name, type, placeholder, value, onChange, error }) => {
    return (
        <div className='flex flex-col gap-1'>
            <label className='text-secondary-blue'>{label}</label>
            {type === 'textarea' ? (
                <textarea
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    rows={4}
                    className={`border rounded-xl p-3 resize-none mb-4 ${error ? 'border-red-500' : 'border-secondary-blue focus:border-none focus:outline-none focus:ring-1 focus:ring-blue-500'
                        }`}
                />
            ) : (
                <input
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className={`border rounded-xl p-3 ${error ? 'border-red-500' : 'border-secondary-blue focus:border-none focus:outline-none focus:ring-1 focus:ring-blue-500'
                        }`}
                />
            )}
            {error && <p className='text-red-500 text-sm'>{error}</p>}
        </div>
    );
};