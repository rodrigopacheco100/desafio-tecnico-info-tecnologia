import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateBrandUseCase } from '@/domain/use-cases/create-brand';
import { Either } from '@/core/either';

type CreateBrandBody = {
  name: string;
};

@Controller('/brands')
export class CreateBrandController {
  constructor(private readonly createBrandUseCase: CreateBrandUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async handle(@Body() body: CreateBrandBody) {
    const result = await this.createBrandUseCase.execute(body);
    Either.throwsIfFail(result);

    return {
      brand: {
        id: result.value.brand.id,
        name: result.value.brand.name,
        createdAt: result.value.brand.createdAt,
        updatedAt: result.value.brand.updatedAt,
      },
    };
  }
}
