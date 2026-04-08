import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ListCategoriesUseCase } from '@/domain/use-cases/list-categories';
import { Either } from '@/core/either';

@Controller('/categories')
export class ListCategoriesController {
  constructor(private readonly listCategoriesUseCase: ListCategoriesUseCase) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async handle() {
    const result = await this.listCategoriesUseCase.execute();
    Either.throwsIfFail(result);

    return {
      categories: result.value.categories.map((category) => ({
        id: category.id,
        name: category.name,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
      })),
    };
  }
}
