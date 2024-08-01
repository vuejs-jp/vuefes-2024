import { Module } from '@nestjs/common'
import { PeatixOrderService } from './peatix-order.service'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { configuration } from 'src/env/utils'
import { EnvModule } from 'src/env/env.module'
import { HttpModule } from '@nestjs/axios'
import { EnvService } from 'src/env/env.service'
import {
  symbol as IPuppeteerService,
  PuppeteerService,
} from 'src/puppeteer/puppeteer.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      expandVariables: true,
      load: [configuration],
    }),
    EnvModule,
    HttpModule,
  ],
  providers: [
    ConfigService,
    EnvService,
    {
      provide: IPuppeteerService,
      useClass: PuppeteerService,
    },
    PeatixOrderService,
  ],
  exports: [PeatixOrderService],
})
export class PeatixOrderModule {}
