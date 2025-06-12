import React, { useEffect, useState } from 'react';

// Predefined list of Gulf countries and labor-sending countries
const predefinedCountries = [
    { name: 'United Arab Emirates', code: '+971' },
    { name: 'Saudi Arabia', code: '+966' },
    { name: 'Qatar', code: '+974' },
    { name: 'Kuwait', code: '+965' },
    { name: 'Bahrain', code: '+973' },
    { name: 'Oman', code: '+968' },
    { name: 'India', code: '+91' },
    { name: 'Pakistan', code: '+92' },
    { name: 'Bangladesh', code: '+880' },
    { name: 'Nepal', code: '+977' },
    { name: 'Sri Lanka', code: '+94' },
    { name: 'Philippines', code: '+63' },
];

const MobileInput = ({ value, onChange, countryCode, onCountryCodeChange }) => {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        setCountries(predefinedCountries);

        // ✅ Set default to +91 (India) if not already set
        if (!countryCode) {
            onCountryCodeChange('+91');
        }
    }, []);

    return (
        <div className="flex gap-2 items-center">
            {/* Country code selector */}
            <select
                style={{
                    paddingRight: '30px',
                    backgroundImage: `url("data:image/svg+xml;utf8,<svg fill='black' height='10' viewBox='0 0 24 24' width='10' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 6px center',
                    backgroundSize: '20px 20px',
                    appearance: 'none',
                }}
                className="w-1/3 px-3 pr-3 py-2 border border-secondary-blue text-secondary-blue rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={countryCode}
                onChange={(e) => onCountryCodeChange(e.target.value)}
            >
                {countries.map((country, idx) => (
                    <option key={idx} value={country.code}>
                        ({country.code}) {country.name}
                    </option>
                ))}
            </select>

            {/* Phone number input */}
            <input
                type="tel"
                placeholder="Phone number"
                className="w-2/3 px-4 py-2 text-secondary-blue border border-secondary-blue rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
};

export default MobileInput;