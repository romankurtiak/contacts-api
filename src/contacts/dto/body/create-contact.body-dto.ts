import { OmitType } from '@nestjs/swagger';
import { ContactModel } from '~/contacts/models';

export class CreateContactBodyDto extends OmitType(ContactModel, ['id']) {}
