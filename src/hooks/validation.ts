import { Errors } from '../API/types';
import { Dispatch, SetStateAction } from 'react';
import { Field } from '../types/types';

export const useFieldValidator = () => {
  const validate = <T extends Field>(errors: Errors, mapping: { [key: string]: Dispatch<SetStateAction<T>> | undefined }) => {
    errors.forEach(error => {
      if (typeof error === 'string') {
        return;
      }

      const param = error.param as keyof typeof mapping;
      const { msg } = error;
      const setField = mapping[param];

      if (setField) {
        setField((prev) => ({ ...prev, error: msg }));
      }
    });
  };

  return { validate };
};
