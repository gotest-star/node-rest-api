import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorModel } from '../../database/models';
import { MongoRepository } from 'typeorm';
import { AuthorRequestDto } from './dto';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(AuthorModel)
    private authorRepository: MongoRepository<AuthorModel>,
  ) {}

  getAll(): Promise<AuthorModel[]> {
    return this.authorRepository.find();
  }

  getOne(authorId: string): Promise<AuthorModel> {
    return this.authorRepository.findOne(authorId);
  }

  create(author: AuthorRequestDto): Promise<AuthorModel> {
    return this.authorRepository.save(author);
  }

  update(authorId: string, rawAuthor: AuthorRequestDto): Promise<AuthorModel> {
    const author = this.authorRepository.create({
      id: authorId,
      ...rawAuthor,
    });

    return this.authorRepository.save(author);
  }

  async delete(authorId: string): Promise<void> {
    await this.authorRepository.delete(authorId);
  }
}
