import { Body, Controller, HttpCode, HttpStatus, Param, Put } from '@nestjs/common';
import { UpdateVehicleUseCase } from '@/domain/use-cases/update-vehicle';
import { Either } from '@/core/either';

type UpdateVehicleBody = {
  plate: string;
  chassis: string;
  renavam: string;
  modelId: string;
  categoryId: string;
  year: number;
};

@Controller('/vehicles/:id')
export class UpdateVehicleController {
  constructor(private readonly updateVehicleUseCase: UpdateVehicleUseCase) {}

  @Put()
  @HttpCode(HttpStatus.OK)
  async handle(@Param('id') id: string, @Body() body: UpdateVehicleBody) {
    const result = await this.updateVehicleUseCase.execute({ id, ...body });
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
