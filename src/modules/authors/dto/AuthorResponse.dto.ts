import { ApiProperty } from "@nestjs/swagger";

export class AuthorResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  birthday: string;

  @ApiProperty()
  createdAt: string;

  @ApiProperty({
    required: false
  })
  updatedAt?: string;
}
