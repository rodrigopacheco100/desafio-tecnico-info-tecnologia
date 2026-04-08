import { Controller, Delete, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { DeleteBrandUseCase } from '@/domain/use-cases/delete-brand';
import { Either } from '@/core/either';

@Controller('/brands/:id')
export class DeleteBrandController {
  constructor(private readonly deleteBrandUseCase: DeleteBrandUseCase) {}

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async handle(@Param('id') id: string) {
    const result = await this.deleteBrandUseCase.execute({ id });
    Either.throwsIfFail(result);
  }
}
