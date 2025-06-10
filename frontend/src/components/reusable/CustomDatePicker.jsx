import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CustomDatePicker = ({ value, onChange, ...rest }) => {
  return (
    <div className="relative z-20">
      <style>
  {`
    .react-datepicker__triangle {
      display: none !important;
    }

    .react-datepicker-popper {
      z-index: 50 !important;
      transform: translateX(-50px) translateY(20px) !important; /* combine both shifts */
  margin-left: -4px; /* optional: additional adjustment */
    }

    .react-datepicker__header {
      background-color: #E0F0FF !important;
      color: #001B48 !important;
        border-bottom: none !important; /* removes the line */
  box-shadow: none !important;    /* removes any shadow */
    }

    .react-datepicker__current-month {
      font-size: 0.9rem !important; /* reduce month name size */
      font-weight: 600;
    }

    .react-datepicker__day-name {
      color: #001B48 !important;
      font-weight: 500;
    }

    .react-datepicker__day--disabled {
      color: #005BF0 !important;
      opacity: 30% !important;
      cursor: not-allowed !important;
    }

    .react-datepicker__day:not(.react-datepicker__day--disabled) {
      color: #001B48 !important;
    }

   .react-datepicker__day--selected {
  background-color: #E0F0FF !important;
  color: #001B48 !important;
}

.react-datepicker__day--keyboard-selected:not(.react-datepicker__day--outside-month) { ... }


.react-datepicker__day--keyboard-selected:not(.react-datepicker__day--outside-month) {
  background-color: transparent !important;
  color: inherit !important;
}


    .react-datepicker__day--outside-month {
      visibility: hidden !important;
    }
  `}
</style>


      <DatePicker
        selected={value}       // ✅ controlled value
        onChange={onChange}    // ✅ controlled change handler
        {...rest}
      />
    </div>
  );
};

export default CustomDatePicker;
