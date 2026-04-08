import { Model } from '../entities/model';

export abstract class ModelRepository {
  abstract save(model: Model): Promise<void>;
  abstract findById(id: string): Promise<Model | null>;
  abstract findByName(name: string): Promise<Model | null>;
  abstract findByBrandId(brandId: string): Promise<Model[]>;
  abstract findAll(): Promise<Model[]>;
  abstract delete(id: string): Promise<void>;
}
