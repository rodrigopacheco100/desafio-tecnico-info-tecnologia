import { BaseError } from '@/core/base-error';

export class UserPasswordNotStrongEnoughError extends BaseError {
  name = 'UserPasswordNotStrongEnoughError' as const;
  constructor() {
    super('Password is not strong enough', 400);
  }
}
