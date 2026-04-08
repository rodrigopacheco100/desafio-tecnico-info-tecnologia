import { UseCase } from '@/core/use-case';
import { Either } from '@/core/either';
import { AppError } from '@/core/app-error';
import { Injectable } from '@nestjs/common';
import { VehicleRepository } from '../repositories/vehicle.repository';

type DeleteVehicleInput = {
  id: string;
};

type DeleteVehicleOutput = Record<string, never>;

@Injectable()
export class DeleteVehicleUseCase implements UseCase {
  constructor(private readonly vehicleRepository: VehicleRepository) {}

  async execute(input: DeleteVehicleInput) {
    const vehicle = await this.vehicleRepository.findById(input.id);

    if (!vehicle) {
      return Either.fail(new AppError('Vehicle not found'));
    }

    await this.vehicleRepository.delete(input.id);

    return Either.success<DeleteVehicleOutput>({});
  }
}
