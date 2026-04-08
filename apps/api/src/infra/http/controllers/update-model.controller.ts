import { Body, Controller, HttpCode, HttpStatus, Param, Put } from '@nestjs/common';
import { UpdateModelUseCase } from '@/domain/use-cases/update-model';
import { Either } from '@/core/either';

type UpdateModelBody = {
  name: string;
  brandId: string;
};

@Controller('/models/:id')
export class UpdateModelController {
  constructor(private readonly updateModelUseCase: UpdateModelUseCase) {}

  @Put()
  @HttpCode(HttpStatus.OK)
  async handle(@Param('id') id: string, @Body() body: UpdateModelBody) {
    const result = await this.updateModelUseCase.execute({ id, ...body });
    Either.throwsIfFail(result);

    return {
      model: {
        id: result.value.model.id,
        name: result.value.model.name,
        brandId: result.value.model.brandId,
        createdAt: result.value.model.createdAt,
        updatedAt: result.value.model.updatedAt,
      },
    };
  }
}
