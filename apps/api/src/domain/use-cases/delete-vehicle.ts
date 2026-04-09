import { UseCase } from '@/core/use-case';
import { Either } from '@/core/either';
import { AppError } from '@/core/app-error';
import { Injectable } from '@nestjs/common';
import { VehicleRepository } from '../repositories/vehicle.repository';
import { EventPublisher } from '../services/event-publisher';

type DeleteVehicleInput = {
  id: string;
};

type DeleteVehicleOutput = Record<string, never>;

@Injectable()
export class DeleteVehicleUseCase implements UseCase {
  constructor(
    private readonly vehicleRepository: VehicleRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(input: DeleteVehicleInput) {
    const vehicle = await this.vehicleRepository.findById(input.id);

    if (!vehicle) {
      return Either.fail(new AppError('Vehicle not found'));
    }

    await this.eventPublisher.publish({
      routingKey: 'vehicle.deleted',
      payload: {
        id: vehicle.id,
        deletedAt: new Date(),
      },
    });

    await this.vehicleRepository.delete(input.id);

    return Either.success<DeleteVehicleOutput>({});
  }
}
