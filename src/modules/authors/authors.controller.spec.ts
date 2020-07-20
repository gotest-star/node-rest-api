import { Test, TestingModule } from "@nestjs/testing";
import * as faker from "faker";

import { AuthorsController } from "./authors.controller";
import { AuthorsService } from "./authors.service";
import { mockRepository } from "../../utils/test-modules";
import { AuthorModel } from "../../database/models";

describe("Authors Controller", () => {
  const author: any = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    birthday: faker.date.past()
  };
  const objectId = faker.random.uuid();

  let controller: AuthorsController;
  let authorService: AuthorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [mockRepository(AuthorModel), AuthorsService],
      controllers: [AuthorsController]
    }).compile();

    controller = module.get<AuthorsController>(AuthorsController);
    authorService = module.get<AuthorsService>(AuthorsService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should call getAll authors method", async function() {
    jest.spyOn(authorService, "getAll").mockResolvedValue([author]);
    const authors = await controller.getAll();
    expect([author]).toEqual(authors);
    expect(authorService.getAll).toBeCalled();
  });

  it("should call getOne service method", async function() {
    jest.spyOn(authorService, "getOne").mockResolvedValue(author);
    const authorResponse = await controller.getOne(objectId);
    expect(author).toEqual(authorResponse);
    expect(authorService.getOne).toBeCalledWith(objectId);
  });

  it("should call create service method", async function() {
    jest.spyOn(authorService, "create").mockResolvedValue(author);
    const authorResponse = await controller.create(author);
    expect(author).toEqual(authorResponse);
    expect(authorService.create).toBeCalledWith(author);
  });

  it("should call update service method", async function() {
    jest.spyOn(authorService, "update").mockResolvedValue(author);
    const authorResponse = await controller.update(objectId, author);
    expect(author).toEqual(authorResponse);
    expect(authorService.update).toBeCalledWith(objectId, author);
  });

  it("should call delete service method", async function() {
    jest.spyOn(authorService, "delete").mockResolvedValue();
    const authorResponse = await controller.delete(objectId);
    expect(undefined).toEqual(authorResponse);
    expect(authorService.delete).toBeCalledWith(objectId);
  });
});
