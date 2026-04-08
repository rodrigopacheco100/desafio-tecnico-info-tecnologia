import { Category } from '@/domain/entities/category';
import { categories } from '../schemas/categories.schema';

type CategoryDb = typeof categories.$inferSelect;

export class CategoryMapper {
  static toDomain(dbCategory: CategoryDb): Category {
    return Category.from({
      id: dbCategory.id,
      name: dbCategory.name,
      createdAt: dbCategory.createdAt,
      updatedAt: dbCategory.updatedAt,
    });
  }

  static toCreateOnDb(category: Category): typeof categories.$inferInsert {
    return {
      id: category.id,
      name: category.name,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    };
  }

  static toUpdateOnDb(
    category: Category,
  ): WithoutId<TypedOmit<typeof categories.$inferInsert, 'createdAt'>> {
    return {
      name: category.name,
      updatedAt: category.updatedAt,
    };
  }
}
