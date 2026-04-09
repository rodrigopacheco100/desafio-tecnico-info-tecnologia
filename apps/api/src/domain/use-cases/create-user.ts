import { UseCase } from '@/core/use-case';
import { User } from '../entities/user.entity';
import { Hasher } from '../services/cryptography/hasher';
import { UserRepository } from '../repositories/user.repository';
import { Either } from '@/core/either';
import { Injectable } from '@nestjs/common';
import { UserEmailAlreadyUsedError } from '../errors/user-email-already-used.error';
import { UserPasswordNotStrongEnoughError } from '../errors/user-password-not-strong-enough.error';

type CreateUserInput = {
  name: string;
  email: string;
  password: string;
};
type CreateUserOutput = {
  user: User;
};

@Injectable()
export class CreateUserUseCase implements UseCase {
  constructor(
    private readonly hasher: Hasher,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(input: CreateUserInput) {
    const emailAlreadyUsed = await this.userRepository.findByEmail(input.email);

    if (emailAlreadyUsed) return Either.fail(new UserEmailAlreadyUsedError());

    if (!this.isStrongPassword(input.password))
      return Either.fail(new UserPasswordNotStrongEnoughError());

    const hashedPassword = await this.hasher.hash(input.password);
    const user = User.create({
      name: input.name,
      email: input.email,
      password: hashedPassword,
    });
    await this.userRepository.save(user);

    return Either.success<CreateUserOutput>({
      user,
    });
  }

  private isStrongPassword(password: string): boolean {
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);
    const isTwelveCharsOrMore = password.length >= 12;

    return hasLowercase && hasUppercase && hasNumber && hasSpecialChar && isTwelveCharsOrMore;
  }
}
