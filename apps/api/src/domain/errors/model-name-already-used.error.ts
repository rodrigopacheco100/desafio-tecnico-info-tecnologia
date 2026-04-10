import { BaseError } from '@/core/base-error';

export class ModelNameAlreadyUsedError extends BaseError {
  name = 'ModelNameAlreadyUsedError' as const;
  constructor() {
    super('Model name already used', 409);
  }
}
