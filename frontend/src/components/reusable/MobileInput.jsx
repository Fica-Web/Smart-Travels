import React, { useEffect, useState } from 'react';

const MobileInput = ({ value, onChange, countryCode, onCountryCodeChange }) => {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch('https://restcountries.com/v3.1/all');
                const data = await response.json();
                const countryData = data
                    .filter(country => country.idd?.root)
                    .map(country => ({
                        name: country.name.common,
                        code: `${country.idd.root}${country.idd.suffixes ? country.idd.suffixes[0] : ''}`,
                    }))
                    .sort((a, b) => a.name.localeCompare(b.name));
                setCountries(countryData);
            } catch (error) {
                console.error('Failed to fetch country codes:', error);
            }
        };

        fetchCountries();
    }, []);

    return (
        <div className="flex gap-2 items-center">
            {/* Country code selector */}
            <select
                className="w-1/3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-2/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
};

export default MobileInput;