import { Test, TestingModule } from '@nestjs/testing';
import { CreateBrandUseCase } from '@/domain/use-cases/create-brand';
import { BrandRepository } from '@/domain/repositories/brand.repository';
import { mockBrandRepository } from '../../repositories/__mocks__/brand.repository.mock';
import { Brand } from '@/domain/entities/brand';

describe('CreateBrandUseCase', () => {
  let useCase: CreateBrandUseCase;
  let brandRepository: BrandRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateBrandUseCase, { provide: BrandRepository, useValue: mockBrandRepository }],
    }).compile();

    useCase = module.get<CreateBrandUseCase>(CreateBrandUseCase);
    brandRepository = module.get<BrandRepository>(BrandRepository);

    vi.clearAllMocks();
  });

  describe('execute', () => {
    it('should create a brand successfully', async () => {
      vi.spyOn(brandRepository, 'findByName').mockResolvedValue(null);
      vi.spyOn(brandRepository, 'save').mockResolvedValue(undefined);

      const result = await useCase.execute({ name: 'Toyota' });

      expect(result.isSuccess()).toBe(true);
      const successResult = result as any;
      expect(successResult.value.brand.name).toBe('Toyota');
      expect(brandRepository.findByName).toHaveBeenCalledWith('Toyota');
      expect(brandRepository.save).toHaveBeenCalled();
    });

    it('should fail if brand name is already used', async () => {
      const existingBrand = Brand.create({ name: 'Toyota' });
      vi.spyOn(brandRepository, 'findByName').mockResolvedValue(existingBrand);

      const result = await useCase.execute({ name: 'Toyota' });

      expect(result.isFail()).toBe(true);
      const failResult = result as any;
      expect(failResult.value.message).toBe('Brand name already used');
    });
  });
});
