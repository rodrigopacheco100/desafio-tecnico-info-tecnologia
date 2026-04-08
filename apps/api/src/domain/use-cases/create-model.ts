import { UseCase } from '@/core/use-case';
import { Either } from '@/core/either';
import { AppError } from '@/core/app-error';
import { Injectable } from '@nestjs/common';
import { Model } from '../entities/model';
import { ModelRepository } from '../repositories/model.repository';
import { BrandRepository } from '../repositories/brand.repository';

type CreateModelInput = {
  name: string;
  brandId: string;
};

type CreateModelOutput = {
  model: Model;
};

@Injectable()
export class CreateModelUseCase implements UseCase {
  constructor(
    private readonly modelRepository: ModelRepository,
    private readonly brandRepository: BrandRepository,
  ) {}

  async execute(input: CreateModelInput) {
    const brand = await this.brandRepository.findById(input.brandId);
    if (!brand) {
      return Either.fail(new AppError('Brand not found'));
    }

    const nameAlreadyUsed = await this.modelRepository.findByName(input.name);
    if (nameAlreadyUsed) {
      return Either.fail(new AppError('Model name already used'));
    }

    const model = Model.create({ name: input.name, brandId: input.brandId });
    await this.modelRepository.save(model);

    return Either.success<CreateModelOutput>({ model });
  }
}
