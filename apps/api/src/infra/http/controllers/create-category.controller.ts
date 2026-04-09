import { Controller, HttpCode, HttpStatus, Post, Body } from '@nestjs/common';
import { CreateCategoryUseCase } from '@/domain/use-cases/create-category';
import { Either } from '@/core/either';
import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

const CreateCategorySchema = z.object({
  name: z.string().min(1).max(255),
});

class CreateCategoryDto extends createZodDto(CreateCategorySchema) {}

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
@Controller('/categories')
export class CreateCategoryController {
  constructor(private readonly createCategoryUseCase: CreateCategoryUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new category' })
  @ApiResponse({ status: 201, type: CategoryResponseDto })
  async handle(@Body() body: CreateCategoryDto): Promise<CategoryResponse> {
    const result = await this.createCategoryUseCase.execute(body);
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
