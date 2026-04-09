import { Controller, Delete, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { DeleteVehicleUseCase } from '@/domain/use-cases/delete-vehicle';
import { Either } from '@/core/either';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { IdParamDto } from '../dtos/shared.dtos';

@ApiTags('Vehicles')
@Controller('/vehicles/:id')
export class DeleteVehicleController {
  constructor(private readonly deleteVehicleUseCase: DeleteVehicleUseCase) {}

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a vehicle' })
  @ApiResponse({ status: 204, description: 'Vehicle deleted successfully' })
  async handle(@Param() params: IdParamDto) {
    const result = await this.deleteVehicleUseCase.execute({ id: params.id });
    Either.throwsIfFail(result);
  }
}
