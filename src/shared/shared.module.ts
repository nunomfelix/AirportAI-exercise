import type { Provider } from '@nestjs/common';
import { Global, Module } from '@nestjs/common';
import { ApiConfigService } from './services/api-config.service';
import { GeneratorService } from './services/generator.service';
import { OpenAiService } from './services/openai.service';

const providers: Provider[] = [
  ApiConfigService,
  GeneratorService,
  OpenAiService,
];

@Global()
@Module({
  providers,
  imports: [],
  exports: [...providers],
})
export class SharedModule {}
