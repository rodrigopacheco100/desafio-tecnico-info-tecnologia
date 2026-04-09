import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ListCategoriesUseCase } from '@/domain/use-cases/list-categories';
import { Either } from '@/core/either';
import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

const CategoryResponseSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

const ListCategoriesResponseSchema = z.object({
  categories: z.array(CategoryResponseSchema),
});

class ListCategoriesResponseDto extends createZodDto(ListCategoriesResponseSchema) {}

type ListCategoriesResponse = z.infer<typeof ListCategoriesResponseSchema>;

@ApiTags('Categories')
@Controller('/categories')
export class ListCategoriesController {
  constructor(private readonly listCategoriesUseCase: ListCategoriesUseCase) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List all categories' })
  @ApiResponse({ status: 200, type: ListCategoriesResponseDto })
  async handle(): Promise<ListCategoriesResponse> {
    const result = await this.listCategoriesUseCase.execute();
    Either.throwsIfFail(result);

    return {
      categories: result.value.categories.map((category) => ({
        id: category.id,
        name: category.name,
        createdAt: category.createdAt.toISOString(),
        updatedAt: category.updatedAt.toISOString(),
      })),
    };
  }
}
