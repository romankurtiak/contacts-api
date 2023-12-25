import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ContactModel } from '~/contacts/models';
import { PaginatedResponseDto } from '~/common/dto';

export class PaginatedContactsResponseDto extends PaginatedResponseDto<ContactModel> {
  @Type(() => ContactModel)
  @ApiProperty({ type: ContactModel, isArray: true })
  data: ContactModel[];
}
