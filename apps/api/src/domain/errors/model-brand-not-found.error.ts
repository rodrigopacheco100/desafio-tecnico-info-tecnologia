import { BaseError } from '@/core/base-error';

export class ModelBrandNotFoundError extends BaseError {
  name = 'ModelBrandNotFoundError' as const;
  constructor() {
    super('Brand not found', 404);
  }
}
