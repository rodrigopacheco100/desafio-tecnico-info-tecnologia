import { UseCase } from '@/core/use-case';
import { Either } from '@/core/either';
import { Injectable } from '@nestjs/common';
import { Model } from '../entities/model';
import { ModelRepository } from '../repositories/model.repository';

type ListModelsInput = {
  brandId?: string;
};

type ListModelsOutput = {
  models: Model[];
};

@Injectable()
export class ListModelsUseCase implements UseCase {
  constructor(private readonly modelRepository: ModelRepository) {}

  async execute(input: ListModelsInput = {}) {
    const models = input.brandId
      ? await this.modelRepository.findByBrandId(input.brandId)
      : await this.modelRepository.findAll();

    return Either.success<ListModelsOutput>({ models });
  }
}
