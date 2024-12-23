import React, { useState } from 'react';
import PropTypes from 'prop-types';

const YearSelectList = ({ onYearSelect, Icons }) => {
    const [selectedYear, setSelectedYear] = useState('January');

    const years = [
        '2001', '2002', '2003', '2004', '2005', '2006', '2007',
        '2008', '2009', '2010', '2011', '2012', '2013', '2014',
        '2015', '2016', '2017', '2018', '2019', '2020', '2021',
        '2022', '2023', '2024'
    ];

    const handleYearChange = (event) => {
        const selected = event.target.value;
        setSelectedYear(selected);
        onYearSelect(selected);  // Pass the selected month to the parent component
    };

    return (
        <div className="month-select-dropdown" >
            <img className='date_icon' src={Icons.date} style={{ width: 16, height: 16 }} />
            <select style={{ backgroundColor: '#F5F7FA', color: '#909090' }} value={selectedYear} onChange={handleYearChange} className='cursor'>
                {years.map((month, index) => (
                    <option key={index} value={month}>{month}</option>
                ))}
            </select>
            <img className='arrow_down_icon' src={Icons.arrow_down} style={{ width: 15, height: 10 }} />
        </div>
    );
};

YearSelectList.propTypes = {
    onYearSelect: PropTypes.func.isRequired,
    Icons: PropTypes.object.isRequired,
};

export default YearSelectList;
