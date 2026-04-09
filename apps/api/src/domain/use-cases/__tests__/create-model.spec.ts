import { Test, TestingModule } from '@nestjs/testing';
import { CreateModelUseCase } from '@/domain/use-cases/create-model';
import { ModelRepository } from '@/domain/repositories/model.repository';
import { BrandRepository } from '@/domain/repositories/brand.repository';
import { mockModelRepository } from '../../repositories/__mocks__/model.repository.mock';
import { mockBrandRepository } from '../../repositories/__mocks__/brand.repository.mock';
import { Brand } from '@/domain/entities/brand';

describe('CreateModelUseCase', () => {
  let useCase: CreateModelUseCase;
  let modelRepository: ModelRepository;
  let brandRepository: BrandRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateModelUseCase,
        { provide: ModelRepository, useValue: mockModelRepository },
        { provide: BrandRepository, useValue: mockBrandRepository },
      ],
    }).compile();

    useCase = module.get<CreateModelUseCase>(CreateModelUseCase);
    modelRepository = module.get<ModelRepository>(ModelRepository);
    brandRepository = module.get<BrandRepository>(BrandRepository);

    vi.clearAllMocks();
  });

  describe('execute', () => {
    it('should create a model successfully', async () => {
      const brand = Brand.create({ name: 'Toyota' });
      vi.spyOn(brandRepository, 'findById').mockResolvedValue(brand);
      vi.spyOn(modelRepository, 'findByName').mockResolvedValue(null);
      vi.spyOn(modelRepository, 'save').mockResolvedValue(undefined);

      const result = await useCase.execute({ name: 'Corolla', brandId: brand.id.toString() });

      expect(result.isSuccess()).toBe(true);
      const successResult = result as any;
      expect(successResult.value.model.name).toBe('Corolla');
    });

    it('should fail if brand not found', async () => {
      vi.spyOn(brandRepository, 'findById').mockResolvedValue(null);

      const result = await useCase.execute({ name: 'Corolla', brandId: 'nonexistent-brand' });

      expect(result.isFail()).toBe(true);
      const failResult = result as any;
      expect(failResult.value.message).toBe('Brand not found');
    });

    it('should fail if model name is already used', async () => {
      const brand = Brand.create({ name: 'Toyota' });
      vi.spyOn(brandRepository, 'findById').mockResolvedValue(brand);
      const existingModel = { name: 'Corolla' } as any;
      vi.spyOn(modelRepository, 'findByName').mockResolvedValue(existingModel);

      const result = await useCase.execute({ name: 'Corolla', brandId: brand.id.toString() });

      expect(result.isFail()).toBe(true);
      const failResult = result as any;
      expect(failResult.value.message).toBe('Model name already used');
    });
  });
});
