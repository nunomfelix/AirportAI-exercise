/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiConfigService } from './shared/services/api-config.service';
import { UserModule } from './modules/user/user.module';
import { SharedModule } from './shared/shared.module';
// import { AuthModule } from './modules/auth/auth.module';
import { AuthModule } from './modules/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    AuthModule,
    UserModule, 
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }), 
    MongooseModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (configService: ApiConfigService) => 
        configService.mongoConfig,
      inject: [ApiConfigService]
    })
  ],
  providers: [],
})
export class AppModule {}
