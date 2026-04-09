import { UseCase } from '@/core/use-case';
import { Either } from '@/core/either';
import { Hasher } from '../services/cryptography/hasher';
import { Encrypter } from '../services/cryptography/encrypter';
import { UserRepository } from '../repositories/user.repository';
import { Injectable } from '@nestjs/common';
import { UserInvalidCredentialsError } from '../errors/user-invalid-credentials.error';

type AuthenticateUserInput = {
  email: string;
  password: string;
};

type AuthenticateUserOutput = {
  accessToken: string;
};

@Injectable()
export class AuthenticateUserUseCase implements UseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hasher: Hasher,
    private readonly encrypter: Encrypter,
  ) {}

  async execute(input: AuthenticateUserInput) {
    const user = await this.userRepository.findByEmail(input.email);

    if (!user) {
      return Either.fail(new UserInvalidCredentialsError());
    }

    const isPasswordValid = await this.hasher.compare(input.password, user.password);

    if (!isPasswordValid) {
      return Either.fail(new UserInvalidCredentialsError());
    }

    const accessToken = await this.encrypter.encrypt({
      sub: user.id.toString(),
      email: user.email,
    });

    return Either.success<AuthenticateUserOutput>({
      accessToken,
    });
  }
}
