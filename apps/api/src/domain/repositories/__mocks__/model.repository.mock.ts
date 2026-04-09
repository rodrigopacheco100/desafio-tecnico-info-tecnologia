import { vi } from 'vitest';
import { Model, ModelProps } from '@/domain/entities/model';
import { ModelRepository } from '../model.repository';

type ModelOverride = Partial<Pick<ModelProps, 'name' | 'brandId'>>;

export const makeMockModel = (override?: ModelOverride): Model => {
  return Model.create({
    name: 'Corolla',
    brandId: 'brand-id-1',
    ...override,
  });
};

export const mockModelRepository: ModelRepository = {
  save: vi.fn(),
  findById: vi.fn(),
  findByName: vi.fn(),
  findByBrandId: vi.fn(),
  findAll: vi.fn(),
  delete: vi.fn(),
};
