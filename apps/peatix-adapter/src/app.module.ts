import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { configuration } from './env/utils'
import { SentryModule } from '@ntegral/nestjs-sentry'
import { EnvModule } from './env/env.module'
import { EnvService } from './env/env.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      expandVariables: true,
      load: [configuration],
    }),
    SentryModule.forRootAsync({
      imports: [EnvModule],
      useFactory: (envService: EnvService) => ({
        dsn: envService.SENTRY_DSN,
        debug: false,
        logLevels: ['error'],
      }),
      inject: [EnvService],
    }),
    EnvModule,

  ]
})
export class AppModule {}
