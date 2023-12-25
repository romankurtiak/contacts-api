import { NotFoundException as BaseNotFoundException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class NotFoundException extends BaseNotFoundException {
  @ApiProperty({ default: 404 })
  statusCode: number;

  @ApiProperty({ default: 'Not Found' })
  error: string;

  @ApiProperty({ default: 'Not Found' })
  message: string;
}
