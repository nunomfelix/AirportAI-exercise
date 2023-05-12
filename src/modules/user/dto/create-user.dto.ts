import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty()
  @IsEnum(['agent', 'passenger'])
  readonly role: string;
}
