import { BaseError } from './base-error';

export class AppError extends BaseError {
  name = 'AppError' as const;

  constructor(
    public readonly message: string,
    public readonly statusCode: number = 400,
  ) {
    super(message);
  }
}
