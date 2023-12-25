import { Module } from '@nestjs/common';
import { ContactsModule } from './contacts';
import { PrismaModule } from './prisma';

@Module({
  imports: [PrismaModule, ContactsModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class RootModule {}
