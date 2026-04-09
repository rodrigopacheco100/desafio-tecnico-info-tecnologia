import { AppError } from '@/core/app-error';

export class VehicleCategoryNotFoundError extends AppError {
  name = 'VehicleCategoryNotFoundError' as const;
  constructor() {
    super('Category not found', 404);
  }
}
