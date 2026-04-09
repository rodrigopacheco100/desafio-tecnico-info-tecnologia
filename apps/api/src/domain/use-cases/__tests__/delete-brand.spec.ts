import { Test, TestingModule } from '@nestjs/testing';
import { DeleteBrandUseCase } from '@/domain/use-cases/delete-brand';
import { BrandRepository } from '@/domain/repositories/brand.repository';
import { mockBrandRepository } from '../../repositories/__mocks__/brand.repository.mock';
import { Brand } from '@/domain/entities/brand';

describe('DeleteBrandUseCase', () => {
  let useCase: DeleteBrandUseCase;
  let brandRepository: BrandRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteBrandUseCase, { provide: BrandRepository, useValue: mockBrandRepository }],
    }).compile();

    useCase = module.get<DeleteBrandUseCase>(DeleteBrandUseCase);
    brandRepository = module.get<BrandRepository>(BrandRepository);

    vi.clearAllMocks();
  });

  describe('execute', () => {
    it('should delete a brand successfully', async () => {
      const existingBrand = Brand.create({ name: 'Toyota' });
      vi.spyOn(brandRepository, 'findById').mockResolvedValue(existingBrand);
      vi.spyOn(brandRepository, 'delete').mockResolvedValue(undefined);

      const result = await useCase.execute({ id: existingBrand.id.toString() });

      expect(result.isSuccess()).toBe(true);
    });

    it('should fail if brand not found', async () => {
      vi.spyOn(brandRepository, 'findById').mockResolvedValue(null);

      const result = await useCase.execute({ id: 'nonexistent-id' });

      expect(result.isFail()).toBe(true);
      expect(result.value.message).toBe('Brand not found');
    });
  });
});
