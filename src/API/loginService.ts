import { getResponse } from './response';
import { RequestsMethods, LoginData, UserInfo } from './types';

export const createUser = (data: LoginData) => getResponse<UserInfo>({ url: 'user/register', method: RequestsMethods.POST, body: data });

export const authorizeUser = (data: LoginData) => getResponse({ url: 'user/login', method: RequestsMethods.POST, body: data });
