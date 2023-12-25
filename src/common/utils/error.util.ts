import { Prisma } from '@prisma/client';
import { errorCode } from '../constants';

export const getUniqueConstraintErrorCodeByFieldName = (model: Prisma.ModelName, field: string) => {
  switch (model) {
    case 'Contact': {
      switch (field) {
        case 'phone_number':
          return errorCode.CONTACT_PHONE_NUMBER_EXISTS;
        case 'name':
          return errorCode.CONTACT_NAME_EXISTS;
      }
    }
    default: {
      return 'CONFLICT';
    }
  }
};
