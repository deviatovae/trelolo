import React, { createContext, ReactElement, useCallback, useEffect, useState } from 'react';
import { UserService } from '../API/userService';
import { Errors, LoginData, LoginResponse, Response, UpdateUserData } from '../API/types';
import { User } from '../types/models';
import { castToErrors, wrapErrors } from '../utils/errors';
import { useNavigate } from 'react-router-dom';
import { Route } from '../router/routes';

export interface InitialContext {
  isAuth: boolean,
  submitSignup: (info: LoginData) => Promise<Response<User | null>>,
  submitLogin: (info: LoginData) => Promise<Response<LoginResponse | null>>,
  userInfo: User | null,
  token: string,
  isInProgress: boolean,
  logout: () => void
  updateUser: (data: UpdateUserData) => Promise<Errors | null>
  isFetchingUser: boolean
}

export const getToken = () => localStorage.getItem('token') || '';

export const AuthContext = createContext<InitialContext | null>(null);

export const AuthProvider = ({ children }: { children: ReactElement }) => {
  const [token, setToken] = useState<string>(getToken());
  const [isAuth, setIsAuth] = useState(!!token);
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [isInProgress, setIsInProgress] = useState(false);
  const [isFetchingUser, setIsFetchingUser] = useState(true);
  const navigate = useNavigate();

  const updateUser = async (data: UpdateUserData) => {
    try {
      setIsInProgress(true);
      const { errors, data: userData } = await UserService.updateUser(data);
      if (errors) {
        return errors;
      }
      setUserInfo((prev) => ({
        ...prev,
        ...userData
      }));
      return null;
    } catch (e) {
      return castToErrors(e);
    } finally {
      setIsInProgress(false);
    }
  };

  const submitSignup = async (info: LoginData): Promise<Response<User | null>> => {
    try {
      const result = await UserService.createUser(info);
      if (!result.errors) {
        await submitLogin({ email: info.email, password: info.password });
      }
      return result;
    } catch (error) {
      return wrapErrors(error);
    }
  };

  const updateToken = async (value: string) => {
    localStorage.setItem('token', value);
    setToken(value);
    setIsAuth(true);
  };

  const fetchUser = useCallback(async () => {
    if (!token) {
      return;
    }

    const { data, errors } = await getUserData();
    setIsFetchingUser(false);
    if (!errors && data) {
      setUserInfo(data);
    }
  }, [token]);

  const submitLogin = async (info: LoginData): Promise<Response<LoginResponse | null>> => {
    setIsInProgress(true);
    try {
      const response = await UserService.authorizeUser(info) as Response<LoginResponse>;
      const { data: { user, token: tokenResponse } } = response;
      await updateToken(tokenResponse);
      setUserInfo(user);
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
      return await UserService.getUser() as Response<User>;
    } catch (error) {
      return wrapErrors(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return <AuthContext.Provider value={{
    isAuth,
    submitSignup,
    submitLogin,
    userInfo,
    token,
    isInProgress,
    logout,
    updateUser,
    isFetchingUser,
  }}>
    {children}
  </AuthContext.Provider>;
};
