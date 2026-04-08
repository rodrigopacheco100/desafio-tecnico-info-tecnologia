import { Category } from '../entities/category';

export abstract class CategoryRepository {
  abstract save(category: Category): Promise<void>;
  abstract findById(id: string): Promise<Category | null>;
  abstract findByName(name: string): Promise<Category | null>;
  abstract findAll(): Promise<Category[]>;
  abstract delete(id: string): Promise<void>;
}
