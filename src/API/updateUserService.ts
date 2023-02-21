import { UpdateUser } from './types';
import { getResponse } from './response';
import { RequestMethod } from './types';


export const updateUserName = (newName: string) =>  getResponse<UpdateUser>({ url: 'user', method: RequestMethod.PATCH, body: { name: newName } });

export const updateUserColor = (selectedColor: string) =>  getResponse<UpdateUser>({ url: 'user', method: RequestMethod.PATCH, body: { colorHue: selectedColor } });

export const getUserColor = () => getResponse<UpdateUser>({ url: 'user', method: RequestMethod.GET });


