import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { SupabaseService } from './supabase.service'
import { EnvModule } from 'src/env/env.module'
import { configuration } from 'src/env/utils'
import { EnvService } from 'src/env/env.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      expandVariables: true,
      load: [configuration],
    }),
    EnvModule,
  ],
  providers: [
    ConfigService,
    EnvService,
    SupabaseService,
  ],
  exports: [SupabaseService],
})
export class SupabaseModule {}
