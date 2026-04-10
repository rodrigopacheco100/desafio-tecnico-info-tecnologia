import { BaseError } from '@/core/base-error';

export class BrandNameAlreadyUsedError extends BaseError {
  name = 'BrandNameAlreadyUsedError' as const;
  constructor() {
    super('Brand name already used', 409);
  }
}
