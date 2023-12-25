import { ApiProperty } from '@nestjs/swagger';
import { PaginationQueryDto } from '../query/pagination.query-dto';

type PaginationResponseDtoPayload = {
  totalCount: number;
} & PaginationQueryDto;

export class PaginatedResponseDto<T> {
  @ApiProperty()
  page: number;

  @ApiProperty()
  take: number;

  @ApiProperty()
  itemsCount: number;

  @ApiProperty()
  totalPagesCount: number;

  @ApiProperty()
  hasNextPage: boolean;

  @ApiProperty()
  hasPreviousPage: boolean;

  @ApiProperty()
  data: T[];

  constructor(data: T[], payload: PaginationResponseDtoPayload) {
    this.data = data;
    this.page = payload.page;
    this.take = payload.take;
    this.itemsCount = data.length;
    this.totalPagesCount = Math.ceil(payload.totalCount / payload.take);
    this.hasPreviousPage = payload.page > 1;
    this.hasNextPage = payload.page < this.totalPagesCount;
  }
}
