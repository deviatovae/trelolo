import { getToken } from '../context/authContext';
import { Request, RequestMethod, Response } from './types';
import { ResponseErrors } from './responseErrors';
import { Locale } from '../utils/locale';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

/**
 * @throws {ResponseErrors}
 */
const parseResponse = async <T>(response: globalThis.Response) => {
  const result = await response.json() as Response<T>;
  if (!response.ok) {
    throw new ResponseErrors(result.errors || ['Server error']);
  }

  return result;
};

export const getResponse = async <T>({ url, method, body }: Request): Promise<Response<T>> => {
  const response = await fetch(`${BASE_URL}${url}`, {
    headers: {
      'Content-Type': 'application/json',
      'X-TOKEN': getToken(),
      'Accept-Language': Locale.currentLocale,
    },
    method: method || RequestMethod.GET,
    body: JSON.stringify(body),
  });

  return parseResponse<T>(response);
};
