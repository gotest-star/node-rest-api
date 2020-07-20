import { Exclude, Expose } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

@Exclude()
export class AuthorRequestDto {
  @ApiProperty()
  @Expose()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsNotEmpty()
  birthday: string;
}
