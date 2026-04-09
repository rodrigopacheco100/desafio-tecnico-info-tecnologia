import { AppError } from '@/core/app-error';

export class BrandNameAlreadyUsedError extends AppError {
  name = 'BrandNameAlreadyUsedError' as const;
  constructor() {
    super('Brand name already used', 409);
  }
}
