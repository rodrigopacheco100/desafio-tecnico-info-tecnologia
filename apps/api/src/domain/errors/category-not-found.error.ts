import { AppError } from '@/core/app-error';

export class CategoryNotFoundError extends AppError {
  name = 'CategoryNotFoundError' as const;
  constructor() {
    super('Category not found', 404);
  }
}
