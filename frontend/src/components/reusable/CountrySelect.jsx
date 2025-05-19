import { useEffect, useState } from 'react';
import Select from 'react-select';
import fallbackCountries from '../../data/fallbackCoutries';

const CountrySelect = ({ value, onChange }) => {
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCountries = async () => {
        const cached = localStorage.getItem('countries');
        if (cached) {
            try {
                const parsed = JSON.parse(cached);
                if (Array.isArray(parsed) && typeof parsed[0]?.label === 'string') {
                    setOptions(parsed);
                    setLoading(false);
                    return;
                } else {
                    console.warn("Invalid cached countries format. Refetching...");
                    localStorage.removeItem('countries');
                }
            } catch (e) {
                console.warn("Failed to parse cached countries:", e);
                localStorage.removeItem('countries');
            }
        }

        try {
            const res = await fetch('https://restcountries.com/v3.1/all');
            if (!res.ok) throw new Error('API response not ok');

            const data = await res.json();
            const countries = data
                .map((country) => ({
                    label: country.name.common, // string only
                    value: country.name.common,
                    flag: country.flags.svg,
                }))
                .sort((a, b) => a.label.localeCompare(b.label));

            setOptions(countries);
            localStorage.setItem('countries', JSON.stringify(countries));
        } catch (err) {
            console.error('Failed to fetch countries from API, using fallback.', err);
            setOptions(fallbackCountries);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCountries();
    }, []);

    const customSingleValue = ({ data }) => (
        <div className="flex items-center gap-2">
            {data.flag && (
                <img src={data.flag} alt={data.label} className="w-5 h-4 object-cover rounded-sm" />
            )}
            <span>{data.label}</span>
        </div>
    );

    const customOption = (props) => {
        const { data, innerRef, innerProps } = props;
        return (
            <div ref={innerRef} {...innerProps} className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100">
                {data.flag && (
                    <img src={data.flag} alt={data.label} className="w-5 h-4 object-cover rounded-sm" />
                )}
                <span>{data.label}</span>
            </div>
        );
    };

    return (
        <div className="w-full">
            <label className="block text-sm font-medium mb-1">Country</label>
            <Select
                isLoading={loading}
                options={options}
                value={options.find(option => option.value === value) || null}
                onChange={(selected) => onChange(selected.value)}
                placeholder="Select a country..."
                components={{ SingleValue: customSingleValue, Option: customOption }}
            />
        </div>
    );
};

export default CountrySelect;