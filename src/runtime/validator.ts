import Ajv, * as Ajv_ from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv();
addFormats(ajv);

export type Schema = Ajv_.Schema;

export class Validator<T> {
  static compile<T>(schema: Schema): Validator<T> {
    return new Validator<T>(
      ajv.compile(schema),
    );
  }
  constructor(private readonly fn: ValidateFunction) {}

  validate(input: T): T {
    if (!this.fn(input)) {
      throw new ValidationError(this.fn);
    }

    return input;
  }

  decorate<U>() {
    const validator = this;
    return (_target: any, _propertyName: string, descriptor: TypedPropertyDescriptor<(x: T) => U>) => {
      const method = descriptor.value!;

      descriptor.value = (arg: T): U => {
        return method.call(this, validator.validate(arg));
      };

      return descriptor;
    };
  }
}

export type ValidateFunction = Ajv_.ValidateFunction;

export class ValidationError extends Error {
  constructor(validateFunction: ValidateFunction) {
    super(`Validation Error: ${validateFunction.errors?.map(e => e.message)}`);
  }
}