import { BaseError } from '@/core/base-error';

export class VehiclePlateAlreadyRegisteredError extends BaseError {
  name = 'VehiclePlateAlreadyRegisteredError' as const;
  constructor() {
    super('Plate already registered', 409);
  }
}
