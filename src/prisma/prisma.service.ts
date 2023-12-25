import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { extendPrismaClient } from './prisma.extension';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  prisma: ReturnType<typeof extendPrismaClient>;

  constructor() {
    const prisma = new PrismaClient();

    this.prisma = extendPrismaClient(prisma);
  }

  onModuleInit() {
    this.prisma.$connect();
  }

  onModuleDestroy() {
    this.prisma.$disconnect();
  }
}
