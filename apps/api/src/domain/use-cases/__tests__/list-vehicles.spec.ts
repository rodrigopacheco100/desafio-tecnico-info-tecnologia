import { Test, TestingModule } from '@nestjs/testing';
import { ListVehiclesUseCase } from '@/domain/use-cases/list-vehicles';
import { VehicleRepository } from '@/domain/repositories/vehicle.repository';
import {
  mockVehicleRepository,
  makeMockVehicle,
} from '../../repositories/__mocks__/vehicle.repository.mock';

describe('ListVehiclesUseCase', () => {
  let useCase: ListVehiclesUseCase;
  let vehicleRepository: VehicleRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListVehiclesUseCase,
        { provide: VehicleRepository, useValue: mockVehicleRepository },
      ],
    }).compile();

    useCase = module.get<ListVehiclesUseCase>(ListVehiclesUseCase);
    vehicleRepository = module.get<VehicleRepository>(VehicleRepository);

    vi.clearAllMocks();
  });

  describe('execute', () => {
    it('should return paginated vehicles', async () => {
      const vehicles = [
        makeMockVehicle({ plate: 'ABC-1234' }),
        makeMockVehicle({ plate: 'XYZ-5678' }),
      ];
      const paginatedResult = {
        data: vehicles,
        totalCount: 2,
        amountOfPages: 1,
      };
      vi.spyOn(vehicleRepository, 'findAllPaginated').mockResolvedValue(paginatedResult);

      const result = await useCase.execute({ pagination: { page: 1, quantityPerPage: 10 } });

      expect(result.isSuccess()).toBe(true);
      const successResult = result as any;
      expect(successResult.value.data).toHaveLength(2);
      expect(successResult.value.totalCount).toBe(2);
      expect(vehicleRepository.findAllPaginated).toHaveBeenCalledWith({
        page: 1,
        quantityPerPage: 10,
      });
    });

    it('should return empty result when no vehicles exist', async () => {
      const paginatedResult = {
        data: [],
        totalCount: 0,
        amountOfPages: 0,
      };
      vi.spyOn(vehicleRepository, 'findAllPaginated').mockResolvedValue(paginatedResult);

      const result = await useCase.execute({ pagination: { page: 1, quantityPerPage: 10 } });

      expect(result.isSuccess()).toBe(true);
      const successResult = result as any;
      expect(successResult.value.data).toHaveLength(0);
      expect(successResult.value.totalCount).toBe(0);
    });
  });
});
