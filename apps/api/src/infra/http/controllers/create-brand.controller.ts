import { Controller, HttpCode, HttpStatus, Post, Body } from '@nestjs/common';
import { CreateBrandUseCase } from '@/domain/use-cases/create-brand';
import { Either } from '@/core/either';
import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

const CreateBrandSchema = z.object({
  name: z.string().min(1).max(255),
});

class CreateBrandDto extends createZodDto(CreateBrandSchema) {}

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
@Controller('/brands')
export class CreateBrandController {
  constructor(private readonly createBrandUseCase: CreateBrandUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new brand' })
  @ApiResponse({ status: 201, type: BrandResponseDto })
  async handle(@Body() body: CreateBrandDto): Promise<BrandResponse> {
    const result = await this.createBrandUseCase.execute(body);
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
