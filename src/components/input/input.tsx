import React from 'react';
import './input.scss';
import InputProp from './type';

const Input = ({ type, classNameWrapper = '', className = '', placeholder, value = '', onChange, error }: InputProp) => {
    const classesWrapper = `input-wrapper ${classNameWrapper}`;
    const classes = `input ${className}`;

    return (
        <div className={classesWrapper}>
            <input type={type} value={value} className={classes} placeholder={placeholder} onChange={onChange} />
            {error && <span className='input-error'>Error: {error}</span>}
        </div>
    );
};

export default Input;