import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthenticateUserUseCase } from '@/domain/use-cases/authenticate-user';
import { Public } from '@/infra/auth/public.decorator';
import { Either } from '@/core/either';

type SignInBody = {
  email: string;
  password: string;
};

@Controller('/sign-in')
@Public()
export class SignInController {
  constructor(private readonly authenticateUserUseCase: AuthenticateUserUseCase) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async handle(@Body() body: SignInBody) {
    const result = await this.authenticateUserUseCase.execute({
      email: body.email,
      password: body.password,
    });

    Either.throwsIfFail(result);

    return {
      accessToken: result.value.accessToken,
    };
  }
}
