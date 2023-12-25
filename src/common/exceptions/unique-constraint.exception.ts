import { ConflictException, HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { getUniqueConstraintErrorCodeByFieldName } from '../utils';
import { errorCode } from '../constants';

export class UniqueConstraintException extends ConflictException {
  @ApiProperty({ default: 409 })
  statusCode: number;

  @ApiProperty({ default: 'Conflict' })
  error: string;

  @ApiProperty({ default: errorCode.CONTACT_NAME_EXISTS })
  errorCode: string;

  @ApiProperty({ default: 'Field value already exists' })
  message: string;

  constructor(model: Prisma.ModelName, e: PrismaClientKnownRequestError) {
    const field = (e.meta.target as string[])[0];

    super({
      statusCode: HttpStatus.CONFLICT,
      error: 'Conflict',
      errorCode: getUniqueConstraintErrorCodeByFieldName(model, field),
      message: `Unique validation failed for field: ${field}`,
    });
  }
}
