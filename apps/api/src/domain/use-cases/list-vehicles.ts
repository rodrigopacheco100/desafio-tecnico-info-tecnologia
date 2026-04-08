import { UseCase } from '@/core/use-case';
import { Either } from '@/core/either';
import { Injectable } from '@nestjs/common';
import { Vehicle } from '../entities/vehicle';
import { VehicleRepository } from '../repositories/vehicle.repository';
import { Pagination, PaginationResult } from '@/core/pagination';

type ListVehiclesInput = {
  pagination: Pagination;
};

type ListVehiclesOutput = PaginationResult<Vehicle>;

@Injectable()
export class ListVehiclesUseCase implements UseCase {
  constructor(private readonly vehicleRepository: VehicleRepository) {}

  async execute(input: ListVehiclesInput) {
    const result = await this.vehicleRepository.findAllPaginated(input.pagination);
    return Either.success<ListVehiclesOutput>(result);
  }
}
