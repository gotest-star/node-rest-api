import {
  Entity,
  ObjectID,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude, Expose, Transform } from 'class-transformer';

@Exclude()
@Entity({ name: 'books', synchronize: false })
export class BookModel {
  @Expose()
  @ObjectIdColumn()
  @Transform(String, { toPlainOnly: true })
  id: ObjectID;

  @Expose()
  @Column({ type: 'string' })
  title: string;

  @Expose()
  @Column({ type: 'string' })
  iban: string;

  @Column({ type: 'string' })
  author: ObjectID;

  @Expose()
  @Column({ type: 'date' })
  publishedAt: string;

  @Expose()
  @CreateDateColumn({ type: 'datetime' })
  createdAt: number;

  @Expose()
  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: number;
}
