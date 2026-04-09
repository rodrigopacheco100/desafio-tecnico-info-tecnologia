import { AppError } from '@/core/app-error';

export class ModelNameAlreadyUsedError extends AppError {
  name = 'ModelNameAlreadyUsedError' as const;
  constructor() {
    super('Model name already used', 409);
  }
}
