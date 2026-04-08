import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ListBrandsUseCase } from '@/domain/use-cases/list-brands';
import { Either } from '@/core/either';

@Controller('/brands')
export class ListBrandsController {
  constructor(private readonly listBrandsUseCase: ListBrandsUseCase) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async handle() {
    const result = await this.listBrandsUseCase.execute();
    Either.throwsIfFail(result);

    return {
      brands: result.value.brands.map((brand) => ({
        id: brand.id,
        name: brand.name,
        createdAt: brand.createdAt,
        updatedAt: brand.updatedAt,
      })),
    };
  }
}
