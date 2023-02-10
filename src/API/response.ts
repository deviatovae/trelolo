import { getToken } from '../context/authContext';
import { Request, RequestMethod, Response } from './types';
import { ResponseErrors } from './responseErrors';

const BASE_URL = 'https://trelolo.onrender.com/';

/**
 * @throws {ResponseErrors}
 */
const parseResponse = async <T>(response: globalThis.Response) => {
  const result = await response.json() as Response<T>;
  if (!response.ok) {
    throw new ResponseErrors(result.errors);
  }

  return result;
};

export const getResponse = async <T>({ url, method, body }: Request): Promise<Response<T>> => {
  return fetch(`${BASE_URL}${url}`, {
    headers: {
      'Content-Type': 'application/json',
      'X-TOKEN': getToken(),
    },
    method: method || RequestMethod.GET,
    body: JSON.stringify(body),
  }).then(async response => parseResponse<T>(response));
};
