import { Module } from '@nestjs/common';
import { SignUpController } from './controllers/sign-up.controller';
import { SignInController } from './controllers/sign-in.controller';
import { CreateBrandController } from './controllers/create-brand.controller';
import { ListBrandsController } from './controllers/list-brands.controller';
import { UpdateBrandController } from './controllers/update-brand.controller';
import { DeleteBrandController } from './controllers/delete-brand.controller';
import { CreateModelController } from './controllers/create-model.controller';
import { ListModelsController } from './controllers/list-models.controller';
import { UpdateModelController } from './controllers/update-model.controller';
import { DeleteModelController } from './controllers/delete-model.controller';
import { CreateVehicleController } from './controllers/create-vehicle.controller';
import { ListVehiclesController } from './controllers/list-vehicles.controller';
import { UpdateVehicleController } from './controllers/update-vehicle.controller';
import { DeleteVehicleController } from './controllers/delete-vehicle.controller';
import { CreateCategoryController } from './controllers/create-category.controller';
import { ListCategoriesController } from './controllers/list-categories.controller';
import { UpdateCategoryController } from './controllers/update-category.controller';
import { DeleteCategoryController } from './controllers/delete-category.controller';
import { AuthModule } from '../auth/auth.module';
import { CreateUserUseCase } from '@/domain/use-cases/create-user';
import { AuthenticateUserUseCase } from '@/domain/use-cases/authenticate-user';
import { CreateBrandUseCase } from '@/domain/use-cases/create-brand';
import { ListBrandsUseCase } from '@/domain/use-cases/list-brands';
import { UpdateBrandUseCase } from '@/domain/use-cases/update-brand';
import { DeleteBrandUseCase } from '@/domain/use-cases/delete-brand';
import { CreateModelUseCase } from '@/domain/use-cases/create-model';
import { ListModelsUseCase } from '@/domain/use-cases/list-models';
import { UpdateModelUseCase } from '@/domain/use-cases/update-model';
import { DeleteModelUseCase } from '@/domain/use-cases/delete-model';
import { CreateVehicleUseCase } from '@/domain/use-cases/create-vehicle';
import { ListVehiclesUseCase } from '@/domain/use-cases/list-vehicles';
import { UpdateVehicleUseCase } from '@/domain/use-cases/update-vehicle';
import { DeleteVehicleUseCase } from '@/domain/use-cases/delete-vehicle';
import { CreateCategoryUseCase } from '@/domain/use-cases/create-category';
import { ListCategoriesUseCase } from '@/domain/use-cases/list-categories';
import { UpdateCategoryUseCase } from '@/domain/use-cases/update-category';
import { DeleteCategoryUseCase } from '@/domain/use-cases/delete-category';

@Module({
  imports: [AuthModule],
  providers: [
    CreateUserUseCase,
    AuthenticateUserUseCase,
    CreateBrandUseCase,
    ListBrandsUseCase,
    UpdateBrandUseCase,
    DeleteBrandUseCase,
    CreateModelUseCase,
    ListModelsUseCase,
    UpdateModelUseCase,
    DeleteModelUseCase,
    CreateVehicleUseCase,
    ListVehiclesUseCase,
    UpdateVehicleUseCase,
    DeleteVehicleUseCase,
    CreateCategoryUseCase,
    ListCategoriesUseCase,
    UpdateCategoryUseCase,
    DeleteCategoryUseCase,
  ],
  controllers: [
    SignUpController,
    SignInController,
    CreateBrandController,
    ListBrandsController,
    UpdateBrandController,
    DeleteBrandController,
    CreateModelController,
    ListModelsController,
    UpdateModelController,
    DeleteModelController,
    CreateVehicleController,
    ListVehiclesController,
    UpdateVehicleController,
    DeleteVehicleController,
    CreateCategoryController,
    ListCategoriesController,
    UpdateCategoryController,
    DeleteCategoryController,
  ],
})
export class HttpModule {}
