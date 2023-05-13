import { IsNotEmpty, IsString, IsDate } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  readonly type: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  readonly brand: string;

  @IsString()
  @IsNotEmpty()
  readonly color: string;

  @IsDate()
  readonly lostTime: Date;
}
