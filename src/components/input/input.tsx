import React from 'react';
import './input.scss';
import InputProp from './type';

const Input = ({ type, className, placeholder, value = '', onChange, error }: InputProp) => {
    const classes = `input ${className}`;

    return <>
    <input type={type} value = {value} className = {classes} placeholder = {placeholder} onChange = {onChange}/>
    <span className='input-error'>Error {error}</span>
    </>;
};

export default Input;