import { BaseError } from '@/core/base-error';

export class UserInvalidCredentialsError extends BaseError {
  name = 'UserInvalidCredentialsError' as const;
  constructor() {
    super('Invalid credentials', 401);
  }
}
