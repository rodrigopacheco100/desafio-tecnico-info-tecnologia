import { Test, TestingModule } from '@nestjs/testing';
import { UpdateCategoryUseCase } from '@/domain/use-cases/update-category';
import { CategoryRepository } from '@/domain/repositories/category.repository';
import { mockCategoryRepository } from '../../repositories/__mocks__/category.repository.mock';
import { Category } from '@/domain/entities/category';

describe('UpdateCategoryUseCase', () => {
  let useCase: UpdateCategoryUseCase;
  let categoryRepository: CategoryRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateCategoryUseCase,
        { provide: CategoryRepository, useValue: mockCategoryRepository },
      ],
    }).compile();

    useCase = module.get<UpdateCategoryUseCase>(UpdateCategoryUseCase);
    categoryRepository = module.get<CategoryRepository>(CategoryRepository);

    vi.clearAllMocks();
  });

  describe('execute', () => {
    it('should update a category successfully', async () => {
      const existingCategory = Category.create({ name: 'Sedan' });
      vi.spyOn(categoryRepository, 'findById').mockResolvedValue(existingCategory);
      vi.spyOn(categoryRepository, 'findByName').mockResolvedValue(null);
      vi.spyOn(categoryRepository, 'save').mockResolvedValue(undefined);

      const result = await useCase.execute({ id: existingCategory.id.toString(), name: 'SUV' });

      expect(result.isSuccess()).toBe(true);
      const successResult = result as any;
      expect(successResult.value.category.name).toBe('SUV');
    });

    it('should fail if category not found', async () => {
      vi.spyOn(categoryRepository, 'findById').mockResolvedValue(null);

      const result = await useCase.execute({ id: 'nonexistent-category', name: 'SUV' });

      expect(result.isFail()).toBe(true);
      const failResult = result as any;
      expect(failResult.value.message).toBe('Category not found');
    });

    it('should fail if category name is already used by another category', async () => {
      const existingCategory = Category.create({ name: 'Sedan' });
      const anotherCategory = Category.create({ name: 'SUV' });
      vi.spyOn(categoryRepository, 'findById').mockResolvedValue(existingCategory);
      vi.spyOn(categoryRepository, 'findByName').mockResolvedValue(anotherCategory);

      const result = await useCase.execute({ id: existingCategory.id.toString(), name: 'SUV' });

      expect(result.isFail()).toBe(true);
      const failResult = result as any;
      expect(failResult.value.message).toBe('Category name already used');
    });
  });
});
