import { getResponse } from './response';
import { LoginData, LoginResponse, RequestMethod } from './types';
import { User } from '../types/models';

export const createUser = (data: LoginData) => getResponse<User>({ url: 'user/register', method: RequestMethod.POST, body: data });

export const authorizeUser = (data: LoginData) => getResponse<LoginResponse>({ url: 'user/login', method: RequestMethod.POST, body: data });

export const getUser = () => getResponse<User>({ url: 'user', method: RequestMethod.GET });

