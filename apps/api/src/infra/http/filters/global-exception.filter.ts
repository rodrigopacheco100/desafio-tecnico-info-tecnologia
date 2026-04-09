import {
  type ArgumentsHost,
  Catch,
  type ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { ZodError } from 'zod';

import { BaseError } from '@/core/base-error';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger = new Logger()) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (exception instanceof ZodError) {
      this.logger.warn({
        message: `Caught validation exception`,
        error: exception.format(),
        stack: exception.stack,
      });
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: exception.issues,
      });
    }

    if (exception instanceof BaseError) {
      this.logger.warn({
        message: `Caught business exception`,
        error: exception,
        stack: exception.stack,
      });
      return response.status(exception.statusCode).json({
        statusCode: exception.statusCode,
        message: exception.message,
      });
    }

    if (exception instanceof HttpException) {
      this.logger.warn({
        message: `Caught http exception`,
        error: exception,
        stack: exception.stack,
      });
      if (exception.getStatus() === HttpStatus.TOO_MANY_REQUESTS) {
        return response.status(HttpStatus.TOO_MANY_REQUESTS).json({
          message: 'Too many requests',
          statusCode: HttpStatus.TOO_MANY_REQUESTS,
        });
      }
      return response.status(exception.getStatus()).json({
        ...(exception.getResponse() as object),
      });
    }

    this.logger.error(`Caught unknown exception: ${exception.stack}`);
    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: exception.message,
    });
  }
}
