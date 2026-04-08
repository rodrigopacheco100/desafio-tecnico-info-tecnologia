import { type Either } from '@/core/either';
import { InvalidTokenError } from './errors/invalid-token';

export namespace EncryptOptions {
  export const defaults: Partial<EncryptOptions> = {
    expiresIn: '1d',
  } as const;
}
export interface EncryptOptions {
  expiresIn?: `${number}d` | `${number}h`;
}

export abstract class Encrypter {
  abstract encrypt(payload: Record<string, unknown>, options?: EncryptOptions): Promise<string>;

  abstract verify<T extends object>(token: string): Promise<Either<InvalidTokenError, T>>;
}
