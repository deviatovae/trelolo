import React, { FormEvent, useContext, useState } from 'react';
import Button from '../../components/button/button';
import Input from '../../components/input/input';
import { AuthContext, InitialContext } from '../../context';
import './signup.scss';
import { validateEmail, validateName, validatePassword } from '../../pages/auth/validation';

interface SignUp {
    goToLogin: () => void;
}

export const Signup = ({ goToLogin }: SignUp) => {
    const [email, setEmail] = useState({ value: '', error: '' });
    const [name, setName] = useState({ value: '', error: '' });
    const [password, setPassword] = useState({ value: '', error: '' });
    const [passwordConfirmed, setPasswordConfirm] = useState({ value: '', error: '' });

    const { submitSignup, isInProgress } = useContext(AuthContext) as InitialContext;

    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail({ value: e.target.value, error: '' });
    };

    const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName({ value: e.target.value, error: '' });
    };

    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword({ value: e.target.value, error: '' });
    };

    const onChangePasswordConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordConfirm({ value: e.target.value, error: '' });
    };

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const isValidEmail = validateEmail(email.value);
        const isValidName = validateName(name.value);
        const isValidPassword = validatePassword(password.value);

        if (!(isValidEmail && isValidName && isValidPassword)) {
            if (!isValidEmail) {
                setEmail({ ...email, error: 'Invalid mail' });
            }

            if (!isValidName) {
                setName({ ...name, error: 'Invalid name, surname. At least two words, each at least 3 characters long' });
            }

            if (!isValidPassword) {
                setPassword({ ...password, error: 'Minimum eight characters, at least one letter and one number' });
            }
            return;
        }

        if (password.value === passwordConfirmed.value) {
            const response = await submitSignup({ email: email.value, name: name.value, password: password.value });

            if (response.errors) {
                console.log(response.errors);
            } else goToLogin();
        } else setPasswordConfirm({ ...passwordConfirmed, error: 'Passwords are not the same' });
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
                classNameWrapper='input-signup-wrapper'
            />
            <Input
                type='text'
                placeholder='Enter name, surname'
                value={name.value}
                onChange={onChangeName}
                error={name.error}
                classNameWrapper='input-signup-wrapper'
            />
            <Input
                type='password'
                placeholder='Enter password'
                value={password.value}
                onChange={onChangePassword}
                error={password.error}
                classNameWrapper='input-signup-wrapper'
            />
            <Input
                type='password'
                placeholder='Confirm password'
                value={passwordConfirmed.value}
                onChange={onChangePasswordConfirm}
                error={passwordConfirmed.error}
                classNameWrapper='input-signup-wrapper'
            />
            <Button className='button-signup' disabled={isInProgress}>Sign Up</Button>
        </form>
    );
};