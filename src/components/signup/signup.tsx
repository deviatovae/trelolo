import React, { FormEvent, useState } from 'react';
import Button from '../../components/button/button';
import Input from '../../components/input/input';
import './signup.scss';

export const Signup = () => {
    const [email, setEmail] = useState({ value: '', error: '' });
    const [name, setName] = useState({ value: '', error: '' });
    const [password, setPassword] = useState({ value: '', error: '' });
    const [passwordConfirmed, setPasswordConfirm] = useState({ value: '', error: '' });
    const [step, setStep] = useState(1);

    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail({ ...email, value: e.target.value });
    };

    const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName({ ...name, value: e.target.value });
    };

    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword({ ...password, value: e.target.value });
    };

    const onChangePasswordConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordConfirm({ ...passwordConfirmed, value: e.target.value });
    };

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (step === 1) {
            setStep(step + 1);
        }
    };

    return (
        <form onSubmit={onSubmit} className='signup-form'>
            <h1 className='signup-title'>Sign up to Trelolo</h1>
            <Input
                type='email'
                placeholder='Enter email'
                value={email.value}
                onChange={onChangeEmail}
                error={email.error}
                classNameWrapper = 'input-signup-wrapper'
            />
            <Input
                type='text'
                placeholder='Enter name, surname'
                value={name.value}
                onChange={onChangeName}
                error={name.error}
                classNameWrapper = 'input-signup-wrapper'
            />
            <Input
                type='password'
                placeholder='Enter password'
                value={password.value}
                onChange={onChangePassword}
                error={password.error}
                classNameWrapper = 'input-signup-wrapper'
            />
            <Input
                type='password'
                placeholder='Confirm password'
                value={passwordConfirmed.value}
                onChange={onChangePasswordConfirm}
                error={passwordConfirmed.error}
                classNameWrapper = 'input-signup-wrapper'
            />
            <Button className='button-signup'>Sign Up</Button>
        </form>
    );
};