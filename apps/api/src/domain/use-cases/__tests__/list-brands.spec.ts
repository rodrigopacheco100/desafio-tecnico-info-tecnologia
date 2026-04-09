import { Test, TestingModule } from '@nestjs/testing';
import { ListBrandsUseCase } from '@/domain/use-cases/list-brands';
import { BrandRepository } from '@/domain/repositories/brand.repository';
import {
  mockBrandRepository,
  makeMockBrand,
} from '../../repositories/__mocks__/brand.repository.mock';

describe('ListBrandsUseCase', () => {
  let useCase: ListBrandsUseCase;
  let brandRepository: BrandRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListBrandsUseCase, { provide: BrandRepository, useValue: mockBrandRepository }],
    }).compile();

    useCase = module.get<ListBrandsUseCase>(ListBrandsUseCase);
    brandRepository = module.get<BrandRepository>(BrandRepository);

    vi.clearAllMocks();
  });

  describe('execute', () => {
    it('should return all brands', async () => {
      const brands = [makeMockBrand({ name: 'Toyota' }), makeMockBrand({ name: 'Honda' })];
      vi.spyOn(brandRepository, 'findAll').mockResolvedValue(brands);

      const result = await useCase.execute();

      expect(result.isSuccess()).toBe(true);
      const successResult = result as any;
      expect(successResult.value.brands).toHaveLength(2);
    });

    it('should return empty array when no brands exist', async () => {
      vi.spyOn(brandRepository, 'findAll').mockResolvedValue([]);

      const result = await useCase.execute();

      expect(result.isSuccess()).toBe(true);
      const successResult = result as any;
      expect(successResult.value.brands).toHaveLength(0);
    });
  });
});
