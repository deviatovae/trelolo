import { Errors } from './types';

export class ResponseErrors extends Error {
  readonly errors: Errors;

  constructor(errors: Errors) {
    super();
    this.errors = errors;
    Object.setPrototypeOf(this, ResponseErrors.prototype);
  }
}
