import { UseCase } from '@/core/use-case';
import { Either } from '@/core/either';
import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../repositories/category.repository';
import { CategoryNotFoundError } from '../errors/category-not-found.error';

type DeleteCategoryInput = {
  id: string;
};

type DeleteCategoryOutput = Record<string, never>;

@Injectable()
export class DeleteCategoryUseCase implements UseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(input: DeleteCategoryInput) {
    const category = await this.categoryRepository.findById(input.id);

    if (!category) {
      return Either.fail(new CategoryNotFoundError());
    }

    await this.categoryRepository.delete(input.id);

    return Either.success<DeleteCategoryOutput>({});
  }
}
