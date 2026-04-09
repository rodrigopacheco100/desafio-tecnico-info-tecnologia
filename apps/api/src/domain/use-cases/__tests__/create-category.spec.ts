import { Test, TestingModule } from '@nestjs/testing';
import { CreateCategoryUseCase } from '@/domain/use-cases/create-category';
import { CategoryRepository } from '@/domain/repositories/category.repository';
import { mockCategoryRepository } from '../../repositories/__mocks__/category.repository.mock';
import { Category } from '@/domain/entities/category';

describe('CreateCategoryUseCase', () => {
  let useCase: CreateCategoryUseCase;
  let categoryRepository: CategoryRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateCategoryUseCase,
        { provide: CategoryRepository, useValue: mockCategoryRepository },
      ],
    }).compile();

    useCase = module.get<CreateCategoryUseCase>(CreateCategoryUseCase);
    categoryRepository = module.get<CategoryRepository>(CategoryRepository);

    vi.clearAllMocks();
  });

  describe('execute', () => {
    it('should create a category successfully', async () => {
      vi.spyOn(categoryRepository, 'findByName').mockResolvedValue(null);
      vi.spyOn(categoryRepository, 'save').mockResolvedValue(undefined);

      const result = await useCase.execute({ name: 'Sedan' });

      expect(result.isSuccess()).toBe(true);
      const successResult = result as any;
      expect(successResult.value.category.name).toBe('Sedan');
      expect(categoryRepository.findByName).toHaveBeenCalledWith('Sedan');
      expect(categoryRepository.save).toHaveBeenCalled();
    });

    it('should fail if category name is already used', async () => {
      const existingCategory = Category.create({ name: 'Sedan' });
      vi.spyOn(categoryRepository, 'findByName').mockResolvedValue(existingCategory);

      const result = await useCase.execute({ name: 'Sedan' });

      expect(result.isFail()).toBe(true);
      const failResult = result as any;
      expect(failResult.value.message).toBe('Category name already used');
    });
  });
});
