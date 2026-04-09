import { Test, TestingModule } from '@nestjs/testing';
import { ListCategoriesUseCase } from '@/domain/use-cases/list-categories';
import { CategoryRepository } from '@/domain/repositories/category.repository';
import {
  mockCategoryRepository,
  makeMockCategory,
} from '../../repositories/__mocks__/category.repository.mock';

describe('ListCategoriesUseCase', () => {
  let useCase: ListCategoriesUseCase;
  let categoryRepository: CategoryRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListCategoriesUseCase,
        { provide: CategoryRepository, useValue: mockCategoryRepository },
      ],
    }).compile();

    useCase = module.get<ListCategoriesUseCase>(ListCategoriesUseCase);
    categoryRepository = module.get<CategoryRepository>(CategoryRepository);

    vi.clearAllMocks();
  });

  describe('execute', () => {
    it('should return all categories', async () => {
      const categories = [makeMockCategory({ name: 'Sedan' }), makeMockCategory({ name: 'SUV' })];
      vi.spyOn(categoryRepository, 'findAll').mockResolvedValue(categories);

      const result = await useCase.execute();

      expect(result.isSuccess()).toBe(true);
      const successResult = result as any;
      expect(successResult.value.categories).toHaveLength(2);
      expect(categoryRepository.findAll).toHaveBeenCalled();
    });

    it('should return empty array when no categories exist', async () => {
      vi.spyOn(categoryRepository, 'findAll').mockResolvedValue([]);

      const result = await useCase.execute();

      expect(result.isSuccess()).toBe(true);
      const successResult = result as any;
      expect(successResult.value.categories).toHaveLength(0);
    });
  });
});
