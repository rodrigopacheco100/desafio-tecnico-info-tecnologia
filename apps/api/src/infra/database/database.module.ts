import { Module, Global } from '@nestjs/common';
import { DrizzleDB, DrizzleDBImpl } from './drizzle/connection/drizzle';

@Global()
@Module({
  providers: [
    {
      provide: DrizzleDB,
      useClass: DrizzleDBImpl,
    },
  ],
  exports: [DrizzleDB],
})
export class DatabaseModule {}
