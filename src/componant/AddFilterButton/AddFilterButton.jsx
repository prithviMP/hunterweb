import React from 'react';

import { Icons } from '../../Icons/Icons';

const AddFilterButton = ({ onClick }) => {
    return (
       <button onClick={onClick} style={{display: 'flex', alignItems: 'center', gap: 5, backgroundColor: 'var(--primary-color)', border: '1px solid var(--card-border)', borderRadius: 5, padding: '8px 10px', cursor: 'pointer'}}>
        <img src={Icons.filter_icon} alt="filter" style={{width: 16, height: 16}} />
        <span style={{fontSize: 16, fontWeight: 'var(--extra-semi-bold)', fontFamily: 'var(--montserrat)', color: 'var(--white-color)'}}>Add Filter</span>
       </button>
    );
};

export default AddFilterButton;