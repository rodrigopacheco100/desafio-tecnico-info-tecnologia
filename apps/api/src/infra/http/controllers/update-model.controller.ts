import { Controller, HttpCode, HttpStatus, Put, Body, Param } from '@nestjs/common';
import { UpdateModelUseCase } from '@/domain/use-cases/update-model';
import { Either } from '@/core/either';
import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { IdParamDto } from '../dtos/shared.dtos';

const UpdateModelSchema = z.object({
  name: z.string().min(1).max(255),
  brandId: z.string().uuid(),
});

class UpdateModelDto extends createZodDto(UpdateModelSchema) {}

const ModelResponseSchema = z.object({
  model: z.object({
    id: z.string().uuid(),
    name: z.string(),
    brandId: z.string().uuid(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  }),
});

class ModelResponseDto extends createZodDto(ModelResponseSchema) {}

type ModelResponse = z.infer<typeof ModelResponseSchema>;

@ApiTags('Models')
@Controller('/models/:id')
export class UpdateModelController {
  constructor(private readonly updateModelUseCase: UpdateModelUseCase) {}

  @Put()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update a model' })
  @ApiResponse({ status: 200, type: ModelResponseDto })
  async handle(@Param() params: IdParamDto, @Body() body: UpdateModelDto): Promise<ModelResponse> {
    const result = await this.updateModelUseCase.execute({ id: params.id, ...body });
    Either.throwsIfFail(result);

    return {
      model: {
        id: result.value.model.id,
        name: result.value.model.name,
        brandId: result.value.model.brandId,
        createdAt: result.value.model.createdAt.toISOString(),
        updatedAt: result.value.model.updatedAt.toISOString(),
      },
    };
  }
}
