import { Model } from '@/domain/entities/model';
import { models } from '../schemas/models.schema';

type ModelDb = typeof models.$inferSelect;

export class ModelMapper {
  static toDomain(dbModel: ModelDb): Model {
    return Model.from({
      id: dbModel.id,
      name: dbModel.name,
      brandId: dbModel.brandId,
      createdAt: dbModel.createdAt,
      updatedAt: dbModel.updatedAt,
    });
  }

  static toCreateOnDb(model: Model): typeof models.$inferInsert {
    return {
      id: model.id,
      name: model.name,
      brandId: model.brandId,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    };
  }

  static toUpdateOnDb(model: Model): WithoutId<TypedOmit<typeof models.$inferInsert, 'createdAt'>> {
    return {
      name: model.name,
      brandId: model.brandId,
      updatedAt: model.updatedAt,
    };
  }
}
