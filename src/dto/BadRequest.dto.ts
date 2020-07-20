import { ApiProperty } from "@nestjs/swagger";

export class BadRequestDto {
  @ApiProperty({
    default: 400,
    type: Number,
    example: 400
  })
  public statusCode: number;

  @ApiProperty({
    example: []
  })
  public message: string[];

  @ApiProperty({
    default: "Bad Request",
    example: "Bad Request"
  })
  public error: string;
}
