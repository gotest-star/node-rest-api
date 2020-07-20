import { Test, TestingModule } from '@nestjs/testing';
import * as faker from 'faker';

import { AuthorBooksController } from './author-books.controller';
import { BookModel } from '../../../database/models';
import { AuthorBooksService } from './author-books.service';
import { mockRepository } from '../../../utils/test-modules';
import { BookRepository } from '../../../database/repositories';

describe('AuthorBooks Controller', () => {
  const authorBook: BookModel = {
    id: faker.random.uuid(),
    title: faker.random.words(4),
    author: faker.random.uuid(),
    iban: faker.finance.iban(),
    publishedAt: faker.date.past(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
  };
  const authorId: string = faker.random.uuid();
  const bookId: string = faker.random.uuid();

  let controller: AuthorBooksController;
  let bookService: AuthorBooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [mockRepository(BookRepository), AuthorBooksService],
      controllers: [AuthorBooksController],
    }).compile();

    controller = module.get<AuthorBooksController>(AuthorBooksController);
    bookService = module.get<AuthorBooksService>(AuthorBooksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call bookService.getAll', async function() {
    jest.spyOn(bookService, 'getAll').mockResolvedValue([authorBook]);
    const response = await controller.getAll(authorId);
    expect([authorBook]).toEqual(response);
    expect(bookService.getAll).toBeCalledWith(authorId);
  });

  it('should call bookService.getOne', async function() {
    jest.spyOn(bookService, 'getOne').mockResolvedValue(authorBook);
    const response = await controller.getOne(authorId, bookId);
    expect(authorBook).toEqual(response);
    expect(bookService.getOne).toBeCalledWith(authorId, bookId);
  });

  it('should call bookService.create', async function() {
    jest.spyOn(bookService, 'create').mockResolvedValue(authorBook);
    const response = await controller.create(authorId, authorBook);
    expect(authorBook).toEqual(response);
    expect(bookService.create).toBeCalledWith(authorId, authorBook);
  });

  it('should call bookService.update', async function() {
    jest.spyOn(bookService, 'update').mockResolvedValue(authorBook);
    const response = await controller.update(authorId, bookId, authorBook);
    expect(authorBook).toEqual(response);
    expect(bookService.update).toBeCalledWith(authorId, bookId, authorBook);
  });

  it('should call bookService.delete', async function() {
    jest.spyOn(bookService, 'delete').mockResolvedValue();
    const response = await controller.delete(authorId, bookId);
    expect(undefined).toEqual(response);
    expect(bookService.delete).toBeCalledWith(authorId, bookId);
  });
});
