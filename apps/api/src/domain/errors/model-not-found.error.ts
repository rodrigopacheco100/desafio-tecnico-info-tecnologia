import { AppError } from '@/core/app-error';

export class ModelNotFoundError extends AppError {
  name = 'ModelNotFoundError' as const;
  constructor() {
    super('Model not found', 404);
  }
}
