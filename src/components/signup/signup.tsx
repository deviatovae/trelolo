import React, { FormEvent, useState } from 'react';
import Button from '../../components/button/button';
import Input from '../../components/input/input';
import './signup.scss';
import { validateEmail, validateName, validatePassword } from '../../utils/validation';
import { Errors } from '../../API/types';
import { useAuth } from '../../hooks/auth';
import { Message } from '../languages/messages';
import { useTranslate } from '../../hooks/useTranslate';
import { FormattedMessage } from 'react-intl';

interface SignUp {
    goToLogin: () => void;
}

export const Signup = ({ goToLogin }: SignUp) => {
    const { trans } = useTranslate();
    const [email, setEmail] = useState({ value: '', error: '' });
    const [name, setName] = useState({ value: '', error: '' });
    const [password, setPassword] = useState({ value: '', error: '' });
    const [passwordConfirmed, setPasswordConfirm] = useState({ value: '', error: '' });
    const [generalErrors, setGeneralErrors] = useState<string[] | null>(null);

    const { submitSignup, isInProgress } = useAuth();

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

    const handleErrors = (errors: Errors): void => {
        if (!errors) {
            return;
        }
        const map = {
            name: setName,
            email: setEmail,
            password: setPassword,
        };
        errors.forEach(error => {
            if (typeof error === 'string') {
                return setGeneralErrors(prev => prev ? [...prev, error] : [error]);
            }
            const param = error.param as keyof typeof map;
            map[param](prev => ({ value: prev.value, error: error.msg }));
        });
    };

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const isValidEmail = validateEmail(email.value);
        const isValidName = validateName(name.value);
        const isValidPassword = validatePassword(password.value);

        if (!(isValidEmail && isValidName && isValidPassword)) {
            if (!isValidEmail) {
                setEmail({ ...email, error: trans(Message.InvalidEmail) });
            }

            if (!isValidName) {
                setName({ ...name, error: trans(Message.InvalidUserName) });
            }

            if (!isValidPassword) {
                setPassword({ ...password, error: trans(Message.InvalidPassword) });
            }
            if (!passwordConfirmed.value) {
                setPasswordConfirm(prev => ({ ...prev, error: trans(Message.EnterPasswordConfirm) }));
            }
            return;
        }

        if (password.value === passwordConfirmed.value) {
            const { errors: responseErrors } = await submitSignup({ email: email.value, name: name.value, password: password.value });
            if (!responseErrors) {
                return goToLogin();
            }
            handleErrors(responseErrors);

        } else setPasswordConfirm({ ...passwordConfirmed, error: trans(Message.InvalidPasswordConfirm) });
    };

    return (
        <form onSubmit={onSubmit} className='signup-form'>
            <h1 className="signup-title"><FormattedMessage id={Message.SignUpTrelolo} /></h1>
            {generalErrors && generalErrors.map(error => <span className="login-error">{error}</span>)}
            <Input
              type="email"
              placeholder={trans(Message.EnterEmail)}
              value={email.value}
              onChange={onChangeEmail}
              error={email.error}
              classNameWrapper='input-signup-wrapper'
            />
            <Input
              type="text"
              placeholder={trans(Message.EnterUsername)}
              value={name.value}
              onChange={onChangeName}
              error={name.error}
              classNameWrapper='input-signup-wrapper'
            />
            <Input
              type="password"
              placeholder={trans(Message.EnterPassword)}
              value={password.value}
              onChange={onChangePassword}
              error={password.error}
              classNameWrapper='input-signup-wrapper'
            />
            <Input
              type="password"
              placeholder={trans(Message.EnterPasswordConfirm)}
              value={passwordConfirmed.value}
              onChange={onChangePasswordConfirm}
              error={passwordConfirmed.error}
              classNameWrapper="input-signup-wrapper"
            />
            <Button className="button-signup" disabled={isInProgress}><FormattedMessage id={Message.SignUp} /></Button>
        </form>
    );
};
