import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateCategoryUseCase } from '@/domain/use-cases/create-category';
import { Either } from '@/core/either';

type CreateCategoryBody = {
  name: string;
};

@Controller('/categories')
export class CreateCategoryController {
  constructor(private readonly createCategoryUseCase: CreateCategoryUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async handle(@Body() body: CreateCategoryBody) {
    const result = await this.createCategoryUseCase.execute(body);
    Either.throwsIfFail(result);

    return {
      category: {
        id: result.value.category.id,
        name: result.value.category.name,
        createdAt: result.value.category.createdAt,
        updatedAt: result.value.category.updatedAt,
      },
    };
  }
}
