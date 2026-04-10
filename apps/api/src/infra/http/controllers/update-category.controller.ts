import { Controller, HttpCode, HttpStatus, Put, Body, Param } from '@nestjs/common';
import { UpdateCategoryUseCase } from '@/domain/use-cases/update-category';
import { Either } from '@/core/either';
import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { IdParamDto } from '../dtos/shared.dtos';

const UpdateCategorySchema = z.object({
  name: z.string().min(1).max(255).optional(),
});

class UpdateCategoryDto extends createZodDto(UpdateCategorySchema) {}

const CategoryResponseSchema = z.object({
  category: z.object({
    id: z.string().uuid(),
    name: z.string(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  }),
});

class CategoryResponseDto extends createZodDto(CategoryResponseSchema) {}

type CategoryResponse = z.infer<typeof CategoryResponseSchema>;

@ApiTags('Categories')
@Controller('/categories/:id')
export class UpdateCategoryController {
  constructor(private readonly updateCategoryUseCase: UpdateCategoryUseCase) {}

  @Put()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update a category' })
  @ApiResponse({ status: 200, type: CategoryResponseDto })
  async handle(
    @Param() params: IdParamDto,
    @Body() body: UpdateCategoryDto,
  ): Promise<CategoryResponse> {
    const result = await this.updateCategoryUseCase.execute({ id: params.id, ...body });
    Either.throwsIfFail(result);

    return {
      category: {
        id: result.value.category.id,
        name: result.value.category.name,
        createdAt: result.value.category.createdAt.toISOString(),
        updatedAt: result.value.category.updatedAt.toISOString(),
      },
    };
  }
}
