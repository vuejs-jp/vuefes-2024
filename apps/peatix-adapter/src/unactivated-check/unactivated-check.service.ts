import { Injectable, Logger } from '@nestjs/common'
import { SupabaseService } from 'src/supabase/supabase.service'
import { DiscordService } from 'src/discord/discord.service'

@Injectable()
export class UnactivatedCheckService {
  private readonly logger = new Logger(UnactivatedCheckService.name)

  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly discordService: DiscordService,
  ) {
    //
  }

  async apply() {
    this.supabaseService.updateUnactivatedAttendees()

    // this.discordService.send('After Purchase Bot', '未反映者 反映済')
  }
}
