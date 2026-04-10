import { BaseError } from '@/core/base-error';

export class VehicleModelNotFoundError extends BaseError {
  name = 'VehicleModelNotFoundError' as const;
  constructor() {
    super('Model not found', 404);
  }
}
