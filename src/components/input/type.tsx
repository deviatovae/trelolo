import React from 'react';

interface InputProp {
    type: string,
    className?: string,
    placeholder: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void,
    error?: string,
    classNameWrapper?: string,
    disabled?: boolean
}

export default InputProp;
