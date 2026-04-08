import { Module, Global } from '@nestjs/common';
import { DrizzleDB, DrizzleDBImpl } from './drizzle/connection/drizzle';
import { UserRepository } from '@/domain/repositories/user.repository';
import { DrizzleUserRepository } from './drizzle/repositories/user.repository';

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
  ],
  exports: [DrizzleDB, UserRepository],
})
export class DatabaseModule {}
