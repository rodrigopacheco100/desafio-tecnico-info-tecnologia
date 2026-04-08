import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateModelUseCase } from '@/domain/use-cases/create-model';
import { Either } from '@/core/either';

type CreateModelBody = {
  name: string;
  brandId: string;
};

@Controller('/models')
export class CreateModelController {
  constructor(private readonly createModelUseCase: CreateModelUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async handle(@Body() body: CreateModelBody) {
    const result = await this.createModelUseCase.execute(body);
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
