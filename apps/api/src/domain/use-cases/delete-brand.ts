import { UseCase } from '@/core/use-case';
import { Either } from '@/core/either';
import { Injectable } from '@nestjs/common';
import { BrandRepository } from '../repositories/brand.repository';
import { BrandNotFoundError } from '../errors/brand-not-found.error';

type DeleteBrandInput = {
  id: string;
};

type DeleteBrandOutput = Record<string, never>;

@Injectable()
export class DeleteBrandUseCase implements UseCase {
  constructor(private readonly brandRepository: BrandRepository) {}

  async execute(input: DeleteBrandInput) {
    const brand = await this.brandRepository.findById(input.id);

    if (!brand) {
      return Either.fail(new BrandNotFoundError());
    }

    await this.brandRepository.delete(input.id);

    return Either.success<DeleteBrandOutput>({});
  }
}
