import { VehicleRepository } from '@/domain/repositories/vehicle.repository';
import { Vehicle } from '@/domain/entities/vehicle';
import { Injectable } from '@nestjs/common';
import { vehicles } from '../schemas/vehicles.schema';
import { VehicleMapper } from '../mappers/vehicle.mapper';
import { DrizzleDB } from '../connection/drizzle';
import { count, eq } from 'drizzle-orm';
import { Pagination, PaginationResult } from '@/core/pagination';

@Injectable()
export class DrizzleVehicleRepository implements VehicleRepository {
  constructor(private readonly drizzle: DrizzleDB) {}

  async save(vehicle: Vehicle): Promise<void> {
    await this.drizzle.connection
      .insert(vehicles)
      .values(VehicleMapper.toCreateOnDb(vehicle))
      .onConflictDoUpdate({
        target: vehicles.id,
        set: VehicleMapper.toUpdateOnDb(vehicle),
      });
  }

  async findById(id: string): Promise<Vehicle | null> {
    const vehicle = await this.drizzle.connection.query.vehicles.findFirst({
      where: eq(vehicles.id, id),
    });
    return vehicle ? VehicleMapper.toDomain(vehicle) : null;
  }

  async findByPlate(plate: string): Promise<Vehicle | null> {
    const vehicle = await this.drizzle.connection.query.vehicles.findFirst({
      where: eq(vehicles.plate, plate),
    });
    return vehicle ? VehicleMapper.toDomain(vehicle) : null;
  }

  async findByChassis(chassis: string): Promise<Vehicle | null> {
    const vehicle = await this.drizzle.connection.query.vehicles.findFirst({
      where: eq(vehicles.chassis, chassis),
    });
    return vehicle ? VehicleMapper.toDomain(vehicle) : null;
  }

  async findByRenavam(renavam: string): Promise<Vehicle | null> {
    const vehicle = await this.drizzle.connection.query.vehicles.findFirst({
      where: eq(vehicles.renavam, renavam),
    });
    return vehicle ? VehicleMapper.toDomain(vehicle) : null;
  }

  async findAll(): Promise<Vehicle[]> {
    const allVehicles = await this.drizzle.connection.query.vehicles.findMany();
    return allVehicles.map(VehicleMapper.toDomain);
  }

  async findAllPaginated(pagination: Pagination): Promise<PaginationResult<Vehicle>> {
    const { page, quantityPerPage } = pagination;
    const offset = (page - 1) * quantityPerPage;

    const paginatedVehicles = await this.drizzle.connection.query.vehicles.findMany({
      limit: quantityPerPage,
      offset: offset,
    });

    const totalCountResult = await this.drizzle.connection
      .select({ count: count(vehicles.id) })
      .from(vehicles);
    const totalCount = totalCountResult[0].count;
    const amountOfPages = Math.ceil(totalCount / quantityPerPage);

    return {
      data: paginatedVehicles.map(VehicleMapper.toDomain),
      totalCount,
      amountOfPages,
    };
  }

  async delete(id: string): Promise<void> {
    await this.drizzle.connection.delete(vehicles).where(eq(vehicles.id, id));
  }
}
