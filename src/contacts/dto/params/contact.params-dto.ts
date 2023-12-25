import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class ContactParamsDto {
  @IsNumber()
  @Type(() => Number)
  @ApiProperty()
  contactId: number;
}
