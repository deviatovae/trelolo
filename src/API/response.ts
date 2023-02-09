import { getToken } from '../context';
import { RequestsMethods, Response, ServerResponse } from './types';

const BASE_URL = 'https://trelolo.onrender.com/';

export const getResponse = async <T>({ url, method, body }: Response): Promise<T> => {
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
  const result = await response.json() as ServerResponse<T>;
  const { data, errors } = result;

  if (errors.length || !data) {
    throw new Error(JSON.stringify(errors));
  }

  return data;
};
