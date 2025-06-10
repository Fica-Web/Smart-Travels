import { useEffect, useState, forwardRef, useRef, useImperativeHandle } from 'react';
import Select from 'react-select';
import fallbackCountries from '../../data/fallbackCoutries';
import { components } from 'react-select';

const CountrySelect = forwardRef(
  ({ value, onChange, variant, placeholder = "Select a country...", label = 'Country', noBorder = false, isHotel = false }, ref) => {
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [menuOpen, setMenuOpen] = useState(false);

    const selectRef = useRef(null);

    // Allow parent to call ref.current.focus() to open menu
    useImperativeHandle(ref, () => ({
      focus: () => {
        setMenuOpen(true);
        selectRef.current?.focus();
      }
    }));

    const handleOpenSelect = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setMenuOpen(true);
      if (ref && typeof ref?.focus === 'function') {
        ref.focus(); // Triggers useImperativeHandle logic
      }
    };

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
            label: country.name.common,
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
        {data.flag && <img src={data.flag} alt={data.label} className="w-5 h-4 object-cover rounded-sm" />}
        <span>{data.label}</span>
      </div>
    );

    const customOption = (props) => {
      const { data, innerRef, innerProps } = props;
      return (
        <div ref={innerRef} {...innerProps} className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100">
          {data.flag && <img src={data.flag} alt={data.label} className="w-5 h-4 object-cover rounded-sm" />}
          <span>{data.label}</span>
        </div>
      );
    };

    const customStyles = {
      control: (provided, state) => ({
        ...provided,
        backgroundColor: "transparent",
        color: "text-title-blue",
        borderRadius: "0.75rem",
        borderColor: noBorder ? "transparent" : (state.isFocused ? "#3B82F6" : "#000"),
        boxShadow: noBorder ? "none" : (state.isFocused ? "0 0 0 1px #3B82F6" : "none"),
        minHeight: isHotel ? "1.75rem" : "2.5rem",
        height: isHotel ? "1.75rem" : "2.5rem",
        padding: isHotel ? "-1rem" : "0 0.5rem",
        "&:hover": {
          borderColor: noBorder ? "transparent" : "#3B82F6",
        },
      }),
      valueContainer: (provided) => ({
        ...provided,
        padding: "0",
        height: "1.75rem",
        display: "flex",
        alignItems: "center",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        width: '100px'
      }),
      indicatorsContainer: (provided) => ({
        ...provided,
        height: isHotel ? "1.75rem" : "2.5rem",
      }),
      dropdownIndicator: (provided) => ({
        ...provided,
        padding: '0 4px',
        marginRight: isHotel ? '4px' : '8px',
        color: 'secondary-blue',
      }),
      input: (provided) => ({
        ...provided,
        margin: 0,
        padding: 0,
      }),
      placeholder: (provided) => ({
        ...provided,
        color: "#001B48",
        opacity: 0.6,
        fontSize: "0.875rem",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }),
      singleValue: (provided) => ({
        ...provided,
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
      }),
      menu: (provided) => ({
        ...provided,
        width: isHotel ? '200px' : 'auto',
        marginLeft: isHotel ? '-20px' : '',
        zIndex: 30,
      }),
    };

    return (
      <div className="w-full cursor-pointer" onClick={handleOpenSelect}>
        <div className="flex items-center justify-between">
          <div className={`flex items-center ${isHotel ? 'gap-1' : ''}`}>
            <label className="block text-sm text-secondary-blue">
              {label}
            </label>
            {isHotel && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-secondary-blue mt-[2px]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            )}
          </div>
        </div>

        <Select
          ref={selectRef}
          menuIsOpen={menuOpen}
          onMenuOpen={() => setMenuOpen(true)}
          onMenuClose={() => setMenuOpen(false)}
          isLoading={loading}
          options={options}
          value={options.find(option => option.value === value) || null}
          onChange={(selected) => {
            onChange(selected.value);
            setTimeout(() => {
              setMenuOpen(false);
            }, 0); // Fix: closes the menu right after selection
          }}
          placeholder={placeholder}
          menuPortalTarget={document.body}
          styles={{
            ...((variant === 'visa' || variant === 'hotel-image') ? customStyles : {}),
            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
          }}
          components={{
            SingleValue: customSingleValue,
            Option: customOption,
            DropdownIndicator: variant === 'hotel-image' ? () => null : components.DropdownIndicator,
            IndicatorSeparator: variant === 'hotel-image' ? () => null : undefined,
          }}
        />
      </div>
    );
  }
);

export default CountrySelect;
