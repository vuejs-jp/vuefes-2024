import { Injectable, Logger } from '@nestjs/common'
import { SupabaseClient, createClient } from '@supabase/supabase-js'
import { EnvService } from 'src/env/env.service'

@Injectable()
export class SupabaseService {
  private readonly logger = new Logger(SupabaseService.name)

  private client: SupabaseClient

  constructor(private readonly envService: EnvService) {
    //
  }

  private getClient() {
    if (this.client) {
      this.logger.log('Client already exists')
      return
    }

    this.client = createClient(
      this.envService.SUPABASE_URL,
      this.envService.SUPABASE_KEY,
    )
  }

  public async fetchAdminUsers() {
    this.getClient()

    const { data } = await this.client.from('admin_users').select()
    return data
  }
}
