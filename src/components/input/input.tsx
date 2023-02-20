import React from 'react';
import './input.scss';
import InputProp from './type';

const Input = ({ type, classNameWrapper = '', className = '', placeholder, value = '', title = '', onChange, onBlur, error, disabled, autoFocus }: InputProp) => {
    const classesWrapper = `input-wrapper ${classNameWrapper}`;
    const classes = `input ${className} ${error ? 'input-error' : ''}`;

    return (
      <div className={classesWrapper}>
          <input 
          autoFocus={autoFocus} 
          type={type} 
          value={value} 
          title={title}
          className={classes} 
          placeholder={placeholder} 
          onChange={onChange} 
          onBlur={onBlur} 
          disabled={disabled} />
          {error && <span className="input-error-text">{error}</span>}
      </div>
    );
};

Input.defaultProps = {
    placeholder: '',
    autoFocus: false,
};

export default Input;
