import { UseCase } from '@/core/use-case';
import { Either } from '@/core/either';
import { Injectable } from '@nestjs/common';
import { Vehicle } from '../entities/vehicle';
import { VehicleRepository } from '../repositories/vehicle.repository';
import { ModelRepository } from '../repositories/model.repository';
import { CategoryRepository } from '../repositories/category.repository';
import { EventPublisher } from '../services/event-publisher';
import { VehicleModelNotFoundError } from '../errors/vehicle-model-not-found.error';
import { VehicleCategoryNotFoundError } from '../errors/vehicle-category-not-found.error';
import { VehiclePlateAlreadyRegisteredError } from '../errors/vehicle-plate-already-registered.error';
import { VehicleChassisAlreadyRegisteredError } from '../errors/vehicle-chassis-already-registered.error';
import { VehicleRenavamAlreadyRegisteredError } from '../errors/vehicle-renavam-already-registered.error';

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
      return Either.fail(new VehicleModelNotFoundError());
    }

    const category = await this.categoryRepository.findById(input.categoryId);
    if (!category) {
      return Either.fail(new VehicleCategoryNotFoundError());
    }

    const plateAlreadyUsed = await this.vehicleRepository.findByPlate(input.plate);
    if (plateAlreadyUsed) {
      return Either.fail(new VehiclePlateAlreadyRegisteredError());
    }

    const chassisAlreadyUsed = await this.vehicleRepository.findByChassis(input.chassis);
    if (chassisAlreadyUsed) {
      return Either.fail(new VehicleChassisAlreadyRegisteredError());
    }

    const renavamAlreadyUsed = await this.vehicleRepository.findByRenavam(input.renavam);
    if (renavamAlreadyUsed) {
      return Either.fail(new VehicleRenavamAlreadyRegisteredError());
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
