import { Controller, HttpCode, HttpStatus, Post, Body } from '@nestjs/common';
import { CreateVehicleUseCase } from '@/domain/use-cases/create-vehicle';
import { Either } from '@/core/either';
import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

const CreateVehicleSchema = z.object({
  plate: z.string().regex(/^[A-Z]{3}-[A-Z0-9]{4}$/),
  chassis: z.string().regex(/^[A-Za-z0-9]{17}$/),
  renavam: z.string().regex(/^[0-9]{11}$/),
  modelId: z.string().uuid(),
  categoryId: z.string().uuid(),
  year: z
    .number()
    .int()
    .min(1900)
    .max(new Date().getFullYear() + 1)
    .meta({ example: new Date().getFullYear() }),
});

class CreateVehicleDto extends createZodDto(CreateVehicleSchema) {}

const VehicleResponseSchema = z.object({
  vehicle: z.object({
    id: z.string().uuid(),
    plate: z.string().regex(/^[A-Z]{3}-[A-Z0-9]{4}$/),
    chassis: z.string().regex(/^[A-Za-z0-9]{17}$/),
    renavam: z.string().regex(/^[0-9]{11}$/),
    modelId: z.string().uuid(),
    categoryId: z.string().uuid(),
    year: z.number().int().min(1900).max(new Date().getFullYear() + 1).meta({ example: new Date().getFullYear() }),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  }),
});

class VehicleResponseDto extends createZodDto(VehicleResponseSchema) {}

type VehicleResponse = z.infer<typeof VehicleResponseSchema>;

@ApiTags('Vehicles')
@Controller('/vehicles')
export class CreateVehicleController {
  constructor(private readonly createVehicleUseCase: CreateVehicleUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new vehicle' })
  @ApiResponse({ status: 201, type: VehicleResponseDto })
  async handle(@Body() body: CreateVehicleDto): Promise<VehicleResponse> {
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
        createdAt: result.value.vehicle.createdAt.toISOString(),
        updatedAt: result.value.vehicle.updatedAt.toISOString(),
      },
    };
  }
}
