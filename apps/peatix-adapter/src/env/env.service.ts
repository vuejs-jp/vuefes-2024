import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class EnvService {
  private readonly logger = new Logger(EnvService.name)

  // eslint-disable-next-line no-unused-vars
  constructor(private readonly configService: ConfigService) {}

  isProduction(): boolean {
    return this.configService.get('NODE_ENV') === 'production'
  }

  get PEATIX_EVENT_ID() {
    return this.configService.getOrThrow('peatixEventId')
  }

  get PEATIX_BASIC_EMAIL() {
    return this.configService.getOrThrow('peatixBasicEmail')
  }

  get PEATIX_BASIC_PASSWORD() {
    return this.configService.getOrThrow('peatixBasicPassword')
  }

  get SUPABASE_URL() {
    return this.configService.getOrThrow('supabaseUrl')
  }

  get SUPABASE_KEY() {
    return this.configService.getOrThrow('supabaseKey')
  }
}
