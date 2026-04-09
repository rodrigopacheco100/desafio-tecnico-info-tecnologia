import { Controller, HttpCode, HttpStatus, Post, Body } from '@nestjs/common';
import { CreateModelUseCase } from '@/domain/use-cases/create-model';
import { Either } from '@/core/either';
import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

const CreateModelSchema = z.object({
  name: z.string().min(1).max(255),
  brandId: z.string().uuid(),
});

class CreateModelDto extends createZodDto(CreateModelSchema) {}

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
@Controller('/models')
export class CreateModelController {
  constructor(private readonly createModelUseCase: CreateModelUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new model' })
  @ApiResponse({ status: 201, type: ModelResponseDto })
  async handle(@Body() body: CreateModelDto): Promise<ModelResponse> {
    const result = await this.createModelUseCase.execute(body);
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
