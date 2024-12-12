import React from 'react';
import PropTypes from 'prop-types';

const CommonButton = ({ text, onClick = () => { }, style = { backgroundColor: "#007BFF", color: '#FFF', padding: '10px 20px 10px 30px', borderRadius: '25px', border: 'none', fontFamily: 'Montserrat',cursor:'pointer' }, className = "" }) => {
    return (
        <button
            onClick={onClick}
            style={style}
            className={className}
        >
            {text}
        </button>
    );
};

// Prop types for validation
CommonButton.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    style: PropTypes.object,
    className: PropTypes.string,
};

export default CommonButton;
