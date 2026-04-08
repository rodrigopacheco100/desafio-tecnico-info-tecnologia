import { compare, hash } from 'bcryptjs';

import { type Hasher } from '@/domain/services/cryptography/hasher';

export class BcryptHasher implements Hasher {
  private readonly HASH_SALT_LENGTH = 8;

  async hash(plain: string): Promise<string> {
    return await hash(plain, this.HASH_SALT_LENGTH);
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return await compare(plain, hash);
  }
}
