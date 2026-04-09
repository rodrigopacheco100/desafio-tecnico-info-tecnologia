import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticateUserUseCase } from '@/domain/use-cases/authenticate-user';
import { Hasher } from '@/domain/services/cryptography/hasher';
import { Encrypter } from '@/domain/services/cryptography/encrypter';
import { UserRepository } from '@/domain/repositories/user.repository';
import { mockHasher } from '../../services/cryptography/__mocks__/hasher.mock';
import { mockEncrypter } from '../../services/cryptography/__mocks__/encrypter.mock';
import {
  mockUserRepository,
  makeMockUser,
} from '../../repositories/__mocks__/user.repository.mock';

describe('AuthenticateUserUseCase', () => {
  let useCase: AuthenticateUserUseCase;
  let userRepository: UserRepository;
  let hasher: Hasher;
  let encrypter: Encrypter;

  const mockUser = makeMockUser();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthenticateUserUseCase,
        { provide: UserRepository, useValue: mockUserRepository },
        { provide: Hasher, useValue: mockHasher },
        { provide: Encrypter, useValue: mockEncrypter },
      ],
    }).compile();

    useCase = new AuthenticateUserUseCase(mockUserRepository, mockHasher, mockEncrypter);
    userRepository = mockUserRepository;
    hasher = mockHasher;
    encrypter = mockEncrypter;

    vi.clearAllMocks();
  });

  describe('execute', () => {
    it('should authenticate user successfully and return access token', async () => {
      vi.spyOn(userRepository, 'findByEmail').mockResolvedValue(mockUser);
      vi.spyOn(hasher, 'compare').mockResolvedValue(true);
      vi.spyOn(encrypter, 'encrypt').mockResolvedValue('jwt_token_here');

      const result = await useCase.execute({
        email: 'john@example.com',
        password: 'password123',
      });

      expect(result.isSuccess()).toBe(true);
      const successResult = result as any;
      expect(successResult.value.accessToken).toBe('jwt_token_here');
    });

    it('should fail if user does not exist', async () => {
      vi.spyOn(userRepository, 'findByEmail').mockResolvedValue(null);

      const result = await useCase.execute({
        email: 'nonexistent@example.com',
        password: 'password123',
      });

      expect(result.isFail()).toBe(true);
      const failResult = result as any;
      expect(failResult.value.message).toBe('Invalid credentials');
    });

    it('should fail if password is invalid', async () => {
      vi.spyOn(userRepository, 'findByEmail').mockResolvedValue(mockUser);
      vi.spyOn(hasher, 'compare').mockResolvedValue(false);

      const result = await useCase.execute({
        email: 'john@example.com',
        password: 'wrong_password',
      });

      expect(result.isFail()).toBe(true);
      const failResult = result as any;
      expect(failResult.value.message).toBe('Invalid credentials');
    });

    it('should return accessToken in success result', async () => {
      vi.spyOn(userRepository, 'findByEmail').mockResolvedValue(mockUser);
      vi.spyOn(hasher, 'compare').mockResolvedValue(true);
      vi.spyOn(encrypter, 'encrypt').mockResolvedValue('new_token');

      const result = await useCase.execute({
        email: 'john@example.com',
        password: 'password123',
      });

      expect(result.isSuccess()).toBe(true);
      const successResult = result as any;
      expect(successResult.value.accessToken).toBe('new_token');
    });
  });
});
