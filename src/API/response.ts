import { getToken } from '../context';
import { RequestsMethods, Response } from './types';

const BASE_URL = 'https://trelolo.onrender.com/';

export const getResponse = async ({ url, method, body }: Response) => {
  const response = await fetch(`${BASE_URL}${url}`, {
    headers: {
      'Content-Type': 'application/json',
      'X-TOKEN': getToken(),
    },
    method: method || RequestsMethods.GET,
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error(JSON.stringify(await response.json()));
  }
  const data = await response.json();
  return data;
};