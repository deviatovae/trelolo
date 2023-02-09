import React, { FormEvent, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/button/button';
import Input from '../../components/input/input';
import { AuthContext, InitialContext } from '../../context';
import { validateEmail } from '../../pages/auth/validation';
import './login.scss';

export const Login = () => {
    const [email, setEmail] = useState({ value: '', error: '' });
    const [password, setPasswordValue] = useState({ value: '', error: '' });
    const { submitLogin, isInProgress } = useContext(AuthContext) as InitialContext;
    const [step, setStep] = useState(1);
    const [errors, setError] = useState<[] | null>(null);

    const history = useNavigate();

    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (errors) {
            setError(null);
        }
        setEmail({ value: e.target.value, error: '' });
    };

    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordValue({ value: e.target.value, error: '' });
    };

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (isInProgress) {
            return;
        }

        if (!validateEmail(email.value)) {
            setEmail({ ...email, error: 'Invalid email' });
            return;
        }

        if (step === 1) {
            setStep(step + 1);
            return;
        }

        const { errors: responseErrors } = await submitLogin({ email: email.value, password: password.value });

        if (responseErrors?.errors) {
            setStep(1);
            setError(responseErrors.errors);
        } else history('/main');
    };

    return (
        <form onSubmit={onSubmit} className='login-form'>
            <h1 className='login-title'>Log in to Trelolo</h1>
            {errors && errors.map(error => (<span className='login-error'>{error}</span>))}
            {step === 1 ? <Input
                type='email'
                placeholder='Enter email'
                value={email.value}
                onChange={onChangeEmail}
                error={email.error}
                classNameWrapper='input-login-wrapper'
                disabled={isInProgress}
            /> : <Input
                type='password'
                placeholder='Enter password'
                value={password.value}
                onChange={onChangePassword}
                error={password.error}
                classNameWrapper='input-login-wrapper'
                disabled={isInProgress}
            />}
            <Button className='button-login' disabled={isInProgress}>
                {step === 1 ? 'Continue' : 'Login'}
            </Button>
        </form>
    );
};