import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ListVehiclesUseCase } from '@/domain/use-cases/list-vehicles';
import { Either } from '@/core/either';
import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { PaginationDto } from '../dtos/shared.dtos';

const VehicleResponseSchema = z.object({
  id: z.string().uuid(),
  plate: z.string(),
  chassis: z.string(),
  renavam: z.string(),
  modelId: z.string().uuid(),
  categoryId: z.string().uuid(),
  year: z.number().int().meta({ example: new Date().getFullYear() }),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

const ListVehiclesResponseSchema = z.object({
  vehicles: z.array(VehicleResponseSchema),
  totalCount: z.number().int().meta({ example: 10 }),
  amountOfPages: z.number().int().meta({ example: 2 }),
});

class ListVehiclesResponseDto extends createZodDto(ListVehiclesResponseSchema) {}

type ListVehiclesResponse = z.infer<typeof ListVehiclesResponseSchema>;

@ApiTags('Vehicles')
@Controller('/vehicles')
export class ListVehiclesController {
  constructor(private readonly listVehiclesUseCase: ListVehiclesUseCase) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List all vehicles with pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'quantityPerPage', required: false, type: Number })
  @ApiResponse({ status: 200, type: ListVehiclesResponseDto })
  async handle(@Query() pagination: PaginationDto): Promise<ListVehiclesResponse> {
    const result = await this.listVehiclesUseCase.execute({
      pagination: {
        page: pagination.page,
        quantityPerPage: pagination.quantityPerPage,
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
        createdAt: vehicle.createdAt.toISOString(),
        updatedAt: vehicle.updatedAt.toISOString(),
      })),
      totalCount: result.value.totalCount,
      amountOfPages: result.value.amountOfPages,
    };
  }
}
