import { CategoryRepository } from '@/domain/repositories/category.repository';
import { Category } from '@/domain/entities/category';
import { Injectable } from '@nestjs/common';
import { categories } from '../schemas/categories.schema';
import { CategoryMapper } from '../mappers/category.mapper';
import { DrizzleDB } from '../connection/drizzle';
import { eq } from 'drizzle-orm';

@Injectable()
export class DrizzleCategoryRepository implements CategoryRepository {
  constructor(private readonly drizzle: DrizzleDB) {}

  async save(category: Category): Promise<void> {
    await this.drizzle.connection
      .insert(categories)
      .values(CategoryMapper.toCreateOnDb(category))
      .onConflictDoUpdate({
        target: categories.id,
        set: CategoryMapper.toUpdateOnDb(category),
      });
  }

  async findById(id: string): Promise<Category | null> {
    const category = await this.drizzle.connection.query.categories.findFirst({
      where: eq(categories.id, id),
    });
    return category ? CategoryMapper.toDomain(category) : null;
  }

  async findByName(name: string): Promise<Category | null> {
    const category = await this.drizzle.connection.query.categories.findFirst({
      where: eq(categories.name, name),
    });
    return category ? CategoryMapper.toDomain(category) : null;
  }

  async findAll(): Promise<Category[]> {
    const allCategories = await this.drizzle.connection.query.categories.findMany();
    return allCategories.map(CategoryMapper.toDomain);
  }

  async delete(id: string): Promise<void> {
    await this.drizzle.connection.delete(categories).where(eq(categories.id, id));
  }
}
