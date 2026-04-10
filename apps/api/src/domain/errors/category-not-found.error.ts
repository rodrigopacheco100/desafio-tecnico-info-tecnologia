import { BaseError } from '@/core/base-error';

export class CategoryNotFoundError extends BaseError {
  name = 'CategoryNotFoundError' as const;
  constructor() {
    super('Category not found', 404);
  }
}
