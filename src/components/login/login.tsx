import React, { FormEvent, useState } from 'react';
import Button from '../../components/button/button';
import Input from '../../components/input/input';
import { validateEmail } from '../../utils/validation';
import './login.scss';
import { Errors } from '../../API/types';
import { useAuth } from '../../hooks/auth';
import { useTranslate } from '../../hooks/useTranslate';
import { Message } from '../languages/messages';
import { FormattedMessage } from 'react-intl';

export const Login = () => {
    const { trans } = useTranslate();
    const [email, setEmail] = useState({ value: '', error: '' });
    const [password, setPasswordValue] = useState({ value: '', error: '' });
    const { submitLogin, isInProgress } = useAuth();
    const [step, setStep] = useState(1);
    const [errors, setErrors] = useState<Errors | null>(null);

    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (errors) {
            setErrors(null);
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
            setEmail({ ...email, error: trans(Message.InvalidEmail) });
            return;
        }

        if (step === 1) {
            setStep(step + 1);
            return;
        }

        const { errors: responseErrors } = await submitLogin({ email: email.value, password: password.value });

        if (responseErrors) {
            setStep(1);
            setPasswordValue({ value: '', error: '' });
            setErrors(responseErrors);
        }
    };

    return (
        <form onSubmit={onSubmit} className="login-form" autoComplete="on">
            <h1 className="login-title"><FormattedMessage id={Message.LoginTrelolo} /></h1>
            {errors && errors.map(error => <span className="login-error">{(typeof error === 'string' ? error : error.msg)}</span>)}
            {step === 1 ? <Input
              type="email"
              name="email"
              placeholder={trans(Message.EnterEmail)}
              value={email.value}
              onChange={onChangeEmail}
              error={email.error}
              classNameWrapper="input-login-wrapper"
              disabled={isInProgress}
              autoComplete="on"
            /> : (<>
                <Input type="hidden" name="email" value={email.value} autoComplete="on"/>
                <Input
                  type="password"
                  name="password"
                  placeholder={trans(Message.EnterPassword)}
                  value={password.value}
                  onChange={onChangePassword}
                  error={password.error}
                  classNameWrapper="input-login-wrapper"
                  disabled={isInProgress}
                  autoComplete="on"
                />
            </>)}
            <Button className='button-login' isLoading={isInProgress}>
                {step === 1 ? trans(Message.Continue) : trans(Message.LogIn)}
            </Button>
        </form>
    );
};
