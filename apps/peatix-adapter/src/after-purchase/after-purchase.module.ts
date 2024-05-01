import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AfterPurchaseService } from './after-purchase.service'
import { EnvService } from '../env/env.service'
import {
  IPuppeteerService,
  PuppeteerService,
} from '../puppeteer/puppeteer.service'
import { AfterPurchaseCommand } from './after-purchase.command'
import { configuration } from '../env/utils'
import { EnvModule } from '../env/env.module'
import { PeatixOrderService } from '../peatix-order/peatix-order.service'
import { HttpModule } from '@nestjs/axios'
import { PeatixOrderModule } from 'src/peatix-order/peatix-order.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      expandVariables: true,
      load: [configuration],
    }),
    EnvModule,
    HttpModule,
    PeatixOrderModule,
  ],
  providers: [
    ConfigService,
    EnvService,
    {
      provide: IPuppeteerService,
      useClass: PuppeteerService,
    },
    AfterPurchaseCommand,
    AfterPurchaseService,
    PeatixOrderService,
  ],
})
export class AfterPurchaseModule {}
