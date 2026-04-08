import { Controller, Delete, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { DeleteVehicleUseCase } from '@/domain/use-cases/delete-vehicle';
import { Either } from '@/core/either';

@Controller('/vehicles/:id')
export class DeleteVehicleController {
  constructor(private readonly deleteVehicleUseCase: DeleteVehicleUseCase) {}

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async handle(@Param('id') id: string) {
    const result = await this.deleteVehicleUseCase.execute({ id });
    Either.throwsIfFail(result);
  }
}
