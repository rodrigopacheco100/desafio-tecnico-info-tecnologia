import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { Encrypter } from '@/domain/services/cryptography/encrypter';
import { Hasher } from '@/domain/services/cryptography/hasher';
import { EnvModule } from '../env/env.module';
import { EnvService } from '../env/env.service';
import { BcryptHasher } from './bcrypt-hasher';
import { JwtEncrypter } from './jwt-encrypter';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [EnvModule],
      inject: [EnvService],
      global: true,
      useFactory(env: EnvService) {
        return { secret: env.get('JWT_SECRET') };
      },
    }),
  ],
  providers: [
    { provide: Encrypter, useClass: JwtEncrypter },
    { provide: Hasher, useClass: BcryptHasher },
  ],
  exports: [Encrypter, Hasher],
})
export class CryptographyModule {}
