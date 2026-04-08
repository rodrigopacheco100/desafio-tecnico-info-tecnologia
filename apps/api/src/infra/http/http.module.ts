import { Module } from '@nestjs/common';
import { SignUpController } from './controllers/sign-up.controller';
import { SignInController } from './controllers/sign-in.controller';
import { AuthModule } from '../auth/auth.module';
import { CreateUserUseCase } from '@/domain/use-cases/create-user';
import { AuthenticateUserUseCase } from '@/domain/use-cases/authenticate-user';

@Module({
  imports: [AuthModule],
  providers: [CreateUserUseCase, AuthenticateUserUseCase],
  controllers: [SignUpController, SignInController],
})
export class HttpModule {}
