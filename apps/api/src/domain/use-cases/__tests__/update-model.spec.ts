import { Test, TestingModule } from '@nestjs/testing';
import { UpdateModelUseCase } from '@/domain/use-cases/update-model';
import { ModelRepository } from '@/domain/repositories/model.repository';
import { BrandRepository } from '@/domain/repositories/brand.repository';
import { mockModelRepository } from '../../repositories/__mocks__/model.repository.mock';
import { mockBrandRepository } from '../../repositories/__mocks__/brand.repository.mock';
import { Brand } from '@/domain/entities/brand';
import { Model } from '@/domain/entities/model';

describe('UpdateModelUseCase', () => {
  let useCase: UpdateModelUseCase;
  let modelRepository: ModelRepository;
  let brandRepository: BrandRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateModelUseCase,
        { provide: ModelRepository, useValue: mockModelRepository },
        { provide: BrandRepository, useValue: mockBrandRepository },
      ],
    }).compile();

    useCase = module.get<UpdateModelUseCase>(UpdateModelUseCase);
    modelRepository = module.get<ModelRepository>(ModelRepository);
    brandRepository = module.get<BrandRepository>(BrandRepository);

    vi.clearAllMocks();
  });

  describe('execute', () => {
    it('should update a model successfully', async () => {
      const brand = Brand.create({ name: 'Toyota' });
      const existingModel = Model.create({ name: 'Corolla', brandId: brand.id.toString() });
      vi.spyOn(modelRepository, 'findById').mockResolvedValue(existingModel);
      const newBrand = Brand.create({ name: 'Honda' });
      vi.spyOn(brandRepository, 'findById').mockResolvedValue(newBrand);
      vi.spyOn(modelRepository, 'findByName').mockResolvedValue(null);
      vi.spyOn(modelRepository, 'save').mockResolvedValue(undefined);

      const result = await useCase.execute({
        id: existingModel.id.toString(),
        name: 'Civic',
        brandId: newBrand.id.toString(),
      });

      expect(result.isSuccess()).toBe(true);
      const successResult = result as any;
      expect(successResult.value.model.name).toBe('Civic');
    });

    it('should fail if model not found', async () => {
      vi.spyOn(modelRepository, 'findById').mockResolvedValue(null);

      const result = await useCase.execute({
        id: 'nonexistent-model',
        name: 'Civic',
        brandId: 'brand-id',
      });

      expect(result.isFail()).toBe(true);
      const failResult = result as any;
      expect(failResult.value.message).toBe('Model not found');
    });

    it('should fail if brand not found', async () => {
      const existingModel = Model.create({ name: 'Corolla', brandId: 'brand-id-1' });
      vi.spyOn(modelRepository, 'findById').mockResolvedValue(existingModel);
      vi.spyOn(brandRepository, 'findById').mockResolvedValue(null);

      const result = await useCase.execute({
        id: existingModel.id.toString(),
        name: 'Civic',
        brandId: 'nonexistent-brand',
      });

      expect(result.isFail()).toBe(true);
      const failResult = result as any;
      expect(failResult.value.message).toBe('Brand not found');
    });

    it('should fail if model name is already used by another model', async () => {
      const brand = Brand.create({ name: 'Toyota' });
      const existingModel = Model.create({ name: 'Corolla', brandId: brand.id.toString() });
      const anotherModel = Model.create({ name: 'Civic', brandId: brand.id.toString() });
      vi.spyOn(modelRepository, 'findById').mockResolvedValue(existingModel);
      vi.spyOn(brandRepository, 'findById').mockResolvedValue(brand);
      vi.spyOn(modelRepository, 'findByName').mockResolvedValue(anotherModel);

      const result = await useCase.execute({
        id: existingModel.id.toString(),
        name: 'Civic',
        brandId: brand.id.toString(),
      });

      expect(result.isFail()).toBe(true);
      const failResult = result as any;
      expect(failResult.value.message).toBe('Model name already used');
    });
  });
});
