import { EntityRepository, MongoRepository } from "typeorm";
import { BookModel } from "../models";

@EntityRepository(BookModel)
export class BookRepository extends MongoRepository<BookModel> {}
