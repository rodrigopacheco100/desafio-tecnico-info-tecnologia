import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateVehicleUseCase } from '@/domain/use-cases/create-vehicle';
import { Either } from '@/core/either';

type CreateVehicleBody = {
  plate: string;
  chassis: string;
  renavam: string;
  modelId: string;
  categoryId: string;
  year: number;
};

@Controller('/vehicles')
export class CreateVehicleController {
  constructor(private readonly createVehicleUseCase: CreateVehicleUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async handle(@Body() body: CreateVehicleBody) {
    const result = await this.createVehicleUseCase.execute(body);
    Either.throwsIfFail(result);

    return {
      vehicle: {
        id: result.value.vehicle.id,
        plate: result.value.vehicle.plate,
        chassis: result.value.vehicle.chassis,
        renavam: result.value.vehicle.renavam,
        modelId: result.value.vehicle.modelId,
        categoryId: result.value.vehicle.categoryId,
        year: result.value.vehicle.year,
        createdAt: result.value.vehicle.createdAt,
        updatedAt: result.value.vehicle.updatedAt,
      },
    };
  }
}
