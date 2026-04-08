import { Controller, Delete, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { DeleteCategoryUseCase } from '@/domain/use-cases/delete-category';
import { Either } from '@/core/either';

@Controller('/categories/:id')
export class DeleteCategoryController {
  constructor(private readonly deleteCategoryUseCase: DeleteCategoryUseCase) {}

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async handle(@Param('id') id: string) {
    const result = await this.deleteCategoryUseCase.execute({ id });
    Either.throwsIfFail(result);
  }
}
