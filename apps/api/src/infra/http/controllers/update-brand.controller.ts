import { Body, Controller, HttpCode, HttpStatus, Param, Put } from '@nestjs/common';
import { UpdateBrandUseCase } from '@/domain/use-cases/update-brand';
import { Either } from '@/core/either';

type UpdateBrandBody = {
  name: string;
};

@Controller('/brands/:id')
export class UpdateBrandController {
  constructor(private readonly updateBrandUseCase: UpdateBrandUseCase) {}

  @Put()
  @HttpCode(HttpStatus.OK)
  async handle(@Param('id') id: string, @Body() body: UpdateBrandBody) {
    const result = await this.updateBrandUseCase.execute({ id, ...body });
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
