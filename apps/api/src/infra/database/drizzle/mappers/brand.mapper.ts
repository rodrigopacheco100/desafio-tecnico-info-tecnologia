import { Brand } from '@/domain/entities/brand';
import { brands } from '../schemas/brands.schema';

type BrandDb = typeof brands.$inferSelect;

export class BrandMapper {
  static toDomain(dbBrand: BrandDb): Brand {
    return Brand.from({
      id: dbBrand.id,
      name: dbBrand.name,
      createdAt: dbBrand.createdAt,
      updatedAt: dbBrand.updatedAt,
    });
  }

  static toCreateOnDb(brand: Brand): typeof brands.$inferInsert {
    return {
      id: brand.id,
      name: brand.name,
      createdAt: brand.createdAt,
      updatedAt: brand.updatedAt,
    };
  }

  static toUpdateOnDb(brand: Brand): WithoutId<TypedOmit<typeof brands.$inferInsert, 'createdAt'>> {
    return {
      name: brand.name,
      updatedAt: brand.updatedAt,
    };
  }
}
