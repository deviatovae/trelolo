import React from 'react';
import './input.scss';
import InputProp from './type';

const Input = ({ type, classNameWrapper = '', className = '', placeholder, value = '', onChange, onBlur, error, disabled }: InputProp) => {
    const classesWrapper = `input-wrapper ${classNameWrapper}`;
    const classes = `input ${className} ${error ? 'input-error' : ''}`;

    return (
        <div className={classesWrapper}>
            <input type={type} value={value} className={classes} placeholder={placeholder} onChange={onChange} onBlur={onBlur} disabled={disabled}/>
            {error && <span className='input-error-text'>{error}</span>}
        </div>
    );
};

Input.defaultProps = {
    placeholder: ''
};

export default Input;
