import { vi } from 'vitest';
import { Brand, BrandProps } from '@/domain/entities/brand';
import { BrandRepository } from '../brand.repository';

type BrandOverride = Partial<Pick<BrandProps, 'name'>>;

export const makeMockBrand = (override?: BrandOverride): Brand => {
  return Brand.create({
    name: 'Toyota',
    ...override,
  });
};

export const mockBrandRepository: BrandRepository = {
  save: vi.fn(),
  findById: vi.fn(),
  findByName: vi.fn(),
  findAll: vi.fn(),
  delete: vi.fn(),
};
