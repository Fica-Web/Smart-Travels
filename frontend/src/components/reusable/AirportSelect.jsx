import React, { useState, useEffect } from 'react';
import Select, { components } from 'react-select';
import axios from 'axios';


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
          <div className="text-gray-600 text-sm">
            {data.country}
          </div>
        </div>
        <div className="text-xs text-gray-500">{data.name}</div>
      </div>
    </components.Option>
  );
};



const AirportSelect = ({ value, onChange, placeholder, name, ...rest }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchAirports = async () => {
      try {
        const res = await axios.get('/data/airports.json'); // file must be in public/data
        const data = res.data;
        const airportList = Array.isArray(data) ? data : (data.airports || []);
        console.log("Loaded airports data:", airportList);
        setOptions(
  airportList.map((airport) => ({
    value: airport.code,
    label: `${airport.code} - ${airport.city} - ${airport.state ? airport.state + ' - ' : ''}${airport.name} - ${airport.country}`,
    code: airport.code,
    city: airport.city,
    country: airport.country,
    name: airport.name,
    state: airport.state || '',
  }))
);

      } catch (err) {
        console.error('Failed to load airports', err);
      }
    };

    fetchAirports();
  }, []);

  return (
<Select
  {...rest}
  value={options.find(opt => opt.value === value)}
  onChange={selected => onChange(name, selected?.value)}
  options={options}
  placeholder={placeholder}
  isClearable
  isSearchable
  components={{
    Option: CustomOption,
    DropdownIndicator: () => null,
    IndicatorSeparator: () => null,
    ClearIndicator: () => null,
  }}
  className="text-sm"
  menuPortalTarget={typeof document !== 'undefined' ? document.body : null}
  filterOption={(option, inputValue) => {
    const search = inputValue.toLowerCase();
    return (
      option.data.city?.toLowerCase().includes(search) ||
      option.data.state?.toLowerCase().includes(search) ||
      option.data.name?.toLowerCase().includes(search) ||
      option.data.country?.toLowerCase().includes(search) ||
      option.label?.toLowerCase().includes(search)
    );
  }}
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
/>




  );
};

export default AirportSelect;
