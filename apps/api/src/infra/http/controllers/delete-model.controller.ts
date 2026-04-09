import { Controller, Delete, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { DeleteModelUseCase } from '@/domain/use-cases/delete-model';
import { Either } from '@/core/either';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { IdParamDto } from '../dtos/shared.dtos';

@ApiTags('Models')
@Controller('/models/:id')
export class DeleteModelController {
  constructor(private readonly deleteModelUseCase: DeleteModelUseCase) {}

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a model' })
  @ApiResponse({ status: 204 })
  async handle(@Param() params: IdParamDto) {
    const result = await this.deleteModelUseCase.execute({ id: params.id });
    Either.throwsIfFail(result);
  }
}
