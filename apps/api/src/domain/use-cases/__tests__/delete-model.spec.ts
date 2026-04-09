import { Test, TestingModule } from '@nestjs/testing';
import { DeleteModelUseCase } from '@/domain/use-cases/delete-model';
import { ModelRepository } from '@/domain/repositories/model.repository';
import { mockModelRepository } from '../../repositories/__mocks__/model.repository.mock';
import { Model } from '@/domain/entities/model';

describe('DeleteModelUseCase', () => {
  let useCase: DeleteModelUseCase;
  let modelRepository: ModelRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteModelUseCase, { provide: ModelRepository, useValue: mockModelRepository }],
    }).compile();

    useCase = module.get<DeleteModelUseCase>(DeleteModelUseCase);
    modelRepository = module.get<ModelRepository>(ModelRepository);

    vi.clearAllMocks();
  });

  describe('execute', () => {
    it('should delete a model successfully', async () => {
      const existingModel = Model.create({ name: 'Corolla', brandId: 'brand-id-1' });
      vi.spyOn(modelRepository, 'findById').mockResolvedValue(existingModel);
      vi.spyOn(modelRepository, 'delete').mockResolvedValue(undefined);

      const result = await useCase.execute({ id: existingModel.id.toString() });

      expect(result.isSuccess()).toBe(true);
      expect(modelRepository.delete).toHaveBeenCalledWith(existingModel.id.toString());
    });

    it('should fail if model not found', async () => {
      vi.spyOn(modelRepository, 'findById').mockResolvedValue(null);

      const result = await useCase.execute({ id: 'nonexistent-model' });

      expect(result.isFail()).toBe(true);
      const failResult = result as any;
      expect(failResult.value.message).toBe('Model not found');
    });
  });
});
