import { UseCase } from '@/core/use-case';
import { Either } from '@/core/either';
import { Injectable } from '@nestjs/common';
import { Category } from '../entities/category';
import { CategoryRepository } from '../repositories/category.repository';

type ListCategoriesOutput = {
  categories: Category[];
};

@Injectable()
export class ListCategoriesUseCase implements UseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute() {
    const categories = await this.categoryRepository.findAll();
    return Either.success<ListCategoriesOutput>({ categories });
  }
}
