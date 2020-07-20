import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuthorBooksController } from "./author-books.controller";
import { AuthorBooksService } from "./author-books.service";
import { BookModel } from "database/models";
import { BookRepository } from "database/repositories";

@Module({
  imports: [TypeOrmModule.forFeature([BookRepository, BookModel])],
  providers: [AuthorBooksService],
  controllers: [AuthorBooksController]
})
export class AuthorBooksModule {}
