import React, { useEffect, useState } from 'react';

const MobileInput = ({ value, onChange, countryCode, onCountryCodeChange }) => {
    const [countries, setCountries] = useState([]);

   useEffect(() => {
  const fetchCountries = async () => {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all?fields=name,idd');
      const data = await response.json();

      console.log("Raw country response:", data);

      if (!Array.isArray(data)) {
        console.error("Unexpected response format:", data);
        return;
      }

      const countryData = data
        .filter(country => country.idd?.root)
        .map(country => ({
          name: country.name.common,
          code: `${country.idd.root}${country.idd.suffixes ? country.idd.suffixes[0] : ''}`,
        }))
        .sort((a, b) => a.name.localeCompare(b.name));

      setCountries(countryData);

      if (!countryCode) {
        const india = countryData.find(c => c.code === '+91');
        if (india) {
          onCountryCodeChange(india.code);
        }
      }
    } catch (error) {
      console.error('Failed to fetch country codes:', error);
    }
  };

  fetchCountries();
}, []);



    return (
        <div className="flex gap-2 items-center text-secondary-blue ">
            {/* Country code selector */}
            <select
         style={{
    paddingRight: '30px',  // add space for arrow
    backgroundImage: `url("data:image/svg+xml;utf8,<svg fill='black' height='10' viewBox='0 0 24 24' width='10' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 6px center',  // arrow position
    backgroundSize: '20px 20px',
    appearance: 'none',  // hide native arrow
  }}
                className="w-1/3 px-3 pr-3 py-2 border border-secondary-blue rounded-xl focus:outline-none focus:ring-2 text-secondary-blue  focus:ring-blue-500 "
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
                className="w-2/3 px-4 py-2 border border-secondary-blue text-secondary-blue  rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
};

export default MobileInput;