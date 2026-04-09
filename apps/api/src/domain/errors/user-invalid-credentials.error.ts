import { AppError } from '@/core/app-error';

export class UserInvalidCredentialsError extends AppError {
  name = 'UserInvalidCredentialsError' as const;
  constructor() {
    super('Invalid credentials', 401);
  }
}
