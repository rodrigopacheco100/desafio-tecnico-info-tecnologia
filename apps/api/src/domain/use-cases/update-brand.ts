import { UseCase } from '@/core/use-case';
import { Either } from '@/core/either';
import { Injectable } from '@nestjs/common';
import { Brand } from '../entities/brand';
import { BrandRepository } from '../repositories/brand.repository';
import { BrandNotFoundError } from '../errors/brand-not-found.error';
import { BrandNameAlreadyUsedError } from '../errors/brand-name-already-used.error';

type UpdateBrandInput = {
  id: string;
  name: string;
};

type UpdateBrandOutput = {
  brand: Brand;
};

@Injectable()
export class UpdateBrandUseCase implements UseCase {
  constructor(private readonly brandRepository: BrandRepository) {}

  async execute(input: UpdateBrandInput) {
    const brand = await this.brandRepository.findById(input.id);

    if (!brand) {
      return Either.fail(new BrandNotFoundError());
    }

    const nameAlreadyUsed = await this.brandRepository.findByName(input.name);
    if (nameAlreadyUsed && nameAlreadyUsed.id !== input.id) {
      return Either.fail(new BrandNameAlreadyUsedError());
    }

    brand.name = input.name;
    await this.brandRepository.save(brand);

    return Either.success<UpdateBrandOutput>({ brand });
  }
}
