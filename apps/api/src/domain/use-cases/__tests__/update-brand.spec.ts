import { Test, TestingModule } from '@nestjs/testing';
import { UpdateBrandUseCase } from '@/domain/use-cases/update-brand';
import { BrandRepository } from '@/domain/repositories/brand.repository';
import { mockBrandRepository } from '../../repositories/__mocks__/brand.repository.mock';
import { Brand } from '@/domain/entities/brand';

describe('UpdateBrandUseCase', () => {
  let useCase: UpdateBrandUseCase;
  let brandRepository: BrandRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateBrandUseCase, { provide: BrandRepository, useValue: mockBrandRepository }],
    }).compile();

    useCase = module.get<UpdateBrandUseCase>(UpdateBrandUseCase);
    brandRepository = module.get<BrandRepository>(BrandRepository);

    vi.clearAllMocks();
  });

  describe('execute', () => {
    it('should update a brand successfully', async () => {
      const existingBrand = Brand.create({ name: 'Toyota' });
      vi.spyOn(brandRepository, 'findById').mockResolvedValue(existingBrand);
      vi.spyOn(brandRepository, 'findByName').mockResolvedValue(null);
      vi.spyOn(brandRepository, 'save').mockResolvedValue(undefined);

      const result = await useCase.execute({ id: existingBrand.id.toString(), name: 'Honda' });

      expect(result.isSuccess()).toBe(true);
      const successResult = result as any;
      expect(successResult.value.brand.name).toBe('Honda');
    });

    it('should fail if brand not found', async () => {
      vi.spyOn(brandRepository, 'findById').mockResolvedValue(null);

      const result = await useCase.execute({ id: 'nonexistent-id', name: 'Honda' });

      expect(result.isFail()).toBe(true);
      const failResult = result as any;
      expect(failResult.value.message).toBe('Brand not found');
    });

    it('should fail if brand name is already used by another brand', async () => {
      const existingBrand = Brand.create({ name: 'Toyota' });
      const anotherBrand = Brand.create({ name: 'Honda' });
      vi.spyOn(brandRepository, 'findById').mockResolvedValue(existingBrand);
      vi.spyOn(brandRepository, 'findByName').mockResolvedValue(anotherBrand);

      const result = await useCase.execute({ id: existingBrand.id.toString(), name: 'Honda' });

      expect(result.isFail()).toBe(true);
      const failResult = result as any;
      expect(failResult.value.message).toBe('Brand name already used');
    });

    it('should allow same name when updating same brand', async () => {
      const existingBrand = Brand.create({ name: 'Toyota' });
      vi.spyOn(brandRepository, 'findById').mockResolvedValue(existingBrand);
      vi.spyOn(brandRepository, 'findByName').mockResolvedValue(existingBrand);
      vi.spyOn(brandRepository, 'save').mockResolvedValue(undefined);

      const result = await useCase.execute({ id: existingBrand.id.toString(), name: 'Toyota' });

      expect(result.isSuccess()).toBe(true);
    });
  });
});
