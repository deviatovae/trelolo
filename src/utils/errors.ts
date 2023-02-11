import { ResponseErrors } from '../API/responseErrors';
import { Errors, Response } from '../API/types';

export const wrapErrors = (e: unknown): Response<null> => {
  return {
    result: false,
    data: null,
    errors: e instanceof ResponseErrors ? e.errors : ['Unexpected error']
  };
};

export const castToErrors = (e: unknown): Errors => {
  return e instanceof ResponseErrors ? e.errors : ['Unexpected error'];
};
