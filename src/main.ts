import {
  ClassSerializerInterceptor,
  HttpStatus,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';

import { middleware as expressCtx } from 'express-ctx';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import {
  NestExpressApplication,
  ExpressAdapter,
} from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { SharedModule } from './shared/shared.module';
import { ApiConfigService } from './shared/services/api-config.service';

async function bootstrap(): Promise<NestExpressApplication> {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
    { cors: true },
  );
  app.use(helmet());

  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //     errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
  //     transform: true,
  //     dismissDefaultMessages: true,
  //     exceptionFactory: (errors) => new UnprocessableEntityException(errors),
  //   }),
  // );

  const config = new DocumentBuilder()
    .setTitle('Airport AI Exercise')
    .setDescription('Airport AI description')
    .setVersion('1.0')
    .addTag('airportai')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.use(expressCtx);

  const configService = app.select(SharedModule).get(ApiConfigService);

  await app.listen(3000);
  console.info(`server running on ${await app.getUrl()}`);

  return app;
}
bootstrap();
