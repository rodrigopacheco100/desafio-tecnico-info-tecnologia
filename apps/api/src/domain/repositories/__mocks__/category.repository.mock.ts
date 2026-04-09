import { vi } from 'vitest';
import { Category, CategoryProps } from '@/domain/entities/category';
import { CategoryRepository } from '../category.repository';

type CategoryOverride = Partial<Pick<CategoryProps, 'name'>>;

export const makeMockCategory = (override?: CategoryOverride): Category => {
  return Category.create({
    name: 'Sedan',
    ...override,
  });
};

export const mockCategoryRepository: CategoryRepository = {
  save: vi.fn(),
  findById: vi.fn(),
  findByName: vi.fn(),
  findAll: vi.fn(),
  delete: vi.fn(),
};
