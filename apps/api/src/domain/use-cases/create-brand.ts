import { UseCase } from '@/core/use-case';
import { Either } from '@/core/either';
import { AppError } from '@/core/app-error';
import { Injectable } from '@nestjs/common';
import { Brand } from '../entities/brand';
import { BrandRepository } from '../repositories/brand.repository';

type CreateBrandInput = {
  name: string;
};

type CreateBrandOutput = {
  brand: Brand;
};

@Injectable()
export class CreateBrandUseCase implements UseCase {
  constructor(private readonly brandRepository: BrandRepository) {}

  async execute(input: CreateBrandInput) {
    const nameAlreadyUsed = await this.brandRepository.findByName(input.name);

    if (nameAlreadyUsed) {
      return Either.fail(new AppError('Brand name already used'));
    }

    const brand = Brand.create({ name: input.name });
    await this.brandRepository.save(brand);

    return Either.success<CreateBrandOutput>({ brand });
  }
}
