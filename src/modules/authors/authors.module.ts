import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthorModel } from 'database/models';
import { AuthorRepository } from 'database/repositories';

import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';
import { AuthorBooksModule } from './author-books/author-books.module';

@Module({
  controllers: [AuthorsController],
  providers: [AuthorsService],
  imports: [
    TypeOrmModule.forFeature([AuthorRepository, AuthorModel]),
    AuthorBooksModule,
  ],
})
export class AuthorsModule {}
