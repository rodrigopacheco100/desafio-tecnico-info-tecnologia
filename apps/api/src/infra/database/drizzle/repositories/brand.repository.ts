import { BrandRepository } from '@/domain/repositories/brand.repository';
import { Brand } from '@/domain/entities/brand';
import { Injectable } from '@nestjs/common';
import { brands } from '../schemas/brands.schema';
import { BrandMapper } from '../mappers/brand.mapper';
import { DrizzleDB } from '../connection/drizzle';
import { eq } from 'drizzle-orm';

@Injectable()
export class DrizzleBrandRepository implements BrandRepository {
  constructor(private readonly drizzle: DrizzleDB) {}

  async save(brand: Brand): Promise<void> {
    await this.drizzle.connection
      .insert(brands)
      .values(BrandMapper.toCreateOnDb(brand))
      .onConflictDoUpdate({
        target: brands.id,
        set: BrandMapper.toUpdateOnDb(brand),
      });
  }

  async findById(id: string): Promise<Brand | null> {
    const brand = await this.drizzle.connection.query.brands.findFirst({
      where: eq(brands.id, id),
    });
    return brand ? BrandMapper.toDomain(brand) : null;
  }

  async findByName(name: string): Promise<Brand | null> {
    const brand = await this.drizzle.connection.query.brands.findFirst({
      where: eq(brands.name, name),
    });
    return brand ? BrandMapper.toDomain(brand) : null;
  }

  async findAll(): Promise<Brand[]> {
    const allBrands = await this.drizzle.connection.query.brands.findMany();
    return allBrands.map(BrandMapper.toDomain);
  }

  async delete(id: string): Promise<void> {
    await this.drizzle.connection.delete(brands).where(eq(brands.id, id));
  }
}
