import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { EnvModule } from './env/env.module';

@Module({
  imports: [DatabaseModule, EnvModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
