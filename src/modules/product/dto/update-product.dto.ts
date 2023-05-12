import { IsOptional, IsString, IsDate } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  readonly name?: string;

  @IsString()
  @IsOptional()
  readonly description?: string;

  @IsString()
  @IsOptional()
  readonly brand?: string;

  @IsString()
  @IsOptional()
  readonly color?: string;

  @IsDate()
  @IsOptional()
  readonly lostTime?: Date;
}
