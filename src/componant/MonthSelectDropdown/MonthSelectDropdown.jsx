import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './MonthSelectDropdown.css';

const MonthSelectDropdown = ({ onMonthSelect, Icons }) => {
    const [selectedMonth, setSelectedMonth] = useState('January');

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const handleMonthChange = (event) => {
        const selected = event.target.value;
        setSelectedMonth(selected);
        onMonthSelect(selected);  // Pass the selected month to the parent component
    };

    return (
        <div className="month-select-dropdown">
            <img className='date_icon' src={Icons.date} style={{ width: 16, height: 16 }} />
            <select value={selectedMonth} onChange={handleMonthChange}>
                {months.map((month, index) => (
                    <option key={index} value={month}>{month}</option>
                ))}
            </select>
            <img className='arrow_down_icon' src={Icons.arrow_down} style={{ width: 15, height: 10 }} />
        </div>
    );
};

MonthSelectDropdown.propTypes = {
    onMonthSelect: PropTypes.func.isRequired,
    Icons: PropTypes.object.isRequired,
};

export default MonthSelectDropdown;
