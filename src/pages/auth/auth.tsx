import React, { useState } from 'react';
import Button from '../../components/button/button';
import { Login } from '../../components/login/login';
import { Logo } from '../../components/logo/logo';
import { Signup } from '../../components/signup/signup';
import './auth.scss';

export const Auth = () => {
    const [currentStage, setStage] = useState(1);

    const onStageClick = () => {
        if (currentStage === 2) {
            setStage(1);
            return;
        }
        setStage(currentStage + 1);
    };

    return (
        <main className='auth-main'>
            <section className='auth-section show-auth-section' >
                <Logo textDisplay='logo-text-none' />
                { currentStage === 1 ? <Login/> : <Signup/> }
                <span className='auth-span'><strong>OR</strong></span>
                <Button className='button-sign-up' onClick={onStageClick}>{ currentStage === 1 ? 'Sign up' : 'Log in' }</Button>
            </section>
            <div className='auth-img show-auth-img'></div>
        </main>
    );
};
