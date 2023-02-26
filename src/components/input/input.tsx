import React from 'react';
import './input.scss';
import InputProp from './type';

const Input = (
  {
    type,
    name,
    classNameWrapper = '',
    className = '',
    placeholder,
    value = '',
    title = '',
    onChange,
    onBlur,
    error,
    disabled,
    autoFocus,
    autoComplete,
    maxLength
  }: InputProp) => {
  const classesWrapper = `input-wrapper ${classNameWrapper}`;
  const classes = `input ${className} ${error ? 'input-error' : ''}`;
  const additionalProps = {
    ...(autoComplete ? { autoComplete } : {})
  };

  return (
    <div className={classesWrapper}>
      <input
        autoFocus={autoFocus}
        type={type}
        name={name}
        value={value}
        title={title}
        className={classes}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        {...additionalProps}
        maxLength={maxLength}
      />
      {error && <span className="input-error-text">{error}</span>}
    </div>
  );
};

Input.defaultProps = {
  placeholder: '',
  autoFocus: false,
};

export default Input;
