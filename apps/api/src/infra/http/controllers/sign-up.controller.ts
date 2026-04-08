import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateUserUseCase } from '@/domain/use-cases/create-user';
import { Public } from '@/infra/auth/public.decorator';
import { Either } from '@/core/either';

type SignUpBody = {
  name: string;
  email: string;
  password: string;
};

@Controller('/sign-up')
@Public()
export class SignUpController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async handle(@Body() body: SignUpBody) {
    const result = await this.createUserUseCase.execute({
      name: body.name,
      email: body.email,
      password: body.password,
    });

    Either.throwsIfFail(result);

    return {
      user: {
        id: result.value.user.id,
        name: result.value.user.name,
        email: result.value.user.email,
        createdAt: result.value.user.createdAt,
      },
    };
  }
}
