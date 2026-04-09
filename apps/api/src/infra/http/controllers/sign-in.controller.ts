import { Controller, HttpCode, HttpStatus, Post, Body } from '@nestjs/common';
import { AuthenticateUserUseCase } from '@/domain/use-cases/authenticate-user';
import { Public } from '@/infra/auth/public.decorator';
import { Either } from '@/core/either';
import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

const SignInSchema = z.object({
  email: z.email(),
  password: z.string(),
});

class SignInDto extends createZodDto(SignInSchema) {}

const SignInResponseSchema = z.object({
  accessToken: z.string(),
});

class SignInResponseDto extends createZodDto(SignInResponseSchema) {}

type SignInResponse = z.infer<typeof SignInResponseSchema>;

@ApiTags('Auth')
@Controller('/sign-in')
@Public()
export class SignInController {
  constructor(private readonly authenticateUserUseCase: AuthenticateUserUseCase) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Authenticate user' })
  @ApiResponse({ status: 200, type: SignInResponseDto })
  async handle(@Body() body: SignInDto): Promise<SignInResponse> {
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
