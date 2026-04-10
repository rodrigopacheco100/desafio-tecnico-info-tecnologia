import { BaseError } from '@/core/base-error';

export class ModelNotFoundError extends BaseError {
  name = 'ModelNotFoundError' as const;
  constructor() {
    super('Model not found', 404);
  }
}
