import { AppError } from '@/core/app-error';

export class ModelBrandNotFoundError extends AppError {
  name = 'ModelBrandNotFoundError' as const;
  constructor() {
    super('Brand not found', 404);
  }
}
