import { EntityRepository, MongoRepository } from "typeorm";
import { AuthorModel } from "../models";

@EntityRepository(AuthorModel)
export class AuthorRepository extends MongoRepository<AuthorModel> {}
