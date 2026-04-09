import { vi } from 'vitest';
import { Encrypter } from '@/domain/services/cryptography/encrypter';

export const mockEncrypter: Encrypter = {
  encrypt: vi.fn().mockResolvedValue('jwt_token_here'),
  verify: vi.fn(),
};
