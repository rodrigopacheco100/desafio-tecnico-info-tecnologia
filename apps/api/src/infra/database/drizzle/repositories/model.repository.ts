import { ModelRepository } from '@/domain/repositories/model.repository';
import { Model } from '@/domain/entities/model';
import { Injectable } from '@nestjs/common';
import { models } from '../schemas/models.schema';
import { ModelMapper } from '../mappers/model.mapper';
import { DrizzleDB } from '../connection/drizzle';
import { eq } from 'drizzle-orm';

@Injectable()
export class DrizzleModelRepository implements ModelRepository {
  constructor(private readonly drizzle: DrizzleDB) {}

  async save(model: Model): Promise<void> {
    await this.drizzle.connection
      .insert(models)
      .values(ModelMapper.toCreateOnDb(model))
      .onConflictDoUpdate({
        target: models.id,
        set: ModelMapper.toUpdateOnDb(model),
      });
  }

  async findById(id: string): Promise<Model | null> {
    const model = await this.drizzle.connection.query.models.findFirst({
      where: eq(models.id, id),
    });
    return model ? ModelMapper.toDomain(model) : null;
  }

  async findByName(name: string): Promise<Model | null> {
    const model = await this.drizzle.connection.query.models.findFirst({
      where: eq(models.name, name),
    });
    return model ? ModelMapper.toDomain(model) : null;
  }

  async findByBrandId(brandId: string): Promise<Model[]> {
    const allModels = await this.drizzle.connection.query.models.findMany({
      where: eq(models.brandId, brandId),
    });
    return allModels.map(ModelMapper.toDomain);
  }

  async findAll(): Promise<Model[]> {
    const allModels = await this.drizzle.connection.query.models.findMany();
    return allModels.map(ModelMapper.toDomain);
  }

  async delete(id: string): Promise<void> {
    await this.drizzle.connection.delete(models).where(eq(models.id, id));
  }
}
