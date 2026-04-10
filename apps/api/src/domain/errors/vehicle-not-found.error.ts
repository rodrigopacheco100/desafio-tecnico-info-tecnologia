import { BaseError } from '@/core/base-error';

export class VehicleNotFoundError extends BaseError {
  name = 'VehicleNotFoundError' as const;
  constructor() {
    super('Vehicle not found', 404);
  }
}
