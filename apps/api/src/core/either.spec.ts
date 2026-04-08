import { BaseError } from './base-error';
import { Either } from './either';

class CustomError extends BaseError {
  constructor() {
    super('Custom error');
  }
}

describe('Either', () => {
  describe('Success', () => {
    it('should be able to create a success instance', () => {
      const result = Either.success('success-value');

      expect(result.isSuccess()).toBe(true);
      expect(result.isFail()).toBe(false);
      expect(result.value).toBe('success-value');
    });
  });

  describe('Fail', () => {
    it('should be able to create a fail instance', () => {
      const error = new CustomError();
      const result = Either.fail(error);

      expect(result.isSuccess()).toBe(false);
      expect(result.isFail()).toBe(true);
      expect(result.value).toBe(error);
    });
  });

  describe('throwsIfFail', () => {
    it('should throw if result is a fail', () => {
      const error = new CustomError();
      const result = Either.fail(error);

      expect(() => Either.throwsIfFail(result)).toThrow(CustomError);
    });

    it('should not throw if result is a success', () => {
      const result = Either.success('success-value');

      expect(() => Either.throwsIfFail(result)).not.toThrow();
    });
  });
});
