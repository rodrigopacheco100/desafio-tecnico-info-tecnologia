import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { EnvModule } from './env/env.module';
import { CryptographyModule } from './cryptography/cryptography.module';
import { HttpModule } from './http/http.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DatabaseModule, EnvModule, CryptographyModule, HttpModule, AuthModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
