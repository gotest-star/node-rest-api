import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { BookModel } from "database/models";
import { BookRepository } from "database/repositories";
import { BookRequestDto } from "./dto";

@Injectable()
export class AuthorBooksService {
  constructor(
    @InjectRepository(BookRepository) private bookRepository: BookRepository
  ) {}

  getAll(authorId: string): Promise<BookModel[]> {
    return this.bookRepository.find({
      where: {
        author: authorId
      }
    });
  }

  getOne(authorId: string, bookId: string): Promise<BookModel> {
    return this.bookRepository.findOne(bookId, { where: { author: authorId } });
  }

  create(authorId: string, rawBook: BookRequestDto): Promise<BookModel> {
    const book = this.bookRepository.create({
      author: authorId,
      ...rawBook
    });

    return this.bookRepository.save(book);
  }

  async update(
    authorId: string,
    bookId: string,
    rawBook: BookRequestDto
  ): Promise<BookModel> {
    const book = await this.getOne(authorId, bookId);
    const rawBookFinal = this.bookRepository.create({
      ...book,
      ...rawBook
    });

    return this.bookRepository.save(rawBookFinal);
  }

  async delete(authorId: string, bookId: string): Promise<void> {
    await this.bookRepository.findOneAndDelete({
      id: bookId,
      author: authorId
    });
  }
}
