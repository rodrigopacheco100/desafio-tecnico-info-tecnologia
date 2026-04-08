import { Body, Controller, HttpCode, HttpStatus, Param, Put } from '@nestjs/common';
import { UpdateCategoryUseCase } from '@/domain/use-cases/update-category';
import { Either } from '@/core/either';

type UpdateCategoryBody = {
  name: string;
};

@Controller('/categories/:id')
export class UpdateCategoryController {
  constructor(private readonly updateCategoryUseCase: UpdateCategoryUseCase) {}

  @Put()
  @HttpCode(HttpStatus.OK)
  async handle(@Param('id') id: string, @Body() body: UpdateCategoryBody) {
    const result = await this.updateCategoryUseCase.execute({ id, ...body });
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
