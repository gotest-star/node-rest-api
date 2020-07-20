import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TransformClassToPlain } from 'class-transformer';

import { AuthorBooksService } from './author-books.service';
import { BookDto, BookRequestDto } from './dto';
import { BadRequestDto } from 'dto';

@ApiTags('Authors')
@Controller('authors/:authorId/books')
export class AuthorBooksController {
  constructor(private authorBooksService: AuthorBooksService) {}

  @ApiOkResponse({
    type: BookDto,
    isArray: true,
  })
  @ApiInternalServerErrorResponse()
  @Get()
  @TransformClassToPlain()
  getAll(@Param('authorId') authorId: string) {
    return this.authorBooksService.getAll(authorId);
  }

  @ApiOkResponse({
    type: BookDto,
  })
  @ApiInternalServerErrorResponse()
  @Get(':bookId')
  @TransformClassToPlain()
  async getOne(
    @Param('authorId') authorId: string,
    @Param('bookId') bookId: string,
  ) {
    return this.authorBooksService.getOne(authorId, bookId);
  }

  @ApiBody({
    type: BookRequestDto,
  })
  @ApiCreatedResponse({
    type: BookDto,
  })
  @ApiBadRequestResponse({
    type: BadRequestDto,
  })
  @ApiInternalServerErrorResponse()
  @Post()
  @TransformClassToPlain()
  create(@Param('authorId') authorId: string, @Body() rawBook: BookRequestDto) {
    return this.authorBooksService.create(authorId, rawBook);
  }

  @ApiBody({
    type: BookRequestDto,
  })
  @ApiOkResponse({
    type: BookDto,
  })
  @ApiBadRequestResponse({
    type: BadRequestDto,
  })
  @ApiInternalServerErrorResponse()
  @Put(':bookId')
  @TransformClassToPlain()
  update(
    @Param('authorId') authorId: string,
    @Param('bookId') bookId: string,
    @Body() rawBook: BookRequestDto,
  ) {
    return this.authorBooksService.update(authorId, bookId, rawBook);
  }

  @ApiOkResponse()
  @ApiInternalServerErrorResponse()
  @Delete(':bookId')
  async delete(
    @Param('authorId') authorId: string,
    @Param('bookId') bookId: string,
  ) {
    await this.authorBooksService.delete(authorId, bookId);
  }
}
