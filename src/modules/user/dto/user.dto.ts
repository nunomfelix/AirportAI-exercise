import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { RoleType } from '../../../shared/constants';
import type { User } from '../schemas/user.schema';

export class UserDto {
  @ApiPropertyOptional()
  username: string;

  @ApiPropertyOptional({ enum: RoleType })
  role: RoleType;
}
