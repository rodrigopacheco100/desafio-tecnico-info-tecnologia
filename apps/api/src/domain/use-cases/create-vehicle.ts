import { UseCase } from '@/core/use-case';
import { Either } from '@/core/either';
import { AppError } from '@/core/app-error';
import { Injectable } from '@nestjs/common';
import { Vehicle } from '../entities/vehicle';
import { VehicleRepository } from '../repositories/vehicle.repository';
import { ModelRepository } from '../repositories/model.repository';
import { CategoryRepository } from '../repositories/category.repository';
import { EventPublisher } from '../services/event-publisher';

type CreateVehicleInput = {
  plate: string;
  chassis: string;
  renavam: string;
  modelId: string;
  categoryId: string;
  year: number;
};

type CreateVehicleOutput = {
  vehicle: Vehicle;
};

@Injectable()
export class CreateVehicleUseCase implements UseCase {
  constructor(
    private readonly vehicleRepository: VehicleRepository,
    private readonly modelRepository: ModelRepository,
    private readonly categoryRepository: CategoryRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(input: CreateVehicleInput) {
    const model = await this.modelRepository.findById(input.modelId);
    if (!model) {
      return Either.fail(new AppError('Model not found'));
    }

    const category = await this.categoryRepository.findById(input.categoryId);
    if (!category) {
      return Either.fail(new AppError('Category not found'));
    }

    const plateAlreadyUsed = await this.vehicleRepository.findByPlate(input.plate);
    if (plateAlreadyUsed) {
      return Either.fail(new AppError('Plate already registered'));
    }

    const chassisAlreadyUsed = await this.vehicleRepository.findByChassis(input.chassis);
    if (chassisAlreadyUsed) {
      return Either.fail(new AppError('Chassis already registered'));
    }

    const renavamAlreadyUsed = await this.vehicleRepository.findByRenavam(input.renavam);
    if (renavamAlreadyUsed) {
      return Either.fail(new AppError('Renavam already registered'));
    }

    const vehicle = Vehicle.create({
      plate: input.plate,
      chassis: input.chassis,
      renavam: input.renavam,
      modelId: input.modelId,
      categoryId: input.categoryId,
      year: input.year,
    });

    await this.vehicleRepository.save(vehicle);

    await this.eventPublisher.publish({
      routingKey: 'vehicle.created',
      payload: {
        id: vehicle.id,
        plate: vehicle.plate,
        chassis: vehicle.chassis,
        renavam: vehicle.renavam,
        modelId: vehicle.modelId,
        categoryId: vehicle.categoryId,
        year: vehicle.year,
        createdAt: vehicle.createdAt,
        updatedAt: vehicle.updatedAt,
      },
    });

    return Either.success<CreateVehicleOutput>({ vehicle });
  }
}
