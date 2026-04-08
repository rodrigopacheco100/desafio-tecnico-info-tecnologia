import { Vehicle } from '@/domain/entities/vehicle';
import { vehicles } from '../schemas/vehicles.schema';

type VehicleDb = typeof vehicles.$inferSelect;

export class VehicleMapper {
  static toDomain(dbVehicle: VehicleDb): Vehicle {
    return Vehicle.from({
      id: dbVehicle.id,
      plate: dbVehicle.plate,
      chassis: dbVehicle.chassis,
      renavam: dbVehicle.renavam,
      modelId: dbVehicle.modelId,
      categoryId: dbVehicle.categoryId,
      year: dbVehicle.year,
      createdAt: dbVehicle.createdAt,
      updatedAt: dbVehicle.updatedAt,
    });
  }

  static toCreateOnDb(vehicle: Vehicle): typeof vehicles.$inferInsert {
    return {
      id: vehicle.id,
      plate: vehicle.plate,
      chassis: vehicle.chassis,
      renavam: vehicle.renavam,
      modelId: vehicle.modelId,
      categoryId: vehicle.categoryId,
      year: vehicle.year,
      createdAt: vehicle.createdAt,
      updatedAt: vehicle.updatedAt,
    };
  }

  static toUpdateOnDb(
    vehicle: Vehicle,
  ): WithoutId<TypedOmit<typeof vehicles.$inferInsert, 'createdAt'>> {
    return {
      plate: vehicle.plate,
      chassis: vehicle.chassis,
      renavam: vehicle.renavam,
      modelId: vehicle.modelId,
      categoryId: vehicle.categoryId,
      year: vehicle.year,
      updatedAt: vehicle.updatedAt,
    };
  }
}
