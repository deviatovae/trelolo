import { Errors } from '../API/types';
import { Dispatch, SetStateAction } from 'react';
import { Field } from '../types/types';

export const useValidationErrors = (errors: Errors, mapping: { [key: string]: Dispatch<SetStateAction<Field>> | undefined }) => {
  errors.forEach(error => {
    if (typeof error === 'string') {
      return;
    }

    const param = error.param as keyof typeof mapping;
    const { msg } = error;

    const setField = mapping[param];
    if (setField) {
      setField(({ value }) => ({ value, error: msg }));
    }
  });
};
