import { Controller, HttpCode, HttpStatus, Put, Body, Param } from '@nestjs/common';
import { UpdateBrandUseCase } from '@/domain/use-cases/update-brand';
import { Either } from '@/core/either';
import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { IdParamDto } from '../dtos/shared.dtos';

const UpdateBrandSchema = z.object({
  name: z.string().min(1).max(255),
});

class UpdateBrandDto extends createZodDto(UpdateBrandSchema) {}

const BrandResponseSchema = z.object({
  brand: z.object({
    id: z.string().uuid(),
    name: z.string(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  }),
});

class BrandResponseDto extends createZodDto(BrandResponseSchema) {}

type BrandResponse = z.infer<typeof BrandResponseSchema>;

@ApiTags('Brands')
@Controller('/brands/:id')
export class UpdateBrandController {
  constructor(private readonly updateBrandUseCase: UpdateBrandUseCase) {}

  @Put()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update a brand' })
  @ApiResponse({ status: 200, type: BrandResponseDto })
  async handle(@Param() params: IdParamDto, @Body() body: UpdateBrandDto): Promise<BrandResponse> {
    const result = await this.updateBrandUseCase.execute({ id: params.id, ...body });
    Either.throwsIfFail(result);

    return {
      brand: {
        id: result.value.brand.id,
        name: result.value.brand.name,
        createdAt: result.value.brand.createdAt.toISOString(),
        updatedAt: result.value.brand.updatedAt.toISOString(),
      },
    };
  }
}
