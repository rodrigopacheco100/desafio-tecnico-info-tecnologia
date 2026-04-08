import { Module } from '@nestjs/common';
import { DatabaseModule, UsersRepository } from './database/drizzle';
import { EnvModule } from './env/env.module';

@Module({
  imports: [DatabaseModule, EnvModule],
  controllers: [],
  providers: [UsersRepository],
  exports: [UsersRepository],
})
export class AppModule {}
