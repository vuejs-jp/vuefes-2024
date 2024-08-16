import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { UnactivatedCheckService } from './unactivated-check.service'
import { EnvService } from '../env/env.service'
import {
  symbol as IPuppeteerService,
  PuppeteerService,
} from '../puppeteer/puppeteer.service'
import { UnactivatedCheckCommand } from './unactivated-check.command'
import { configuration } from '../env/utils'
import { EnvModule } from '../env/env.module'
import { HttpModule } from '@nestjs/axios'
import { SupabaseModule } from 'src/supabase/supabase.module'
import { SupabaseService } from 'src/supabase/supabase.service'
import { DiscordModule } from 'src/discord/discord.module'
import { DiscordService } from 'src/discord/discord.service'

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
    DiscordModule,
  ],
  providers: [
    ConfigService,
    EnvService,
    {
      provide: IPuppeteerService,
      useClass: PuppeteerService,
    },
    UnactivatedCheckCommand,
    UnactivatedCheckService,
    SupabaseService,
    DiscordService,
  ],
})
export class UnactivatedCheckModule {}
