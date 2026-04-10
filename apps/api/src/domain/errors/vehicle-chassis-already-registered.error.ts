import { BaseError } from '@/core/base-error';

export class VehicleChassisAlreadyRegisteredError extends BaseError {
  name = 'VehicleChassisAlreadyRegisteredError' as const;
  constructor() {
    super('Chassis already registered', 409);
  }
}
