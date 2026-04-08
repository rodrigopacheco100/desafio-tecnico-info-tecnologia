import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Either } from '@/core/either';
import { type Encrypter, EncryptOptions } from '@/domain/services/cryptography/encrypter';
import { InvalidTokenError } from '@/domain/services/cryptography/errors/invalid-token';

@Injectable()
export class JwtEncrypter implements Encrypter {
  constructor(private readonly jwtService: JwtService) {}
  async verify<T extends object>(token: string): Promise<Either<InvalidTokenError, T>> {
    try {
      const payload = await this.jwtService.verifyAsync<T>(token);
      return Either.success(payload);
    } catch {
      return Either.fail(new InvalidTokenError());
    }
  }

  async encrypt(payload: Record<string, unknown>, options: EncryptOptions): Promise<string> {
    return await this.jwtService.signAsync(payload, {
      expiresIn: options.expiresIn ?? EncryptOptions.defaults.expiresIn,
    });
  }
}
