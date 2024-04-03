import React from 'react';
import './Tooltip.css';

const Tooltip = ({ text }) => {

    return (
        <div className="tooltip">
            {text}
        </div>
    );
};

export default Tooltip;