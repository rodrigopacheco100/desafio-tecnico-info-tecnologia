import { AppError } from '@/core/app-error';

export class BrandNotFoundError extends AppError {
  name = 'BrandNotFoundError' as const;
  constructor() {
    super('Brand not found', 404);
  }
}
