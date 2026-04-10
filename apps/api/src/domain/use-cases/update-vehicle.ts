import { UseCase } from '@/core/use-case';
import { Either } from '@/core/either';
import { isUndefined } from '@/core/is-undefined';
import { Injectable } from '@nestjs/common';
import { Vehicle } from '../entities/vehicle';
import { VehicleRepository } from '../repositories/vehicle.repository';
import { ModelRepository } from '../repositories/model.repository';
import { CategoryRepository } from '../repositories/category.repository';
import { EventPublisher } from '../services/event-publisher';
import { VehicleNotFoundError } from '../errors/vehicle-not-found.error';
import { VehicleModelNotFoundError } from '../errors/vehicle-model-not-found.error';
import { VehicleCategoryNotFoundError } from '../errors/vehicle-category-not-found.error';
import { VehiclePlateAlreadyRegisteredError } from '../errors/vehicle-plate-already-registered.error';
import { VehicleChassisAlreadyRegisteredError } from '../errors/vehicle-chassis-already-registered.error';
import { VehicleRenavamAlreadyRegisteredError } from '../errors/vehicle-renavam-already-registered.error';

type UpdateVehicleInput = {
  id: string;
  plate?: string;
  chassis?: string;
  renavam?: string;
  modelId?: string;
  categoryId?: string;
  year?: number;
};

type UpdateVehicleOutput = {
  vehicle: Vehicle;
};

@Injectable()
export class UpdateVehicleUseCase implements UseCase {
  constructor(
    private readonly vehicleRepository: VehicleRepository,
    private readonly modelRepository: ModelRepository,
    private readonly categoryRepository: CategoryRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(input: UpdateVehicleInput) {
    const vehicle = await this.vehicleRepository.findById(input.id);
    if (!vehicle) {
      return Either.fail(new VehicleNotFoundError());
    }

    if (!isUndefined(input.modelId)) {
      const model = await this.modelRepository.findById(input.modelId);
      if (!model) {
        return Either.fail(new VehicleModelNotFoundError());
      }
      vehicle.modelId = input.modelId;
    }

    if (!isUndefined(input.categoryId)) {
      const category = await this.categoryRepository.findById(input.categoryId);
      if (!category) {
        return Either.fail(new VehicleCategoryNotFoundError());
      }
      vehicle.categoryId = input.categoryId;
    }

    if (!isUndefined(input.plate)) {
      const plateAlreadyUsed = await this.vehicleRepository.findByPlate(input.plate);
      if (plateAlreadyUsed && plateAlreadyUsed.id !== input.id) {
        return Either.fail(new VehiclePlateAlreadyRegisteredError());
      }
      vehicle.plate = input.plate;
    }

    if (!isUndefined(input.chassis)) {
      const chassisAlreadyUsed = await this.vehicleRepository.findByChassis(input.chassis);
      if (chassisAlreadyUsed && chassisAlreadyUsed.id !== input.id) {
        return Either.fail(new VehicleChassisAlreadyRegisteredError());
      }
      vehicle.chassis = input.chassis;
    }

    if (!isUndefined(input.renavam)) {
      const renavamAlreadyUsed = await this.vehicleRepository.findByRenavam(input.renavam);
      if (renavamAlreadyUsed && renavamAlreadyUsed.id !== input.id) {
        return Either.fail(new VehicleRenavamAlreadyRegisteredError());
      }
      vehicle.renavam = input.renavam;
    }

    if (!isUndefined(input.year)) {
      vehicle.year = input.year;
    }

    await this.vehicleRepository.save(vehicle);

    await this.eventPublisher.publish({
      routingKey: 'vehicle.updated',
      payload: {
        id: vehicle.id,
        plate: vehicle.plate,
        chassis: vehicle.chassis,
        renavam: vehicle.renavam,
        modelId: vehicle.modelId,
        categoryId: vehicle.categoryId,
        year: vehicle.year,
        updatedAt: vehicle.updatedAt,
      },
    });

    return Either.success<UpdateVehicleOutput>({ vehicle });
  }
}
