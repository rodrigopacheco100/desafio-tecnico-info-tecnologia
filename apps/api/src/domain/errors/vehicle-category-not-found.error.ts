import { BaseError } from '@/core/base-error';

export class VehicleCategoryNotFoundError extends BaseError {
  name = 'VehicleCategoryNotFoundError' as const;
  constructor() {
    super('Category not found', 404);
  }
}
