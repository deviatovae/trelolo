import React, { createContext, ReactElement, useState } from 'react';
import { authorizeUser, createUser } from '../API/loginService';
import { LoginData, ResponseDataLogin, UserInfo } from '../API/types';

export interface InitialContext { 
    isAuth: boolean, 
    setIsAuth: (val: boolean) => void,
    submitSignup:  (info: LoginData) =>  Promise<{
        errors: Errors | null;
        data: string | null;
    }>,
    submitLogin:  (info: LoginData) =>  Promise<{
        errors: Errors | null;
        data: ResponseDataLogin | null;
    }>,
    userInfo: UserInfo | null,
}

export interface Errors {
    errors?: []
    error?: '',
}

export const getToken = () => localStorage.getItem('token') || '';

export const getUserInfo = () => JSON.parse(localStorage.getItem('user') || '') || '';

export const AuthContext = createContext<InitialContext | null>(null);

export const AuthProvider = ({ children }: { children: ReactElement }) => {
    const [isAuth, setIsAuth] = useState(false);
    const [token, setToken] = useState<string>(getToken());
    const [userInfo, setUserInfo]  = useState<UserInfo | null>(null);

    const submitSignup = async (info: LoginData) => {
        let errors: Errors | null = null;
        let data = null;
        try {
            data = await createUser(info) as string;
        } catch (error) {
            if (error instanceof Error) {
                errors = JSON.parse(error.message ) as Errors;
            }
        }

        return { errors, data };
    };

    const updateToken = (value: string) => {
        localStorage.setItem('token', value);
        setToken(value);
        setIsAuth(true);
    };

    const updateUserInfo = (user: UserInfo) => {
        localStorage.setItem('user', JSON.stringify(user));
        setUserInfo(user);
    };

    const submitLogin = async (info: LoginData) => {
        let errors: Errors | null = null;
        let data = null;
        try {
            data = await authorizeUser(info) as ResponseDataLogin;

            const { data: { user, token: tokenResponse } } = data;
            updateToken(tokenResponse);
            updateUserInfo(user);


        } catch (error) {
            if (error instanceof Error) {
                errors = JSON.parse(error.message ) as Errors;
            }
        }
        return { errors, data };
    };
   
    return <AuthContext.Provider value={{
        isAuth,
        setIsAuth, 
        submitSignup,
        submitLogin,
        userInfo,
      }}>
        {children}
    </AuthContext.Provider>;
};