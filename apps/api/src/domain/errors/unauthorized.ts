import { BaseError } from '@/core/base-error';

export class UnauthorizedError extends BaseError {
  constructor() {
    super('Unauthorized', 401);
  }
}
