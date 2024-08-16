import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { SalesDailyService } from './sales-daily.service'
import { EnvService } from '../env/env.service'
import {
  symbol as IPuppeteerService,
  PuppeteerService,
} from '../puppeteer/puppeteer.service'
import { SalesDailyCommand } from './sales-daily.command'
import { configuration } from '../env/utils'
import { EnvModule } from '../env/env.module'
import { HttpModule } from '@nestjs/axios'
import { SupabaseModule } from 'src/supabase/supabase.module'
import { SupabaseService } from 'src/supabase/supabase.service'
import { DiscordModule } from 'src/discord/discord.module'
import { DiscordService } from 'src/discord/discord.service'
import { PeatixOrderService } from 'src/peatix-order/peatix-order.service'
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
    SupabaseModule,
    PeatixOrderModule,
    DiscordModule,
  ],
  providers: [
    ConfigService,
    EnvService,
    {
      provide: IPuppeteerService,
      useClass: PuppeteerService,
    },
    SalesDailyCommand,
    SalesDailyService,
    SupabaseService,
    PeatixOrderService,
    DiscordService,
  ],
})
export class SalesDailyModule {}
