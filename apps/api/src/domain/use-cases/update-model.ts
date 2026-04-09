import { UseCase } from '@/core/use-case';
import { Either } from '@/core/either';
import { Injectable } from '@nestjs/common';
import { Model } from '../entities/model';
import { ModelRepository } from '../repositories/model.repository';
import { BrandRepository } from '../repositories/brand.repository';
import { ModelNotFoundError } from '../errors/model-not-found.error';
import { ModelBrandNotFoundError } from '../errors/model-brand-not-found.error';
import { ModelNameAlreadyUsedError } from '../errors/model-name-already-used.error';

type UpdateModelInput = {
  id: string;
  name: string;
  brandId: string;
};

type UpdateModelOutput = {
  model: Model;
};

@Injectable()
export class UpdateModelUseCase implements UseCase {
  constructor(
    private readonly modelRepository: ModelRepository,
    private readonly brandRepository: BrandRepository,
  ) {}

  async execute(input: UpdateModelInput) {
    const model = await this.modelRepository.findById(input.id);
    if (!model) {
      return Either.fail(new ModelNotFoundError());
    }

    const brand = await this.brandRepository.findById(input.brandId);
    if (!brand) {
      return Either.fail(new ModelBrandNotFoundError());
    }

    const nameAlreadyUsed = await this.modelRepository.findByName(input.name);
    if (nameAlreadyUsed && nameAlreadyUsed.id !== input.id) {
      return Either.fail(new ModelNameAlreadyUsedError());
    }

    model.name = input.name;
    model.brandId = input.brandId;
    await this.modelRepository.save(model);

    return Either.success<UpdateModelOutput>({ model });
  }
}
