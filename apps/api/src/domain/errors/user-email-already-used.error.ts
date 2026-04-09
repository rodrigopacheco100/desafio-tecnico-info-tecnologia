import { AppError } from '@/core/app-error';

export class UserEmailAlreadyUsedError extends AppError {
  name = 'UserEmailAlreadyUsedError' as const;
  constructor() {
    super('Email already used', 409);
  }
}
