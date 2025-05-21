import { useState } from 'react';
import ReusableSubmitButton from '../../reusable/ReusableSubmitButton';

const ContactForm = () => {
    const initialState = {
        name: '',
        email: '',
        phone: '',
        location: '',
    };

    const [formData, setFormData] = useState(initialState);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        if (!formData.location.trim()) newErrors.location = 'Location is required';
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Placeholder: send formData to backend or email API
        console.log('Submitted Data:', formData);

        setFormData(initialState);
        setErrors({});
    };

    return (
        <form
            onSubmit={handleSubmit}
            className='flex flex-col gap-5 text-title-blue bg-light-blue p-6 lg:p-10 rounded-xl shadow-md max-w-lg'
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
                label='Location'
                name='location'
                type='text'
                placeholder='Your location'
                value={formData.location}
                onChange={handleChange}
                error={errors.location}
            />

            <ReusableSubmitButton
                text='Submit'
                loadingText='Submitting...'
                loading={false}
            />
        </form>
    );
};

export default ContactForm;

// Reusable Input Component
const InputField = ({ label, name, type, placeholder, value, onChange, error }) => {
    return (
        <div className='flex flex-col gap-1'>
            <label className=' text-secondary-blue'>{label}</label>
            <input
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`border rounded-md p-3 ${error ? 'border-red-500' : 'border-secondary-blue focus:border-none focus:outline-none focus:ring-1 focus:ring-blue-500'}`}
            />
            {error && <p className='text-red-500 text-sm'>{error}</p>}
        </div>
    );
};