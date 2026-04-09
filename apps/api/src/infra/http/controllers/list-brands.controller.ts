import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ListBrandsUseCase } from '@/domain/use-cases/list-brands';
import { Either } from '@/core/either';
import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

const BrandResponseSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

const ListBrandsResponseSchema = z.object({
  brands: z.array(BrandResponseSchema),
});

class ListBrandsResponseDto extends createZodDto(ListBrandsResponseSchema) {}

type ListBrandsResponse = z.infer<typeof ListBrandsResponseSchema>;

@ApiTags('Brands')
@Controller('/brands')
export class ListBrandsController {
  constructor(private readonly listBrandsUseCase: ListBrandsUseCase) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List all brands' })
  @ApiResponse({ status: 200, type: ListBrandsResponseDto })
  async handle(): Promise<ListBrandsResponse> {
    const result = await this.listBrandsUseCase.execute();
    Either.throwsIfFail(result);

    return {
      brands: result.value.brands.map((brand) => ({
        id: brand.id,
        name: brand.name,
        createdAt: brand.createdAt.toISOString(),
        updatedAt: brand.updatedAt.toISOString(),
      })),
    };
  }
}
