import { Test, TestingModule } from "@nestjs/testing";
import * as faker from "faker";

import { AuthorBooksService } from "./author-books.service";
import { BookModel } from "../../../database/models";
import { mockRepository } from "../../../utils/test-modules";
import { BookRepository } from "../../../database/repositories";

describe("AuthorBooksService", () => {
  const authorBook: BookModel = {
    id: faker.random.uuid(),
    title: faker.random.words(4),
    author: faker.random.uuid(),
    iban: faker.finance.iban(),
    publishedAt: faker.date.past(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.past()
  };
  const authorId: string = faker.random.uuid();
  const bookId: string = faker.random.uuid();

  const authorBookRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    findOneAndDelete: jest.fn(),
    create: jest.fn()
  };

  let service: AuthorBooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        mockRepository(BookRepository, authorBookRepository),
        AuthorBooksService
      ]
    }).compile();

    service = module.get<AuthorBooksService>(AuthorBooksService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should call bookRepository.find", async function() {
    jest.spyOn(authorBookRepository, "find").mockResolvedValue([authorBook]);
    const response = await service.getAll(authorId);
    expect([authorBook]).toEqual(response);
    expect(authorBookRepository.find).toBeCalled();
  });

  it("should call bookRepository.findOne", async function() {
    jest.spyOn(authorBookRepository, "findOne").mockResolvedValue(authorBook);
    const response = await service.getOne(authorId, bookId);
    expect(authorBook).toEqual(response);
    expect(authorBookRepository.findOne).toBeCalled();
  });

  it("should call bookRepository.save on create", async function() {
    jest.spyOn(authorBookRepository, "save").mockResolvedValue(authorBook);
    const response = await service.create(authorId, authorBook);
    expect(authorBook).toEqual(response);
    expect(authorBookRepository.save).toBeCalled();
  });

  it("should call bookRepository.save & create on update", async function() {
    jest.spyOn(authorBookRepository, "save").mockResolvedValue(authorBook);
    const response = await service.update(authorId, bookId, authorBook);
    expect(authorBook).toEqual(response);
    expect(authorBookRepository.create).toBeCalled();
    expect(authorBookRepository.save).toBeCalled();
  });

  it("should call bookRepository.delete", async function() {
    jest
      .spyOn(authorBookRepository, "findOneAndDelete")
      .mockResolvedValue(undefined);
    const response = await service.delete(authorId, bookId);
    expect(undefined).toEqual(response);
    expect(authorBookRepository.findOneAndDelete).toBeCalled();
  });
});
