interface InputProp {
    type: string,
    className?: string,
    placeholder: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    error?: string
}

export default InputProp;