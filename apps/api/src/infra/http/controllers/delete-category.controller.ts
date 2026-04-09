import { Controller, Delete, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { DeleteCategoryUseCase } from '@/domain/use-cases/delete-category';
import { Either } from '@/core/either';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { IdParamDto } from '../dtos/shared.dtos';

@ApiTags('Categories')
@Controller('/categories/:id')
export class DeleteCategoryController {
  constructor(private readonly deleteCategoryUseCase: DeleteCategoryUseCase) {}

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a category' })
  @ApiResponse({ status: 204, description: 'Category deleted successfully' })
  async handle(@Param() params: IdParamDto) {
    const result = await this.deleteCategoryUseCase.execute({ id: params.id });
    Either.throwsIfFail(result);
  }
}
