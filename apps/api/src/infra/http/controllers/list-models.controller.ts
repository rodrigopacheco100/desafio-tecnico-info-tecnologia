import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ListModelsUseCase } from '@/domain/use-cases/list-models';
import { Either } from '@/core/either';

@Controller('/models')
export class ListModelsController {
  constructor(private readonly listModelsUseCase: ListModelsUseCase) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async handle(@Query('brandId') brandId?: string) {
    const result = await this.listModelsUseCase.execute({ brandId });
    Either.throwsIfFail(result);

    return {
      models: result.value.models.map((model) => ({
        id: model.id,
        name: model.name,
        brandId: model.brandId,
        createdAt: model.createdAt,
        updatedAt: model.updatedAt,
      })),
    };
  }
}
