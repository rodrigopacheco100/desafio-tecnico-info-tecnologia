import { Test, TestingModule } from '@nestjs/testing';
import { DeleteVehicleUseCase } from '@/domain/use-cases/delete-vehicle';
import { VehicleRepository } from '@/domain/repositories/vehicle.repository';
import { EventPublisher } from '@/domain/services/event-publisher';
import { mockVehicleRepository } from '../../repositories/__mocks__/vehicle.repository.mock';
import { mockEventPublisher } from '../../services/__mocks__/event-publisher.mock';
import { Vehicle } from '@/domain/entities/vehicle';

describe('DeleteVehicleUseCase', () => {
  let useCase: DeleteVehicleUseCase;
  let vehicleRepository: VehicleRepository;
  let eventPublisher: EventPublisher;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteVehicleUseCase,
        { provide: VehicleRepository, useValue: mockVehicleRepository },
        { provide: EventPublisher, useValue: mockEventPublisher },
      ],
    }).compile();

    useCase = module.get<DeleteVehicleUseCase>(DeleteVehicleUseCase);
    vehicleRepository = module.get<VehicleRepository>(VehicleRepository);
    eventPublisher = module.get<EventPublisher>(EventPublisher);

    vi.clearAllMocks();
  });

  describe('execute', () => {
    it('should delete a vehicle successfully', async () => {
      const existingVehicle = Vehicle.create({
        plate: 'ABC-1234',
        chassis: '1HGBH41JXMN109186',
        renavam: '12345678901',
        modelId: 'model-id',
        categoryId: 'category-id',
        year: 2024,
      });

      vi.spyOn(vehicleRepository, 'findById').mockResolvedValue(existingVehicle);
      vi.spyOn(vehicleRepository, 'delete').mockResolvedValue(undefined);

      const result = await useCase.execute({ id: existingVehicle.id.toString() });

      expect(result.isSuccess()).toBe(true);
      expect(eventPublisher.publish).toHaveBeenCalled();
      expect(vehicleRepository.delete).toHaveBeenCalledWith(existingVehicle.id.toString());
    });

    it('should fail if vehicle not found', async () => {
      vi.spyOn(vehicleRepository, 'findById').mockResolvedValue(null);

      const result = await useCase.execute({ id: 'nonexistent-vehicle' });

      expect(result.isFail()).toBe(true);
      const failResult = result as any;
      expect(failResult.value.message).toBe('Vehicle not found');
    });
  });
});
