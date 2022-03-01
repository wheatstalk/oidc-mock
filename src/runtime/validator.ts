import Ajv, * as Ajv_ from 'ajv';
import addFormats from 'ajv-formats';
import { APIHandler } from './api';

const ajv = new Ajv();
addFormats(ajv);

export type Schema = Ajv_.Schema;

export class Validator<T> {
  static compile<T>(schema: Schema): Validator<T> {
    return new Validator<T>(
      ajv.compile(schema),
    );
  }

  static errorHandler(cb: APIHandler): APIHandler {
    return errorHandler(cb);
  }

  constructor(private readonly fn: ValidateFunction) {}

  validate(input: T): T {
    if (!this.fn(input)) {
      throw new ValidationError(this.fn);
    }

    return input;
  }
}

export function errorHandler(cb: APIHandler): APIHandler {
  return async event => {
    try {
      return await cb(event);
    } catch (e) {
      if (e instanceof ValidationError) {
        return {
          statusCode: 400,
          body: JSON.stringify({
            error: e.message,
          }),
        };
      }
      throw e;
    }
  };
}

export type ValidateFunction = Ajv_.ValidateFunction;

export class ValidationError extends Error {
  constructor(validateFunction: ValidateFunction) {
    super(`Validation Error: ${validateFunction.errors?.map(e => e.message)}`);
  }
}