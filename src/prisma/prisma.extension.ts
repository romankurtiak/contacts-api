import { Prisma, PrismaClient } from '@prisma/client';
import { PaginatedResponseDto, PaginationQueryDto } from '~/common/dto';

export const extendPrismaClient = (client: PrismaClient) => {
  return client.$extends({
    model: {
      $allModels: {
        async findManyPaginated<T, const A extends Prisma.Args<T, 'findMany'>>(
          this: T,
          { args, pagination }: { args?: A; pagination?: PaginationQueryDto } = {},
        ): Promise<PaginatedResponseDto<Prisma.Result<T, A, 'findMany'>[0]>> {
          const context: any = Prisma.getExtensionContext(this);

          const [items, count] = await client.$transaction([
            context.findMany({
              ...args,
              take: pagination.take,
              skip: (pagination.page - 1) * pagination.take,
            }),
            context.count(args),
          ]);

          return new PaginatedResponseDto(items, { ...pagination, totalCount: count });
        },
      },
    },
  });
};
