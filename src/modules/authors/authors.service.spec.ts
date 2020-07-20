import { Test, TestingModule } from "@nestjs/testing";
import * as faker from "faker";

import { AuthorsService } from "./authors.service";
import { mockRepository } from "../../utils/test-modules";
import { AuthorModel } from "../../database/models";

describe("AuthorsService", () => {
  const author: any = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    birthday: faker.date.past()
  };
  const objectId = faker.random.uuid();

  let service: AuthorsService;

  const authorRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    delete: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [mockRepository(AuthorModel, authorRepository), AuthorsService]
    }).compile();

    service = module.get<AuthorsService>(AuthorsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should call find method", async function() {
    jest.spyOn(authorRepository, "find").mockResolvedValue([author]);
    const response = await service.getAll();
    expect([author]).toEqual(response);
    expect(authorRepository.find).toBeCalled();
  });

  it("should call findOne method", async function() {
    jest.spyOn(authorRepository, "findOne").mockResolvedValue(author);
    const response = await service.getOne(objectId);
    expect(author).toEqual(response);
    expect(authorRepository.findOne).toBeCalled();
  });

  it("should call create method", async function() {
    jest.spyOn(authorRepository, "save").mockResolvedValue(author);
    const response = await service.create(author);
    expect(author).toEqual(response);
    expect(authorRepository.save).toBeCalled();
  });

  it("should call update method", async function() {
    jest.spyOn(authorRepository, "save").mockResolvedValue(author);
    const response = await service.update(objectId, author);
    expect(author).toEqual(response);
    expect(authorRepository.create).toBeCalled();
  });

  it("should call delete method", async function() {
    jest.spyOn(authorRepository, "delete").mockResolvedValue(author);
    const response = await service.delete(objectId);
    expect(undefined).toEqual(response);
    expect(authorRepository.delete).toBeCalled();
  });
});
