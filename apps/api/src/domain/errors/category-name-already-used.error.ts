import { BaseError } from '@/core/base-error';

export class CategoryNameAlreadyUsedError extends BaseError {
  name = 'CategoryNameAlreadyUsedError' as const;

  constructor() {
    super('Category name already used', 409);
  }
}
