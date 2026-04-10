import { Controller, HttpCode, HttpStatus, Put, Body, Param } from '@nestjs/common';
import { UpdateVehicleUseCase } from '@/domain/use-cases/update-vehicle';
import { Either } from '@/core/either';
import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { IdParamDto } from '../dtos/shared.dtos';

const UpdateVehicleSchema = z.object({
  plate: z.string().min(1).max(20).optional(),
  chassis: z.string().min(1).max(50).optional(),
  renavam: z.string().min(1).max(20).optional(),
  modelId: z.string().uuid().optional(),
  categoryId: z.string().uuid().optional(),
  year: z
    .number()
    .int()
    .min(1900)
    .max(new Date().getFullYear() + 1)
    .optional(),
});

class UpdateVehicleDto extends createZodDto(UpdateVehicleSchema) {}

const VehicleResponseSchema = z.object({
  vehicle: z.object({
    id: z.string().uuid(),
    plate: z.string(),
    chassis: z.string(),
    renavam: z.string(),
    modelId: z.string().uuid(),
    categoryId: z.string().uuid(),
    year: z.number().int(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  }),
});

class VehicleResponseDto extends createZodDto(VehicleResponseSchema) {}

type VehicleResponse = z.infer<typeof VehicleResponseSchema>;

@ApiTags('Vehicles')
@Controller('/vehicles/:id')
export class UpdateVehicleController {
  constructor(private readonly updateVehicleUseCase: UpdateVehicleUseCase) {}

  @Put()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update a vehicle' })
  @ApiResponse({ status: 200, type: VehicleResponseDto })
  async handle(
    @Param() params: IdParamDto,
    @Body() body: UpdateVehicleDto,
  ): Promise<VehicleResponse> {
    const result = await this.updateVehicleUseCase.execute({ id: params.id, ...body });
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
        createdAt: result.value.vehicle.createdAt.toISOString(),
        updatedAt: result.value.vehicle.updatedAt.toISOString(),
      },
    };
  }
}
