import React, { createContext, ReactElement, useCallback, useEffect, useState } from 'react';
import { authorizeUser, createUser, getUser } from '../API/loginService';
import { LoginData, LoginResponse, Response } from '../API/types';
import { User } from '../types/models';
import { wrapErrors } from '../utils/errorsWrapper';
import { useNavigate } from 'react-router-dom';
import { Route } from '../router/routes';

export interface InitialContext {
  isAuth: boolean,
  setIsAuth: (val: boolean) => void,
  submitSignup: (info: LoginData) => Promise<Response<User | null>>,
  submitLogin: (info: LoginData) => Promise<Response<LoginResponse | null>>,
  userInfo: User | null,
  token: string,
  isInProgress: boolean,
  getUserData: () => Promise<Response<User | null>>,
  logout: () => void
}

export const getToken = () => localStorage.getItem('token') || '';

export const AuthContext = createContext<InitialContext | null>(null);

export const AuthProvider = ({ children }: { children: ReactElement }) => {
  const [token, setToken] = useState<string>(getToken());
  const [isAuth, setIsAuth] = useState(!!token);
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [isInProgress, setIsInProgress] = useState(false);
  const navigate = useNavigate();

  const submitSignup = async (info: LoginData): Promise<Response<User | null>> => {
    try {
      setIsInProgress(true);
      return await createUser(info);
    } catch (error) {
      return wrapErrors(error);
    } finally {
      setIsInProgress(false);
    }
  };

  const updateToken = async (value: string) => {
    localStorage.setItem('token', value);
    setToken(value);
    setIsAuth(true);
  };

  const updateUserInfo = useCallback(async (user?: User) => {
    if (user) {
      setUserInfo(user);
    }

    if (!token) {
      return;
    }

    const { data, errors } = await getUserData();
    if (!errors.length && data) {
      setUserInfo(data);
    }
  }, [token]);

  const submitLogin = async (info: LoginData): Promise<Response<LoginResponse | null>> => {
    setIsInProgress(true);
    try {
      const response = await authorizeUser(info) as Response<LoginResponse>;
      const { data: { user, token: tokenResponse } } = response;
      await updateToken(tokenResponse);
      await updateUserInfo(user);
      navigate(Route.MAIN);

      return response;
    } catch (error) {
      return wrapErrors(error);
    } finally {
      setIsInProgress(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUserInfo(null);
    setToken('');
    setIsAuth(false);
    navigate(Route.WELCOME);
  };

  const getUserData = async (): Promise<Response<User | null>> => {
    try {
      return await getUser() as Response<User>;
    } catch (error) {
      return wrapErrors(error);
    }
  };

  useEffect(() => {
    updateUserInfo();
  }, [updateUserInfo]);

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
