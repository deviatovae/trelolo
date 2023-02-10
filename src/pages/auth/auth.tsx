import React, { useState } from 'react';
import Button from '../../components/button/button';
import { Login } from '../../components/login/login';
import { Logo } from '../../components/logo/logo';
import { Signup } from '../../components/signup/signup';
import './auth.scss';
import { useAuth } from '../../hooks/auth';
import { Navigate } from 'react-router-dom';
import { Route } from '../../router/routes';

export const Auth = () => {
    const [currentStage, setStage] = useState(1);

    const onStageClick = () => {
        if (currentStage === 2) {
            setStage(1);
            return;
        }
        setStage(currentStage + 1);
    };

    const goToLogin = () => {
        setStage(1);
    };

    const { isAuth } = useAuth();
    if (isAuth) {
        return <Navigate to={Route.MAIN}/>;
    }

    return (
        <main className='auth-main'>
            <section className='auth-section' >
                <Logo textDisplay='logo-text-none' />
                { currentStage === 1 ? <Login/> : <Signup goToLogin={goToLogin} /> }
                <div className="auth-separator">
                    <span className="separator-line"></span>
                    <span className='auth-span'>or</span>
                    <span className="separator-line"></span>
                </div>
                <Button className='button-sign-up' onClick={onStageClick}>{ currentStage === 1 ? 'Sign up' : 'Log in' }</Button>
            </section>
            <div className='auth-img'></div>
        </main>
    );
};
