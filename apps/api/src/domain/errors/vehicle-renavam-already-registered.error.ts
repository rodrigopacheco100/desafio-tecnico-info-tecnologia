import { AppError } from '@/core/app-error';

export class VehicleRenavamAlreadyRegisteredError extends AppError {
  name = 'VehicleRenavamAlreadyRegisteredError' as const;
  constructor() {
    super('Renavam already registered', 409);
  }
}
