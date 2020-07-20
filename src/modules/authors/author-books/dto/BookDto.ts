import { ApiProperty } from '@nestjs/swagger';

export class BookDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  iban: string;

  @ApiProperty()
  publishedAt: string;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;
}
