import { BaseError } from '@/core/base-error';

export class UserEmailAlreadyUsedError extends BaseError {
  name = 'UserEmailAlreadyUsedError' as const;
  constructor() {
    super('Email already used', 409);
  }
}
