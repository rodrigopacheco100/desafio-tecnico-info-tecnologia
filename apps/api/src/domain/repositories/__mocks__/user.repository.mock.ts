import { vi } from 'vitest';
import { User, UserProps } from '@/domain/entities/user.entity';
import { UserRepository } from '../user.repository';

type UserOverride = Partial<Pick<UserProps, 'name' | 'email' | 'password'>>;

export const makeMockUser = (override?: UserOverride): User => {
  return User.create({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'hashed_password',
    ...override,
  });
};

export const mockUserRepository: UserRepository = {
  save: vi.fn(),
  findByEmail: vi.fn(),
};
