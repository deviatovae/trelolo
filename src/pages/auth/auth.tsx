import React from 'react';
import Button from '../../components/button/button';
import { Login } from '../../components/login/login';
import { Logo } from '../../components/logo/logo';
import './auth.scss';

export const Auth = () => {

    return (
        <main className='auth-main'>
            <section className='auth-section' >
                <Logo textDisplay='logo-text-none' />
                <Login/>
                <span className='auth-span'><strong>OR</strong></span>
                <Button children='Sign up' className='button-sign-up'/>
            </section>
            <div className='auth-img'></div>
        </main>
    );
};
