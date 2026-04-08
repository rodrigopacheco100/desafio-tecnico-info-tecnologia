import { UseCase } from '@/core/use-case';
import { Either } from '@/core/either';
import { AppError } from '@/core/app-error';
import { Injectable } from '@nestjs/common';
import { Vehicle } from '../entities/vehicle';
import { VehicleRepository } from '../repositories/vehicle.repository';
import { ModelRepository } from '../repositories/model.repository';
import { CategoryRepository } from '../repositories/category.repository';

type UpdateVehicleInput = {
  id: string;
  plate: string;
  chassis: string;
  renavam: string;
  modelId: string;
  categoryId: string;
  year: number;
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
  ) {}

  async execute(input: UpdateVehicleInput) {
    const vehicle = await this.vehicleRepository.findById(input.id);
    if (!vehicle) {
      return Either.fail(new AppError('Vehicle not found'));
    }

    const model = await this.modelRepository.findById(input.modelId);
    if (!model) {
      return Either.fail(new AppError('Model not found'));
    }

    const category = await this.categoryRepository.findById(input.categoryId);
    if (!category) {
      return Either.fail(new AppError('Category not found'));
    }

    const plateAlreadyUsed = await this.vehicleRepository.findByPlate(input.plate);
    if (plateAlreadyUsed && plateAlreadyUsed.id !== input.id) {
      return Either.fail(new AppError('Plate already registered'));
    }

    const chassisAlreadyUsed = await this.vehicleRepository.findByChassis(input.chassis);
    if (chassisAlreadyUsed && chassisAlreadyUsed.id !== input.id) {
      return Either.fail(new AppError('Chassis already registered'));
    }

    const renavamAlreadyUsed = await this.vehicleRepository.findByRenavam(input.renavam);
    if (renavamAlreadyUsed && renavamAlreadyUsed.id !== input.id) {
      return Either.fail(new AppError('Renavam already registered'));
    }

    vehicle.plate = input.plate;
    vehicle.chassis = input.chassis;
    vehicle.renavam = input.renavam;
    vehicle.modelId = input.modelId;
    vehicle.categoryId = input.categoryId;
    vehicle.year = input.year;

    await this.vehicleRepository.save(vehicle);

    return Either.success<UpdateVehicleOutput>({ vehicle });
  }
}
