import { Test, TestingModule } from '@nestjs/testing';
import { DeleteCategoryUseCase } from '@/domain/use-cases/delete-category';
import { CategoryRepository } from '@/domain/repositories/category.repository';
import { mockCategoryRepository } from '../../repositories/__mocks__/category.repository.mock';
import { Category } from '@/domain/entities/category';

describe('DeleteCategoryUseCase', () => {
  let useCase: DeleteCategoryUseCase;
  let categoryRepository: CategoryRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteCategoryUseCase,
        { provide: CategoryRepository, useValue: mockCategoryRepository },
      ],
    }).compile();

    useCase = module.get<DeleteCategoryUseCase>(DeleteCategoryUseCase);
    categoryRepository = module.get<CategoryRepository>(CategoryRepository);

    vi.clearAllMocks();
  });

  describe('execute', () => {
    it('should delete a category successfully', async () => {
      const existingCategory = Category.create({ name: 'Sedan' });
      vi.spyOn(categoryRepository, 'findById').mockResolvedValue(existingCategory);
      vi.spyOn(categoryRepository, 'delete').mockResolvedValue(undefined);

      const result = await useCase.execute({ id: existingCategory.id.toString() });

      expect(result.isSuccess()).toBe(true);
    });

    it('should fail if category not found', async () => {
      vi.spyOn(categoryRepository, 'findById').mockResolvedValue(null);

      const result = await useCase.execute({ id: 'nonexistent-category' });

      expect(result.isFail()).toBe(true);
      const failResult = result as any;
      expect(failResult.value.message).toBe('Category not found');
    });
  });
});
