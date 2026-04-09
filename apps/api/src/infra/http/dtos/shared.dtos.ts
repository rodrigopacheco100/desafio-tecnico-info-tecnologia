import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const PaginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  quantityPerPage: z.coerce.number().int().positive().max(100).default(10),
});

export class PaginationDto extends createZodDto(PaginationSchema) {}

export const IdParamSchema = z.object({
  id: z.string().uuid(),
});

export class IdParamDto extends createZodDto(IdParamSchema) {}

export const ListModelsQuerySchema = z.object({
  brandId: z.string().uuid().optional(),
});

export class ListModelsQueryDto extends createZodDto(ListModelsQuerySchema) {}
