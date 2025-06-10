import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CustomDatePicker = (props) => {
    return (
        <div className="relative z-20">
            {/* Inline style injection for datepicker popup */}
            <style>
                {`

  .react-datepicker__triangle {
  display: none !important;
}
    /* Popup z-index */
    .react-datepicker-popper {
      z-index: 50 !important;
    }

   

    /* Header styling */
    .react-datepicker__header {
      background-color: #E0F0FF !important;
     color: #001B48 !important;
    }

    .react-datepicker__day-name {
      color: #001B48 !important;
      font-weight: 500;
    }

    /* Disabled days */
    .react-datepicker__day--disabled {
      color: #005BF0 !important;
      opacity: 30% !important;
      cursor: not-allowed !important;
    }

    /* Valid days */
    .react-datepicker__day:not(.react-datepicker__day--disabled) {
      color: #001B48 !important;
    }

    /* Selected day */
    .react-datepicker__day--selected,
    .react-datepicker__day--keyboard-selected {
      background-color: #E0F0FF !important;
      color: #001B48 !important;
    }

  
  `}
            </style>




            <DatePicker
                {...props} />
        </div>
    );
};

export default CustomDatePicker;
