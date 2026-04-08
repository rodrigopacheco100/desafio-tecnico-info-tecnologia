import { type BaseError } from './base-error';

class Fail<F extends BaseError> {
  constructor(public readonly value: F) {
    this.value = value;
  }

  isSuccess(): this is Success<never> {
    return false;
  }

  isFail(): this is Fail<F> {
    return true;
  }
}

class Success<S> {
  constructor(public readonly value: S) {
    this.value = value;
  }

  isSuccess(): this is Success<S> {
    return true;
  }

  isFail(): this is Fail<never> {
    return false;
  }
}

export type Either<F extends BaseError, S> = Fail<F> | Success<S>;

export namespace Either {
  export function success<S>(value: S): Success<S> {
    return new Success(value);
  }

  export function fail<F extends BaseError>(value: F): Fail<F> {
    return new Fail(value);
  }

  export function throwsIfFail<S>(either: Fail<any> | Success<S>): asserts either is Success<S> {
    if (either.isFail()) {
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw either.value;
    }
  }
}
