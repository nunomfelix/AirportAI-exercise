import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import type { RoleType } from '../../shared/constants';
import { TokenType } from '../../shared/constants';
import { ApiConfigService } from '../../shared/services/api-config.service';
import type { User } from '../user/schemas/user.schema';
import { UserService } from '../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ApiConfigService,
    private userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.authConfig.publicKey,
    });
  }

  async validate(args: {
    userId: string;
    role: RoleType;
    type: TokenType;
  }): Promise<User> {
    console.log('[jwt.stratety validate]');

    if (args.type !== TokenType.ACCESS_TOKEN) {
      throw new UnauthorizedException();
    }

    const user = await this.userService.findById(args.userId);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
