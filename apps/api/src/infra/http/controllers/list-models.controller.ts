import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ListModelsUseCase } from '@/domain/use-cases/list-models';
import { Either } from '@/core/either';
import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { ListModelsQueryDto } from '../dtos/shared.dtos';

const ModelResponseSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  brandId: z.string().uuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

const ListModelsResponseSchema = z.object({
  models: z.array(ModelResponseSchema),
});

class ListModelsResponseDto extends createZodDto(ListModelsResponseSchema) {}

type ListModelsResponse = z.infer<typeof ListModelsResponseSchema>;

@ApiTags('Models')
@Controller('/models')
export class ListModelsController {
  constructor(private readonly listModelsUseCase: ListModelsUseCase) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List all models' })
  @ApiQuery({ name: 'brandId', required: false, type: String })
  @ApiResponse({ status: 200, type: ListModelsResponseDto })
  async handle(@Query() query: ListModelsQueryDto): Promise<ListModelsResponse> {
    const result = await this.listModelsUseCase.execute({ brandId: query.brandId });
    Either.throwsIfFail(result);

    return {
      models: result.value.models.map((model) => ({
        id: model.id,
        name: model.name,
        brandId: model.brandId,
        createdAt: model.createdAt.toISOString(),
        updatedAt: model.updatedAt.toISOString(),
      })),
    };
  }
}
