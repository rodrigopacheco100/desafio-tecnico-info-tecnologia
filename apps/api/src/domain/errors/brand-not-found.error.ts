import { BaseError } from '@/core/base-error';

export class BrandNotFoundError extends BaseError {
  name = 'BrandNotFoundError' as const;
  constructor() {
    super('Brand not found', 404);
  }
}
