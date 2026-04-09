import { Controller, Delete, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { DeleteBrandUseCase } from '@/domain/use-cases/delete-brand';
import { Either } from '@/core/either';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { IdParamDto } from '../dtos/shared.dtos';

@ApiTags('Brands')
@Controller('/brands/:id')
export class DeleteBrandController {
  constructor(private readonly deleteBrandUseCase: DeleteBrandUseCase) {}

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a brand' })
  @ApiResponse({ status: 204 })
  async handle(@Param() params: IdParamDto) {
    const result = await this.deleteBrandUseCase.execute({ id: params.id });
    Either.throwsIfFail(result);
  }
}
