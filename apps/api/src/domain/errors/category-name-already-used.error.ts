import { AppError } from '@/core/app-error';

export class CategoryNameAlreadyUsedError extends AppError {
  name = 'CategoryNameAlreadyUsedError' as const;
  constructor() {
    super('Category name already used', 409);
  }
}
