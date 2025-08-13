import { useState, useEffect } from 'react';
// import { submitMessageApi } from '../../services/api/userApi'
import { createInquiryApi } from '../../services/api/inquiryApi'
import { toast } from 'react-toastify';
import ReusableSubmitButton from './ReusableSubmitButton';
import CountrySelect from './CountrySelect';
import MobileInput from './MobileInput';

const ContactForm = ({
  buttonText = 'Submit',
  messageFieldName = 'message',
  messageLabel = 'Message',
  messagePlaceholder = 'Your message',
  countrySelectPlaceholder = 'Select your nationality',
  hideMessageField = false,
  defaultMessage = '',
  showCountrySelect = false,
  showLocationSelect = false,
  onSuccess,
  destination = null,
}) => {
  const initialState = {
    name: '',
    email: '',
    phone: '',
    countryCode: '',
    [messageFieldName]: defaultMessage,
  };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [locationCountry, setLocationCountry] = useState('');



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
    if (!hideMessageField && !formData[messageFieldName].trim()) {
      newErrors[messageFieldName] = `${messageLabel} is required`;
    }
    if (showCountrySelect && !selectedCountry) newErrors.selectedCountry = 'Nationality is required';
    if (showLocationSelect && !locationCountry) newErrors.locationCountry = 'Location is required'; // ✅ new

    return newErrors;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const validationErrors = validate();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        setLoading(false);
        return;
      }
      // Base payload
      const payload = {
        name: formData.name,
        phone: `${formData.countryCode} ${formData.phone}`,  // ✅ Now included in payload
        serviceType: destination?.serviceType || '',
      };

      // Add common email if available
      if (formData.email) payload.email = formData.email;
      if (showCountrySelect) payload.country = selectedCountry;
      if (showLocationSelect) payload.location = locationCountry;

      // Add service-type-specific data
      switch (payload.serviceType) {

        case 'flight':
          payload.flightDetails = {
            from: destination?.flightDetails?.from.name || '',
            to: destination?.flightDetails?.to.name || '',
            departureDate: destination?.flightDetails?.departureDate || '',
          };
          break;

        case 'hotel':
          payload.hotelDetails = {
            country: destination?.hotelDetails?.country || '',
            location: destination?.hotelDetails?.location || '',
            checkInDate: destination?.hotelDetails?.checkInDate || '',
            checkOutDate: destination?.hotelDetails?.checkOutDate || '',
          };
          break;

        case 'visa':
          payload.visaDetails = {
            nationality: selectedCountry || '',
            destinationCountry:
              destination?.country || locationCountry || '',
          };
          break;

        case 'umrah':
          payload.umrahDetails = {
            umrahPackageName: destination.umrahPackageName || '',
          };
          break;

        case 'destination':
          payload.destinationDetails = {
            id: destination?.destination?._id || '',
            title: destination?.destination?.title || '',
            country: destination?.destination?.country || '',
          };

          break;
        case 'insurance':
          payload.insuranceDetails = {
            type: formData.policyType || '',  // <-- use policyType from the form
          };
          break;

        default:
          // fallback or generic message
          if (!hideMessageField) {
            payload.message = formData[messageFieldName];
          }
          break;
      }

      const response = await createInquiryApi(payload);

      if (response.success) {
        toast.success(response.data.message || 'Inquiry sent successfully!');
        setFormData(initialState);
        setSelectedCountry('');
        if (onSuccess) {
          onSuccess(); // ✅ Close modal & clear fields in parent
        }
      }
      else {
        toast.error(response.message || 'Failed to send inquiry');
      }
    } catch (error) {
      toast.error('Unexpected error occurred.');
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col gap-4 text-title-blue bg-light-blue p-6 lg:p-13 rounded-3xl  lg:max-w-lg w-full'
    >

      <InputField label='Name' name='name' type='text' placeholder='Enter your name' value={formData.name} onChange={handleChange} error={errors.name} />
      <InputField label='Email' name='email' type='email' placeholder='Enter your email' value={formData.email} onChange={handleChange} error={errors.email} />
      <div className="flex flex-col gap-1">
        <label className="text-secondary-blue">Phone Number</label>
        <MobileInput
          value={formData.phone}
          onChange={(value) => handleChange({ target: { name: 'phone', value } })}
          countryCode={formData.countryCode}
          onCountryCodeChange={(value) => handleChange({ target: { name: 'countryCode', value } })}
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
      </div>


      {/* <InputField label='Phone Number' name='phone' type='tel' placeholder='Enter your phone number' value={formData.phone} onChange={handleChange} error={errors.phone} /> */}


      {showCountrySelect && (
        <div>
          {/* <label className="text-secondary-blue">Nationality</label> */}
          <CountrySelect
            value={selectedCountry}
            onChange={setSelectedCountry}
            variant="visa"
            placeholder={countrySelectPlaceholder || "Select your nationality"}
            label='Nationality'
          />
          {errors.selectedCountry && <p className="text-red-500 text-sm">{errors.selectedCountry}</p>}
        </div>
      )}

      {showLocationSelect && (
        <div>
          <CountrySelect
            value={locationCountry}
            onChange={setLocationCountry}
            variant="visa"
            placeholder="Select your preferred location"
            label='Location'
          />
          {errors.locationCountry && <p className="text-red-500 text-sm">{errors.locationCountry}</p>}
        </div>
      )}
      {!hideMessageField && (
        <InputField
          label={messageLabel}
          name={messageFieldName}  // might be 'policyType'
          placeholder={messagePlaceholder}
          value={formData[messageFieldName]}
          type={
            messageFieldName === 'location' || messageFieldName === 'policyType' ? 'text' : 'textarea'
          }
          onChange={handleChange}
          error={errors[messageFieldName]}
          height="small"
        />

      )}

      <div className="mt-4">
        <ReusableSubmitButton text={buttonText} loadingText='Submitting...' loading={loading} />
      </div>

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