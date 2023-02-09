import React, { createContext, ReactElement, useEffect, useState } from 'react';
import { authorizeUser, createUser, getUser } from '../API/loginService';
import { LoginData, ResponseDataLogin, ResponseDataUser, UserInfo } from '../API/types';

export interface InitialContext {
  isAuth: boolean,
  setIsAuth: (val: boolean) => void,
  submitSignup: (info: LoginData) => Promise<{
    errors: Errors | null;
    data: string | null;
  }>,
  submitLogin: (info: LoginData) => Promise<{
    errors: Errors | null;
    data: ResponseDataLogin | null;
  }>,
  userInfo: UserInfo | null,
  token: string,
  isInProgress: boolean,
  getUserData: () => Promise<{
    errors: Errors | null;
    data: ResponseDataUser | null;
  }>,
  logout: () => void
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
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isInProgress, setIsInProgress] = useState(false);

  const submitSignup = async (info: LoginData) => {
    let errors: Errors | null = null;
    let data = null;
    setIsInProgress(true);
    try {
      data = await createUser(info) as string;
    } catch (error) {
      if (error instanceof Error) {
        errors = JSON.parse(error.message) as Errors;
      }
    }
    setIsInProgress(false);

    return { errors, data };
  };

  const updateToken = (value: string) => {
    localStorage.setItem('token', value);
    setToken(value);
    setIsAuth(true);
  };

  const updateUserInfo = async (user?: UserInfo) => {
    if (user) {
      setUserInfo(user);
        console.log(user);

    }

    const { data, errors } = await getUserData();

    if (!errors && data) {
      setUserInfo(data.data);
    }
  };

  const submitLogin = async (info: LoginData) => {
    let errors: Errors | null = null;
    let data = null;
    setIsInProgress(true);
    try {
      data = await authorizeUser(info) as ResponseDataLogin;

      const { data: { user, token: tokenResponse } } = data;
      updateToken(tokenResponse);
      updateUserInfo(user);

    } catch (error) {
      if (error instanceof Error) {
        errors = JSON.parse(error.message) as Errors;
      }
    }
    setIsInProgress(false);
    return { errors, data };
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUserInfo(null);
    setToken('');
  };

  const getUserData = async () => {
    let errors: Errors | null = null;
    let data = null;

    try {
      data = await getUser() as ResponseDataUser;
    } catch (error) {
      if (error instanceof Error) {
        errors = JSON.parse(error.message) as Errors;
      }
    }
    return { errors, data };
  };

  useEffect(()=> {
    updateUserInfo();
  }, []);

  return <AuthContext.Provider value={{
    isAuth,
    setIsAuth,
    submitSignup,
    submitLogin,
    userInfo,
    token,
    isInProgress,
    getUserData,
    logout
  }}>
    {children}
  </AuthContext.Provider>;
};