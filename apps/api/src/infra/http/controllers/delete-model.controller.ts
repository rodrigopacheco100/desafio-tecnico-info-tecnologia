import { Controller, Delete, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { DeleteModelUseCase } from '@/domain/use-cases/delete-model';
import { Either } from '@/core/either';

@Controller('/models/:id')
export class DeleteModelController {
  constructor(private readonly deleteModelUseCase: DeleteModelUseCase) {}

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async handle(@Param('id') id: string) {
    const result = await this.deleteModelUseCase.execute({ id });
    Either.throwsIfFail(result);
  }
}
