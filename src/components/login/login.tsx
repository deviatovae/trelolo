import React, { FormEvent, useState } from 'react';
import Button from '../../components/button/button';
import Input from '../../components/input/input';
import './login.scss';

export const Login = () => {
    const [emailValue, setEmailValue] = useState('');
    const [passwordlValue, setPasswordValue] = useState('');
    const [step, setStep] = useState(1);

    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmailValue(e.target.value);
    };

    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordValue(e.target.value);
    };

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (step === 1) {
            setStep(step + 1);
        }
    };

    return (
        <form onSubmit={onSubmit} className='login-form'>
            <h1 className='login-title'>Log in to Trelolo</h1>
            {step === 1 ? <Input
                type='email'
                placeholder='Enter email'
                value={emailValue}
                onChange={onChangeEmail}
                error='knf'
                className='input-login'
            /> : <Input
                type='password'
                placeholder='Enter password'
                value={passwordlValue}
                onChange={onChangePassword}
                error='knf'
                className='input-login'
            />}
            <Button className='button-login '>
                {step === 1 ? 'Continue' : 'Login'}
            </Button>
        </form>
    );
};