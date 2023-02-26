import { getResponse } from './response';
import { LoginData, LoginResponse, RequestMethod, UpdateUserData } from './types';
import { User } from '../types/models';

export class UserService {
  static createUser = (data: LoginData) => getResponse<User>({ url: 'user/register', method: RequestMethod.POST, body: data });

  static authorizeUser = (data: LoginData) => getResponse<LoginResponse>({ url: 'user/login', method: RequestMethod.POST, body: data });

  static getUser = () => getResponse<User>({ url: 'user', method: RequestMethod.GET });

  static updateUser = (data: UpdateUserData) => getResponse<User>({ url: 'user', method: RequestMethod.PATCH, body: data });
}
