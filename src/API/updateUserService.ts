import { getResponse } from './response';
import { RequestMethod } from './types';
import { User } from '../types/models';
// import { UpdateUser } from './types';

export const updateUserName = (newName: string) =>  getResponse<User>({ url: 'user', method: RequestMethod.PATCH, body: { name: newName } });

export const updateUserColor = (selectedColor: number) =>  getResponse<User>({ url: 'user', method: RequestMethod.PATCH, body: { colorHue: selectedColor } });

export const getUserColor = () => getResponse<User>({ url: 'user', method: RequestMethod.GET });


