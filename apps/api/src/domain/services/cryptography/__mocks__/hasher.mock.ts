import { vi } from 'vitest';
import { Hasher } from '@/domain/services/cryptography/hasher';

export const mockHasher: Hasher = {
  hash: vi.fn().mockResolvedValue('hashed_password'),
  compare: vi.fn().mockResolvedValue(true),
};
