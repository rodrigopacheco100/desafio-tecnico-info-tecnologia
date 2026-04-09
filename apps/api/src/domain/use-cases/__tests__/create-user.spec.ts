import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserUseCase } from '@/domain/use-cases/create-user';
import { UserRepository } from '@/domain/repositories/user.repository';
import { mockHasher } from '../../services/cryptography/__mocks__/hasher.mock';
import { mockUserRepository } from '../../repositories/__mocks__/user.repository.mock';
import { Hasher } from '@/domain/services/cryptography/hasher';

describe('CreateUserUseCase', () => {
  let useCase: CreateUserUseCase;
  let userRepository: UserRepository;
  let hasher: Hasher;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserUseCase,
        { provide: Hasher, useValue: mockHasher },
        { provide: UserRepository, useValue: mockUserRepository },
      ],
    }).compile();

    useCase = module.get<CreateUserUseCase>(CreateUserUseCase);
    userRepository = module.get<UserRepository>(UserRepository);
    hasher = module.get<Hasher>(Hasher);

    vi.clearAllMocks();
  });

  describe('execute', () => {
    it('should create a user successfully', async () => {
      vi.spyOn(userRepository, 'findByEmail').mockResolvedValue(null);
      vi.spyOn(userRepository, 'save').mockResolvedValue(undefined);

      const result = await useCase.execute({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'Password123!',
      });

      expect(result.isSuccess()).toBe(true);
      const successResult = result as any;
      expect(successResult.value.user.name).toBe('John Doe');
      expect(successResult.value.user.email).toBe('john@example.com');
    });

    it('should fail if email is already used', async () => {
      const existingUser = {
        id: '123',
        name: 'Existing User',
        email: 'john@example.com',
        password: 'hashed_password',
        createdAt: new Date(),
        updatedAt: new Date(),
      } as any;
      vi.spyOn(userRepository, 'findByEmail').mockResolvedValue(existingUser);

      const result = await useCase.execute({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'Password123!',
      });

      expect(result.isFail()).toBe(true);
      const failResult = result as any;
      expect(failResult.value.message).toBe('Email already used');
    });

    it('should fail if password is not strong enough', async () => {
      vi.spyOn(userRepository, 'findByEmail').mockResolvedValue(null);

      const result = await useCase.execute({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'weak',
      });

      expect(result.isFail()).toBe(true);
      const failResult = result as any;
      expect(failResult.value.message).toBe('Password is not strong enough');
    });
  });
});
