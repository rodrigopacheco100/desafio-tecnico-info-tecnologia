import { BaseError } from '@/core/base-error';

export class InvalidTokenError extends BaseError {
  name = 'InvalidTokenError' as const;

  constructor() {
    super('Token inválido');
  }
}
