import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { UniqueConstraintException } from '../exceptions';

@Catch(PrismaClientKnownRequestError)
export class UniqueConstraintExceptionFilter implements ExceptionFilter {
  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const uniqueConstraintException = new UniqueConstraintException(
      exception.meta.modelName as Prisma.ModelName,
      exception,
    );

    response.status(409).json(uniqueConstraintException.getResponse());
  }
}
