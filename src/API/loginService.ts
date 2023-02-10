import { getResponse } from './response';
import { RequestsMethods, LoginData } from './types';

export const createUser = (data: LoginData) => getResponse({ url: 'user/register', method: RequestsMethods.POST, body: data });

export const authorizeUser = (data: LoginData) => getResponse({ url: 'user/login', method: RequestsMethods.POST, body: data });

export const getUser = () => getResponse({ url: 'user', method: RequestsMethods.GET });
