import { AppError } from '@/core/app-error';

export class VehicleModelNotFoundError extends AppError {
  name = 'VehicleModelNotFoundError' as const;
  constructor() {
    super('Model not found', 404);
  }
}
