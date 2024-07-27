import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { configuration } from 'src/env/utils'
import { EnvModule } from 'src/env/env.module'
import { HttpModule } from '@nestjs/axios'
import { EnvService } from 'src/env/env.service'
import { DiscordService } from './discord.service'

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
    DiscordService,
  ],
  exports: [DiscordService],
})
export class DiscordModule {}
