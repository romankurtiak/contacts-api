import { OmitType, PartialType } from '@nestjs/swagger';
import { ContactModel } from '~/contacts/models';

export class UpdateContactBodyDto extends PartialType(OmitType(ContactModel, ['id'])) {}
