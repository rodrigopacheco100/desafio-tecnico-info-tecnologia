import { UseCase } from '@/core/use-case';
import { Either } from '@/core/either';
import { AppError } from '@/core/app-error';
import { Injectable } from '@nestjs/common';
import { ModelRepository } from '../repositories/model.repository';

type DeleteModelInput = {
  id: string;
};

type DeleteModelOutput = Record<string, never>;

@Injectable()
export class DeleteModelUseCase implements UseCase {
  constructor(private readonly modelRepository: ModelRepository) {}

  async execute(input: DeleteModelInput) {
    const model = await this.modelRepository.findById(input.id);

    if (!model) {
      return Either.fail(new AppError('Model not found'));
    }

    await this.modelRepository.delete(input.id);

    return Either.success<DeleteModelOutput>({});
  }
}
