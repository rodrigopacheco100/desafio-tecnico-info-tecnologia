import { Test, TestingModule } from '@nestjs/testing';
import { UpdateVehicleUseCase } from '@/domain/use-cases/update-vehicle';
import { VehicleRepository } from '@/domain/repositories/vehicle.repository';
import { ModelRepository } from '@/domain/repositories/model.repository';
import { CategoryRepository } from '@/domain/repositories/category.repository';
import { EventPublisher } from '@/domain/services/event-publisher';
import { mockVehicleRepository } from '../../repositories/__mocks__/vehicle.repository.mock';
import { mockModelRepository } from '../../repositories/__mocks__/model.repository.mock';
import { mockCategoryRepository } from '../../repositories/__mocks__/category.repository.mock';
import { mockEventPublisher } from '../../services/__mocks__/event-publisher.mock';
import { Vehicle } from '@/domain/entities/vehicle';
import { Brand } from '@/domain/entities/brand';
import { Model } from '@/domain/entities/model';
import { Category } from '@/domain/entities/category';

describe('UpdateVehicleUseCase', () => {
  let useCase: UpdateVehicleUseCase;
  let vehicleRepository: VehicleRepository;
  let modelRepository: ModelRepository;
  let categoryRepository: CategoryRepository;
  let eventPublisher: EventPublisher;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateVehicleUseCase,
        { provide: VehicleRepository, useValue: mockVehicleRepository },
        { provide: ModelRepository, useValue: mockModelRepository },
        { provide: CategoryRepository, useValue: mockCategoryRepository },
        { provide: EventPublisher, useValue: mockEventPublisher },
      ],
    }).compile();

    useCase = module.get<UpdateVehicleUseCase>(UpdateVehicleUseCase);
    vehicleRepository = module.get<VehicleRepository>(VehicleRepository);
    modelRepository = module.get<ModelRepository>(ModelRepository);
    categoryRepository = module.get<CategoryRepository>(CategoryRepository);
    eventPublisher = module.get<EventPublisher>(EventPublisher);

    vi.clearAllMocks();
  });

  describe('execute', () => {
    it('should update a vehicle successfully', async () => {
      const brand = Brand.create({ name: 'Toyota' });
      const model = Model.create({ name: 'Corolla', brandId: brand.id.toString() });
      const category = Category.create({ name: 'Sedan' });
      const existingVehicle = Vehicle.create({
        plate: 'ABC-1234',
        chassis: '1HGBH41JXMN109186',
        renavam: '12345678901',
        modelId: model.id.toString(),
        categoryId: category.id.toString(),
        year: 2024,
      });

      vi.spyOn(vehicleRepository, 'findById').mockResolvedValue(existingVehicle);
      vi.spyOn(modelRepository, 'findById').mockResolvedValue(model);
      vi.spyOn(categoryRepository, 'findById').mockResolvedValue(category);
      vi.spyOn(vehicleRepository, 'findByPlate').mockResolvedValue(null);
      vi.spyOn(vehicleRepository, 'findByChassis').mockResolvedValue(null);
      vi.spyOn(vehicleRepository, 'findByRenavam').mockResolvedValue(null);
      vi.spyOn(vehicleRepository, 'save').mockResolvedValue(undefined);

      const result = await useCase.execute({
        id: existingVehicle.id.toString(),
        plate: 'XYZ-5678',
        chassis: '2HGBH41JXMN109187',
        renavam: '98765432109',
        modelId: model.id.toString(),
        categoryId: category.id.toString(),
        year: 2025,
      });

      expect(result.isSuccess()).toBe(true);
      const successResult = result as any;
      expect(successResult.value.vehicle.plate).toBe('XYZ-5678');
      expect(vehicleRepository.save).toHaveBeenCalled();
      expect(eventPublisher.publish).toHaveBeenCalled();
    });

    it('should fail if vehicle not found', async () => {
      vi.spyOn(vehicleRepository, 'findById').mockResolvedValue(null);

      const result = await useCase.execute({
        id: 'nonexistent-vehicle',
        plate: 'XYZ-5678',
        chassis: '2HGBH41JXMN109187',
        renavam: '98765432109',
        modelId: 'model-id',
        categoryId: 'category-id',
        year: 2025,
      });

      expect(result.isFail()).toBe(true);
      const failResult = result as any;
      expect(failResult.value.message).toBe('Vehicle not found');
    });

    it('should fail if model not found', async () => {
      const existingVehicle = Vehicle.create({
        plate: 'ABC-1234',
        chassis: '1HGBH41JXMN109186',
        renavam: '12345678901',
        modelId: 'model-id',
        categoryId: 'category-id',
        year: 2024,
      });

      vi.spyOn(vehicleRepository, 'findById').mockResolvedValue(existingVehicle);
      vi.spyOn(modelRepository, 'findById').mockResolvedValue(null);

      const result = await useCase.execute({
        id: existingVehicle.id.toString(),
        plate: 'XYZ-5678',
        chassis: '2HGBH41JXMN109187',
        renavam: '98765432109',
        modelId: 'nonexistent-model',
        categoryId: 'category-id',
        year: 2025,
      });

      expect(result.isFail()).toBe(true);
      const failResult = result as any;
      expect(failResult.value.message).toBe('Model not found');
    });

    it('should fail if category not found', async () => {
      const brand = Brand.create({ name: 'Toyota' });
      const model = Model.create({ name: 'Corolla', brandId: brand.id.toString() });
      const existingVehicle = Vehicle.create({
        plate: 'ABC-1234',
        chassis: '1HGBH41JXMN109186',
        renavam: '12345678901',
        modelId: model.id.toString(),
        categoryId: 'category-id',
        year: 2024,
      });

      vi.spyOn(vehicleRepository, 'findById').mockResolvedValue(existingVehicle);
      vi.spyOn(modelRepository, 'findById').mockResolvedValue(model);
      vi.spyOn(categoryRepository, 'findById').mockResolvedValue(null);

      const result = await useCase.execute({
        id: existingVehicle.id.toString(),
        plate: 'XYZ-5678',
        chassis: '2HGBH41JXMN109187',
        renavam: '98765432109',
        modelId: model.id.toString(),
        categoryId: 'nonexistent-category',
        year: 2025,
      });

      expect(result.isFail()).toBe(true);
      const failResult = result as any;
      expect(failResult.value.message).toBe('Category not found');
    });

    it('should fail if plate already registered by another vehicle', async () => {
      const brand = Brand.create({ name: 'Toyota' });
      const model = Model.create({ name: 'Corolla', brandId: brand.id.toString() });
      const category = Category.create({ name: 'Sedan' });
      const existingVehicle = Vehicle.create({
        plate: 'ABC-1234',
        chassis: '1HGBH41JXMN109186',
        renavam: '12345678901',
        modelId: model.id.toString(),
        categoryId: category.id.toString(),
        year: 2024,
      });
      const anotherVehicle = Vehicle.create({
        plate: 'XYZ-5678',
        chassis: '2HGBH41JXMN109187',
        renavam: '98765432109',
        modelId: model.id.toString(),
        categoryId: category.id.toString(),
        year: 2024,
      });

      vi.spyOn(vehicleRepository, 'findById').mockResolvedValue(existingVehicle);
      vi.spyOn(modelRepository, 'findById').mockResolvedValue(model);
      vi.spyOn(categoryRepository, 'findById').mockResolvedValue(category);
      vi.spyOn(vehicleRepository, 'findByPlate').mockResolvedValue(anotherVehicle);

      const result = await useCase.execute({
        id: existingVehicle.id.toString(),
        plate: 'XYZ-5678',
        chassis: '2HGBH41JXMN109187',
        renavam: '98765432109',
        modelId: model.id.toString(),
        categoryId: category.id.toString(),
        year: 2025,
      });

      expect(result.isFail()).toBe(true);
      const failResult = result as any;
      expect(failResult.value.message).toBe('Plate already registered');
    });

    it('should fail if chassis already registered by another vehicle', async () => {
      const brand = Brand.create({ name: 'Toyota' });
      const model = Model.create({ name: 'Corolla', brandId: brand.id.toString() });
      const category = Category.create({ name: 'Sedan' });
      const existingVehicle = Vehicle.create({
        plate: 'ABC-1234',
        chassis: '1HGBH41JXMN109186',
        renavam: '12345678901',
        modelId: model.id.toString(),
        categoryId: category.id.toString(),
        year: 2024,
      });
      const anotherVehicle = Vehicle.create({
        plate: 'XYZ-5678',
        chassis: '2HGBH41JXMN109187',
        renavam: '98765432109',
        modelId: model.id.toString(),
        categoryId: category.id.toString(),
        year: 2024,
      });

      vi.spyOn(vehicleRepository, 'findById').mockResolvedValue(existingVehicle);
      vi.spyOn(modelRepository, 'findById').mockResolvedValue(model);
      vi.spyOn(categoryRepository, 'findById').mockResolvedValue(category);
      vi.spyOn(vehicleRepository, 'findByPlate').mockResolvedValue(null);
      vi.spyOn(vehicleRepository, 'findByChassis').mockResolvedValue(anotherVehicle);

      const result = await useCase.execute({
        id: existingVehicle.id.toString(),
        plate: 'ABC-1235',
        chassis: '2HGBH41JXMN109187',
        renavam: '98765432109',
        modelId: model.id.toString(),
        categoryId: category.id.toString(),
        year: 2025,
      });

      expect(result.isFail()).toBe(true);
      const failResult = result as any;
      expect(failResult.value.message).toBe('Chassis already registered');
    });

    it('should fail if renavam already registered by another vehicle', async () => {
      const brand = Brand.create({ name: 'Toyota' });
      const model = Model.create({ name: 'Corolla', brandId: brand.id.toString() });
      const category = Category.create({ name: 'Sedan' });
      const existingVehicle = Vehicle.create({
        plate: 'ABC-1234',
        chassis: '1HGBH41JXMN109186',
        renavam: '12345678901',
        modelId: model.id.toString(),
        categoryId: category.id.toString(),
        year: 2024,
      });
      const anotherVehicle = Vehicle.create({
        plate: 'XYZ-5678',
        chassis: '2HGBH41JXMN109187',
        renavam: '98765432109',
        modelId: model.id.toString(),
        categoryId: category.id.toString(),
        year: 2024,
      });

      vi.spyOn(vehicleRepository, 'findById').mockResolvedValue(existingVehicle);
      vi.spyOn(modelRepository, 'findById').mockResolvedValue(model);
      vi.spyOn(categoryRepository, 'findById').mockResolvedValue(category);
      vi.spyOn(vehicleRepository, 'findByPlate').mockResolvedValue(null);
      vi.spyOn(vehicleRepository, 'findByChassis').mockResolvedValue(null);
      vi.spyOn(vehicleRepository, 'findByRenavam').mockResolvedValue(anotherVehicle);

      const result = await useCase.execute({
        id: existingVehicle.id.toString(),
        plate: 'ABC-1235',
        chassis: '2HGBH41JXMN109188',
        renavam: '98765432109',
        modelId: model.id.toString(),
        categoryId: category.id.toString(),
        year: 2025,
      });

      expect(result.isFail()).toBe(true);
      const failResult = result as any;
      expect(failResult.value.message).toBe('Renavam already registered');
    });
  });
});
