import React, { FormEvent, useState } from 'react';
import Button from '../../components/button/button';
import Input from '../../components/input/input';
import './login.scss';

export const Login = () => {
    const [email, setEmail] = useState({ value: '', error: '' });
    const [password, setPasswordValue] = useState({ value: '', error: '' });

    const [step, setStep] = useState(1);

    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail({ ...email, value: e.target.value });
    };

    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordValue({ ...password, value: e.target.value });
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
                value={email.value}
                onChange={onChangeEmail}
                error={email.error}
                classNameWrapper = 'input-login-wrapper'
                /> : <Input
                type='password'
                placeholder='Enter password'
                value={password.value}
                onChange={onChangePassword}
                error={password.error}
                classNameWrapper ='input-login-wrapper'
            />}
            <Button className='button-login '>
                {step === 1 ? 'Continue' : 'Login'}
            </Button>
        </form>
    );
};