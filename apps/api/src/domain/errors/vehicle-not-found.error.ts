import { AppError } from '@/core/app-error';

export class VehicleNotFoundError extends AppError {
  name = 'VehicleNotFoundError' as const;
  constructor() {
    super('Vehicle not found', 404);
  }
}
