import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ContactsService } from './contacts.service';
import { CreateContactBodyDto, PaginatedContactsResponseDto, UpdateContactBodyDto } from './dto';
import { PaginationQueryDto } from '~/common/dto';
import { NotFoundException, UniqueConstraintException } from '~/common/exceptions';
import { ContactParamsDto } from './dto/params';
import { ContactModel } from './models';

@Controller('/contacts')
@ApiTags('Contacts')
export class ContactsController {
  constructor(private readonly service: ContactsService) {}

  @Get()
  @ApiOkResponse({
    type: PaginatedContactsResponseDto,
  })
  @ApiOperation({
    summary: 'Get paginated contacts list',
  })
  list(@Query() query: PaginationQueryDto): Promise<PaginatedContactsResponseDto> {
    return this.service.list(query);
  }

  @Get('/:contactId')
  @ApiOkResponse({
    type: ContactModel,
  })
  @ApiNotFoundResponse({
    type: NotFoundException,
  })
  @ApiOperation({
    summary: 'Get single contact',
  })
  get(@Param() params: ContactParamsDto): Promise<ContactModel> {
    return this.service.get(params.contactId);
  }

  @Post()
  @ApiCreatedResponse({
    type: ContactModel,
  })
  @ApiConflictResponse({
    type: UniqueConstraintException,
  })
  @ApiOperation({
    summary: 'Create new contact',
  })
  create(@Body() body: CreateContactBodyDto): Promise<ContactModel> {
    return this.service.create(body);
  }

  @Patch('/:contactId')
  @ApiOkResponse({
    type: ContactModel,
  })
  @ApiConflictResponse({
    type: UniqueConstraintException,
  })
  @ApiNotFoundResponse({
    type: NotFoundException,
  })
  @ApiOperation({
    summary: 'Update contact',
  })
  update(
    @Param() params: ContactParamsDto,
    @Body() body: UpdateContactBodyDto,
  ): Promise<ContactModel> {
    return this.service.update(params.contactId, body);
  }

  @Delete('/:contactId')
  @ApiOkResponse({
    type: ContactModel,
  })
  @ApiNotFoundResponse({
    type: NotFoundException,
  })
  @ApiOperation({
    summary: 'Delete contact',
  })
  delete(@Param() params: ContactParamsDto): Promise<ContactModel> {
    return this.service.delete(params.contactId);
  }
}
