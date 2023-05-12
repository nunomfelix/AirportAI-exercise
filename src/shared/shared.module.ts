import type { Provider } from '@nestjs/common';
import { Global, Module } from '@nestjs/common';
import { ApiConfigService } from './services/api-config.service';
import { GeneratorService } from './services/generator.service';

const providers: Provider[] = [ApiConfigService, GeneratorService];

@Global()
@Module({
  providers,
  imports: [],
  exports: [...providers],
})
export class SharedModule {}
