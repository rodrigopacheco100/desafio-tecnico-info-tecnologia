import { Module, Global } from '@nestjs/common';
import { DrizzleDB, DrizzleDBImpl } from './drizzle/connection/drizzle';
import { UserRepository } from '@/domain/repositories/user.repository';
import { DrizzleUserRepository } from './drizzle/repositories/user.repository';
import { BrandRepository } from '@/domain/repositories/brand.repository';
import { DrizzleBrandRepository } from './drizzle/repositories/brand.repository';
import { ModelRepository } from '@/domain/repositories/model.repository';
import { DrizzleModelRepository } from './drizzle/repositories/model.repository';
import { VehicleRepository } from '@/domain/repositories/vehicle.repository';
import { DrizzleVehicleRepository } from './drizzle/repositories/vehicle.repository';
import { CategoryRepository } from '@/domain/repositories/category.repository';
import { DrizzleCategoryRepository } from './drizzle/repositories/category.repository';

@Global()
@Module({
  providers: [
    {
      provide: DrizzleDB,
      useClass: DrizzleDBImpl,
    },
    {
      provide: UserRepository,
      useClass: DrizzleUserRepository,
    },
    {
      provide: BrandRepository,
      useClass: DrizzleBrandRepository,
    },
    {
      provide: ModelRepository,
      useClass: DrizzleModelRepository,
    },
    {
      provide: VehicleRepository,
      useClass: DrizzleVehicleRepository,
    },
    {
      provide: CategoryRepository,
      useClass: DrizzleCategoryRepository,
    },
  ],
  exports: [
    DrizzleDB,
    UserRepository,
    BrandRepository,
    ModelRepository,
    VehicleRepository,
    CategoryRepository,
  ],
})
export class DatabaseModule {}
