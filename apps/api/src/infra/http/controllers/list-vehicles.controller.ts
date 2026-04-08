import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ListVehiclesUseCase } from '@/domain/use-cases/list-vehicles';
import { Either } from '@/core/either';

@Controller('/vehicles')
export class ListVehiclesController {
  constructor(private readonly listVehiclesUseCase: ListVehiclesUseCase) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async handle(@Query('page') page?: string, @Query('quantityPerPage') quantityPerPage?: string) {
    const result = await this.listVehiclesUseCase.execute({
      pagination: {
        page: page ? Number(page) : 1,
        quantityPerPage: quantityPerPage ? Number(quantityPerPage) : 10,
      },
    });
    Either.throwsIfFail(result);

    return {
      vehicles: result.value.data.map((vehicle) => ({
        id: vehicle.id,
        plate: vehicle.plate,
        chassis: vehicle.chassis,
        renavam: vehicle.renavam,
        modelId: vehicle.modelId,
        categoryId: vehicle.categoryId,
        year: vehicle.year,
        createdAt: vehicle.createdAt,
        updatedAt: vehicle.updatedAt,
      })),
      totalCount: result.value.totalCount,
      amountOfPages: result.value.amountOfPages,
    };
  }
}
