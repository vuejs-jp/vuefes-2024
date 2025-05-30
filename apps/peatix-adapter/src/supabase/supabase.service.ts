import { Injectable, Logger } from '@nestjs/common'
import { SupabaseClient, createClient } from '@supabase/supabase-js'
import { EnvService } from 'src/env/env.service'
import { AttendeeReceipt, Database } from 'src/types/supabase'

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

    this.client = createClient<Database>(
      this.envService.SUPABASE_URL,
      this.envService.SUPABASE_KEY,
    )
  }

  public async fetchAdminUsers() {
    this.getClient()

    const { data } = await this.client.from('admin_users').select()
    return data
  }

  // vuejs-jp/vuefes-2024-backside#226
  public async updateAttendees(targets: AttendeeReceipt) {
    this.getClient()

    const targetData = { ...targets }

    const { data, error } = await this.client.from('attendees')
      .update({ role: targetData.role, activated_at: new Date().toISOString(), canceled_at: null })
      .eq('receipt_id', targetData.receipt_id)
      .is('activated_at', null)
    if (error) return { status: false, data: null }

    return { status: true, data }
  }

  public async updateUnactivatedAttendees() {
    this.getClient()

    const { data, error } = await this.client.from('attendees')
      .update({ canceled_at: new Date().toISOString() })
      .is('activated_at', null)
    if (error) return { status: false, data: null }

    return { status: true, data }
  }
}
