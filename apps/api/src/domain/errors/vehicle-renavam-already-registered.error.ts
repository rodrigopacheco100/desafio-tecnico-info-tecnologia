import { BaseError } from '@/core/base-error';

export class VehicleRenavamAlreadyRegisteredError extends BaseError {
  name = 'VehicleRenavamAlreadyRegisteredError' as const;
  constructor() {
    super('Renavam already registered', 409);
  }
}
