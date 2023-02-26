import React, { RefObject } from 'react';

interface InputProp {
    type: string,
    name?: string,
    className?: string,
    placeholder: string,
    value: string,
    title?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void,
    error?: string,
    classNameWrapper?: string,
    disabled?: boolean
    inputRef?: RefObject<HTMLInputElement>
    autoFocus: boolean
    autoComplete?: string
    maxLength?: number
}

export default InputProp;
