import { AppError } from '@/core/app-error';

export class VehicleChassisAlreadyRegisteredError extends AppError {
  name = 'VehicleChassisAlreadyRegisteredError' as const;
  constructor() {
    super('Chassis already registered', 409);
  }
}
