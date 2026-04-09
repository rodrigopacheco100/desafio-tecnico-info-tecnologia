import { UseCase } from '@/core/use-case';
import { Either } from '@/core/either';
import { Injectable } from '@nestjs/common';
import { Category } from '../entities/category';
import { CategoryRepository } from '../repositories/category.repository';
import { CategoryNameAlreadyUsedError } from '../errors/category-name-already-used.error';

type CreateCategoryInput = {
  name: string;
};

type CreateCategoryOutput = {
  category: Category;
};

@Injectable()
export class CreateCategoryUseCase implements UseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(input: CreateCategoryInput) {
    const nameAlreadyUsed = await this.categoryRepository.findByName(input.name);

    if (nameAlreadyUsed) {
      return Either.fail(new CategoryNameAlreadyUsedError());
    }

    const category = Category.create({ name: input.name });
    await this.categoryRepository.save(category);

    return Either.success<CreateCategoryOutput>({ category });
  }
}
