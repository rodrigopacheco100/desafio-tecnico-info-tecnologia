import { Test, TestingModule } from '@nestjs/testing';
import { ListModelsUseCase } from '@/domain/use-cases/list-models';
import { ModelRepository } from '@/domain/repositories/model.repository';
import {
  mockModelRepository,
  makeMockModel,
} from '../../repositories/__mocks__/model.repository.mock';

describe('ListModelsUseCase', () => {
  let useCase: ListModelsUseCase;
  let modelRepository: ModelRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListModelsUseCase, { provide: ModelRepository, useValue: mockModelRepository }],
    }).compile();

    useCase = module.get<ListModelsUseCase>(ListModelsUseCase);
    modelRepository = module.get<ModelRepository>(ModelRepository);

    vi.clearAllMocks();
  });

  describe('execute', () => {
    it('should return all models when no brandId is provided', async () => {
      const models = [makeMockModel({ name: 'Corolla' }), makeMockModel({ name: 'Civic' })];
      vi.spyOn(modelRepository, 'findAll').mockResolvedValue(models);

      const result = await useCase.execute({});

      expect(result.isSuccess()).toBe(true);
      const successResult = result as any;
      expect(successResult.value.models).toHaveLength(2);
    });

    it('should return models filtered by brandId', async () => {
      const models = [makeMockModel({ name: 'Corolla', brandId: 'brand-1' })];
      vi.spyOn(modelRepository, 'findByBrandId').mockResolvedValue(models);

      const result = await useCase.execute({ brandId: 'brand-1' });

      expect(result.isSuccess()).toBe(true);
      const successResult = result as any;
      expect(successResult.value.models).toHaveLength(1);
    });

    it('should return empty array when no models exist', async () => {
      vi.spyOn(modelRepository, 'findAll').mockResolvedValue([]);

      const result = await useCase.execute({});

      expect(result.isSuccess()).toBe(true);
      const successResult = result as any;
      expect(successResult.value.models).toHaveLength(0);
    });
  });
});
