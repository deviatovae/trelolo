import { ResponseErrors } from '../API/responseErrors';
import { Response } from '../API/types';

export const wrapErrors = (e: unknown): Response<null> => {
  return {
    result: false,
    data: null,
    errors: e instanceof ResponseErrors ? e.errors : ['Unexpected error']
  };
};
