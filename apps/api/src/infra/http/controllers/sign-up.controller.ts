import { Controller, HttpCode, HttpStatus, Post, Body } from '@nestjs/common';
import { CreateUserUseCase } from '@/domain/use-cases/create-user';
import { Public } from '@/infra/auth/public.decorator';
import { Either } from '@/core/either';
import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

const CreateUserSchema = z.object({
  name: z.string().min(1).max(255),
  email: z.email(),
  password: z.string().min(6).max(100),
});

class CreateUserDto extends createZodDto(CreateUserSchema) {}

const UserResponseSchema = z.object({
  user: z.object({
    id: z.uuid(),
    name: z.string(),
    email: z.email(),
    createdAt: z.string().datetime(),
  }),
});

class UserResponseDto extends createZodDto(UserResponseSchema) {}

type UserResponse = z.infer<typeof UserResponseSchema>;

@ApiTags('Auth')
@Controller('/sign-up')
@Public()
export class SignUpController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, type: UserResponseDto })
  async handle(@Body() body: CreateUserDto): Promise<UserResponse> {
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
        createdAt: result.value.user.createdAt.toISOString(),
      },
    };
  }
}
