import { AppError } from '@/core/app-error';

export class UserPasswordNotStrongEnoughError extends AppError {
  name = 'UserPasswordNotStrongEnoughError' as const;
  constructor() {
    super('Password is not strong enough', 400);
  }
}
