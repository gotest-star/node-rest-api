import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put
} from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags
} from "@nestjs/swagger";
import "reflect-metadata";
import { TransformClassToPlain } from "class-transformer";

import { AuthorRequestDto } from "./dto";
import { AuthorResponseDto } from "./dto/AuthorResponse.dto";
import { AuthorsService } from "./authors.service";
import { BadRequestDto } from "dto/BadRequest.dto";

@ApiTags("Authors")
@Controller("authors")
export class AuthorsController {
  constructor(private authorsService: AuthorsService) {}

  @ApiOkResponse({
    type: AuthorResponseDto,
    isArray: true
  })
  @ApiInternalServerErrorResponse()
  @Get()
  @TransformClassToPlain()
  getAll() {
    return this.authorsService.getAll();
  }

  @ApiOkResponse({
    description: "Author",
    type: AuthorResponseDto
  })
  @ApiInternalServerErrorResponse()
  @Get(":authorId")
  @TransformClassToPlain()
  getOne(@Param("authorId") authorId: string) {
    return this.authorsService.getOne(authorId);
  }

  @ApiBody({
    description: "Author",
    type: AuthorRequestDto
  })
  @ApiCreatedResponse({
    type: AuthorResponseDto
  })
  @ApiBadRequestResponse({
    type: BadRequestDto
  })
  @ApiInternalServerErrorResponse()
  @Post()
  @TransformClassToPlain()
  create(@Body() author: AuthorRequestDto) {
    return this.authorsService.create(author);
  }

  @ApiBody({
    description: "Author",
    type: AuthorRequestDto
  })
  @ApiOkResponse({
    type: AuthorResponseDto
  })
  @ApiBadRequestResponse({
    type: BadRequestDto
  })
  @ApiInternalServerErrorResponse()
  @Put(":authorId")
  @TransformClassToPlain()
  update(
    @Param("authorId") authorId: string,
    @Body() rawAuthor: AuthorRequestDto
  ) {
    return this.authorsService.update(authorId, rawAuthor);
  }

  @ApiOkResponse()
  @ApiBadRequestResponse({
    type: BadRequestDto
  })
  @ApiInternalServerErrorResponse()
  @Delete(":authorId")
  async delete(@Param("authorId") authorId: string) {
    await this.authorsService.delete(authorId);
  }
}
