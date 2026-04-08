import { Vehicle } from '../entities/vehicle';
import { Pagination, PaginationResult } from '@/core/pagination';

export abstract class VehicleRepository {
  abstract save(vehicle: Vehicle): Promise<void>;
  abstract findById(id: string): Promise<Vehicle | null>;
  abstract findByPlate(plate: string): Promise<Vehicle | null>;
  abstract findByChassis(chassis: string): Promise<Vehicle | null>;
  abstract findByRenavam(renavam: string): Promise<Vehicle | null>;
  abstract findAll(): Promise<Vehicle[]>;
  abstract findAllPaginated(pagination: Pagination): Promise<PaginationResult<Vehicle>>;
  abstract delete(id: string): Promise<void>;
}
