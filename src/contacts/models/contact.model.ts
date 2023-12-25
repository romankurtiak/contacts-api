import { ApiProperty } from '@nestjs/swagger';
import Prisma from '@prisma/client';
import { IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from 'class-validator';

export class ContactModel implements Prisma.Contact {
  @IsNumber()
  @ApiProperty()
  id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @ApiProperty()
  @IsPhoneNumber()
  phoneNumber: string;
}
