import React, { useState, useCallback, useRef } from 'react';
import AsyncSelect from 'react-select/async';
import { components } from 'react-select';
import { searchAirportsApi } from '../../services/api/airportApi';

const CustomOption = (props) => {
  const { data } = props;

  return (
    <components.Option {...props}>
      <div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <strong>{data.code}</strong>
            <span>{data.city}</span>
          </div>
          <div className="text-gray-600 text-sm">{data.country}</div>
        </div>
        <div className="text-xs text-gray-500">{data.name}</div>
      </div>
    </components.Option>
  );
};

const AirportSelect = ({ value, onChange, placeholder, name, ...rest }) => {
  const [defaultOptions, setDefaultOptions] = useState([]);
  const timeoutRef = useRef(null);

  // ✅ Debounced loader function
  const debounceLoadOptions = useCallback((inputValue, callback) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(async () => {
      const res = await searchAirportsApi(inputValue);
      if (!res.success) return callback([]);

      const options = res.data.map((airport) => ({
        value: airport.code,
        label: `${airport.code} - ${airport.city} - ${airport.state ? airport.state + ' - ' : ''}${airport.name} - ${airport.country}`,
        code: airport.code,
        city: airport.city,
        country: airport.country,
        name: airport.name,
        state: airport.state || '',
      }));

      callback(options);
    }, 400); // debounce delay (ms)
  }, []);

  // ✅ Load default options when menu opens (first 10 results)
  const handleMenuOpen = useCallback(async () => {
    if (defaultOptions.length === 0) {
      const res = await searchAirportsApi(''); // Empty query returns top 10
      if (res.success) {
        const options = res.data.map((airport) => ({
          value: airport.code,
          label: `${airport.code} - ${airport.city} - ${airport.state ? airport.state + ' - ' : ''}${airport.name} - ${airport.country}`,
          code: airport.code,
          city: airport.city,
          country: airport.country,
          name: airport.name,
          state: airport.state || '',
        }));
        setDefaultOptions(options);
      }
    }
  }, [defaultOptions]);

  return (
    <AsyncSelect
      cacheOptions
      loadOptions={debounceLoadOptions}
      defaultOptions={defaultOptions}
      onMenuOpen={handleMenuOpen}
      onChange={(selected) => onChange(name, selected?.value)}
      placeholder={placeholder}
      isClearable
      components={{
        Option: CustomOption,
        DropdownIndicator: () => null,
        IndicatorSeparator: () => null,
        ClearIndicator: () => null,
      }}
      className="text-sm"
      styles={{
        control: (base) => ({
          ...base,
          border: 'none',
          boxShadow: 'none',
          backgroundColor: 'transparent',
          minHeight: 'auto',
          width: '160px',
          paddingLeft: '1px',
          paddingRight: '1px',
          cursor: 'text',
        }),
        valueContainer: (base) => ({
          ...base,
          padding: '0',
        }),
        input: (base) => ({
          ...base,
          margin: 0,
          padding: 0,
          minWidth: '100px',
        }),
        indicatorsContainer: (base) => ({
          ...base,
          display: 'none',
        }),
        menu: (base) => ({
          ...base,
          width: '300px',
          marginLeft: '-20px',
          zIndex: 9999,
        }),
        menuPortal: (base) => ({
          ...base,
          zIndex: 9999,
        }),
        option: (base) => ({
          ...base,
          fontSize: '0.875rem',
          padding: '10px',
        }),
      }}
      menuPortalTarget={typeof document !== 'undefined' ? document.body : null}
    />
  );
};

export default AirportSelect;