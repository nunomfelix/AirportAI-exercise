import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class SearchProductDto {
  @IsString()
  @IsNotEmpty()
  readonly message: string;

  @IsString()
  @IsOptional()
  readonly lostTime?: string;
}
