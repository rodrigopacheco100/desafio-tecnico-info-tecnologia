import { AppError } from '@/core/app-error';

export class VehiclePlateAlreadyRegisteredError extends AppError {
  name = 'VehiclePlateAlreadyRegisteredError' as const;
  constructor() {
    super('Plate already registered', 409);
  }
}
