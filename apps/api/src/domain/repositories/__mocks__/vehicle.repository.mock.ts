import { vi } from 'vitest';
import { Vehicle, VehicleProps } from '@/domain/entities/vehicle';
import { VehicleRepository } from '../vehicle.repository';

type VehicleOverride = Partial<
  Pick<VehicleProps, 'plate' | 'chassis' | 'renavam' | 'modelId' | 'categoryId' | 'year'>
>;

export const makeMockVehicle = (override?: VehicleOverride): Vehicle => {
  return Vehicle.create({
    plate: 'ABC-1234',
    chassis: '1HGBH41JXMN109186',
    renavam: '12345678901',
    modelId: 'model-id-1',
    categoryId: 'category-id-1',
    year: 2024,
    ...override,
  });
};

export const mockVehicleRepository: VehicleRepository = {
  save: vi.fn(),
  findById: vi.fn(),
  findByPlate: vi.fn(),
  findByChassis: vi.fn(),
  findByRenavam: vi.fn(),
  findAll: vi.fn(),
  findAllPaginated: vi.fn(),
  delete: vi.fn(),
};
