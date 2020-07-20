import {
  Entity,
  ObjectID,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";
import { Exclude, Expose, Transform } from "class-transformer";

@Exclude()
@Entity({ name: "authors", synchronize: false })
export class AuthorModel {
  @Expose()
  @ObjectIdColumn()
  @Transform(String, { toPlainOnly: true })
  id: ObjectID;

  @Expose()
  @Column({ type: "string" })
  firstName: string;

  @Expose()
  @Column({ type: "string" })
  lastName: string;

  @Expose()
  @Column({ type: "date" })
  birthday: string;

  @Expose()
  @CreateDateColumn({ type: "datetime" })
  createdAt: number;

  @Expose()
  @UpdateDateColumn({ type: "datetime" })
  updatedAt: number;
}
