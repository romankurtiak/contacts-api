import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '~/prisma';
import { PaginationQueryDto } from '~/common/dto';
import { CreateContactBodyDto, PaginatedContactsResponseDto, UpdateContactBodyDto } from './dto';
import { NotFoundException } from '~/common/exceptions';
import { ContactModel } from './models';

@Injectable()
export class ContactsService extends PrismaService {
  async findFirstOrFail(args?: Prisma.ContactFindFirstArgs): Promise<ContactModel> {
    return this.prisma.contact.findFirstOrThrow(args).catch(() => {
      throw new NotFoundException('Contact not found');
    });
  }

  async list(dto: PaginationQueryDto): Promise<PaginatedContactsResponseDto> {
    return this.prisma.contact.findManyPaginated({
      pagination: dto,
    });
  }

  async get(id: number): Promise<ContactModel> {
    return this.findFirstOrFail({ where: { id } });
  }

  async create(dto: CreateContactBodyDto): Promise<ContactModel> {
    return await this.prisma.contact.create({ data: dto });
  }

  async update(id: number, dto: UpdateContactBodyDto): Promise<ContactModel> {
    await this.findFirstOrFail({ where: { id } });

    return await this.prisma.contact.update({ where: { id }, data: dto });
  }

  async delete(id: number): Promise<ContactModel> {
    await this.findFirstOrFail({ where: { id } });

    return this.prisma.contact.delete({ where: { id } });
  }
}
