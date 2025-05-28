import { useState, useEffect } from 'react';
import { submitMessageApi } from '../../services/api/userApi';
import { toast } from 'react-toastify';
import ReusableSubmitButton from './ReusableSubmitButton';
import CountrySelect from './CountrySelect';
import { duration } from '@mui/material';

const ContactForm = ({
    buttonText = 'Submit',
    messageFieldName = 'message',
    messageLabel = 'Message',
    messagePlaceholder = 'Your message',
    defaultMessage = '',
    showCountrySelect = false,
    destination = null,
}) => {
    const initialState = {
        name: '',
        email: '',
        phone: '',
        [messageFieldName]: defaultMessage,
    };

    const [formData, setFormData] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState('');



    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            [messageFieldName]: defaultMessage,
        }));
    }, [defaultMessage, messageFieldName]);

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
        if (!formData[messageFieldName].trim()) newErrors[messageFieldName] = `${messageLabel} is required`;
        if (showCountrySelect && !selectedCountry) newErrors.selectedCountry = 'Country is required';
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

        // ✅ Log the destination data
        console.log('Form Data:', formData);
        console.log('Destination Data:', destination);
        // 👈 Log dest info here

        const payload = {
            ...formData,
            country: showCountrySelect ? selectedCountry : undefined, // ✅ Use 'country' to match backend expectations
            destination: destination
                ? {
                    id: destination._id,
                    title: destination.title,
                    country: destination.country,
                    slug: destination.slug,
                    image: destination.coverImage,
                    date: destination.createdAt,
                    duration: destination.duration,
                }
                : null,
        };
        console.log('Form Payload:', payload);
        const response = await submitMessageApi(payload);

        if (response.success) {
            toast.success(response.data.message || 'Message sent successfully!');
            setFormData(initialState);
        } else {
            toast.error(response.error || 'Failed to send message');
        }

        setLoading(false);
    };



    return (
        <form
            onSubmit={handleSubmit}
            className='flex flex-col gap-4 text-title-blue bg-light-blue p-6 lg:p-10 rounded-3xl shadow-md lg:max-w-lg w-full'
        >


            <InputField label='Name' name='name' type='text' placeholder='Enter your name' value={formData.name} onChange={handleChange} error={errors.name} />
            <InputField label='Email' name='email' type='email' placeholder='Enter your email' value={formData.email} onChange={handleChange} error={errors.email} />
            <InputField label='Phone Number' name='phone' type='tel' placeholder='Enter your phone number' value={formData.phone} onChange={handleChange} error={errors.phone} />
            <InputField label={messageLabel} name={messageFieldName} type='textarea' placeholder={messagePlaceholder} value={formData[messageFieldName]} onChange={handleChange} error={errors[messageFieldName]} height='small' />
            {showCountrySelect && (
                <div>
                    <CountrySelect value={selectedCountry} onChange={setSelectedCountry} />
                </div>
            )}

            <ReusableSubmitButton text={buttonText} loadingText='Submitting...' loading={loading} />
        </form>
    );
};



export default ContactForm;

// Reusable Input Component
const InputField = ({ label, name, type, placeholder, value, onChange, error, height = 'normal' }) => {
    const baseClass = `border rounded-xl px-3 ${error ? 'border-red-500' : 'border-secondary-blue focus:outline-none focus:ring-1 focus:ring-blue-500'}`;
    const inputClass = `${baseClass} py-2`; // reduced height
    const textareaClass = `${baseClass} py-2 resize-none`;

    return (
        <div className='flex flex-col gap-1'>
            <label className='text-secondary-blue'>{label}</label>
            {type === 'textarea' ? (
                <textarea
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    rows={height === 'small' ? 2 : 4}
                    className={textareaClass}
                />
            ) : (
                <input
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className={inputClass}
                />
            )}
            {error && <p className='text-red-500 text-sm'>{error}</p>}
        </div>
    );
};
