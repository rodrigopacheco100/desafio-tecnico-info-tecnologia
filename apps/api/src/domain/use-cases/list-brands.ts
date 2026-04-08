import { UseCase } from '@/core/use-case';
import { Either } from '@/core/either';
import { Injectable } from '@nestjs/common';
import { Brand } from '../entities/brand';
import { BrandRepository } from '../repositories/brand.repository';

type ListBrandsOutput = {
  brands: Brand[];
};

@Injectable()
export class ListBrandsUseCase implements UseCase {
  constructor(private readonly brandRepository: BrandRepository) {}

  async execute() {
    const brands = await this.brandRepository.findAll();
    return Either.success<ListBrandsOutput>({ brands });
  }
}
