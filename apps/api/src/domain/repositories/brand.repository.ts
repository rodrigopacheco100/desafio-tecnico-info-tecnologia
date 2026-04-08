import { Brand } from '../entities/brand';

export abstract class BrandRepository {
  abstract save(brand: Brand): Promise<void>;
  abstract findById(id: string): Promise<Brand | null>;
  abstract findByName(name: string): Promise<Brand | null>;
  abstract findAll(): Promise<Brand[]>;
  abstract delete(id: string): Promise<void>;
}
