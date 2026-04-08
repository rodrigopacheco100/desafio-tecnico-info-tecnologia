import { UseCase } from '@/core/use-case';
import { Either } from '@/core/either';
import { AppError } from '@/core/app-error';
import { Injectable } from '@nestjs/common';
import { Category } from '../entities/category';
import { CategoryRepository } from '../repositories/category.repository';

type UpdateCategoryInput = {
  id: string;
  name: string;
};

type UpdateCategoryOutput = {
  category: Category;
};

@Injectable()
export class UpdateCategoryUseCase implements UseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(input: UpdateCategoryInput) {
    const category = await this.categoryRepository.findById(input.id);

    if (!category) {
      return Either.fail(new AppError('Category not found'));
    }

    const nameAlreadyUsed = await this.categoryRepository.findByName(input.name);
    if (nameAlreadyUsed && nameAlreadyUsed.id !== input.id) {
      return Either.fail(new AppError('Category name already used'));
    }

    category.name = input.name;
    await this.categoryRepository.save(category);

    return Either.success<UpdateCategoryOutput>({ category });
  }
}
