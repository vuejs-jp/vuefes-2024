import { Injectable, Logger } from '@nestjs/common'
import { SupabaseService } from 'src/supabase/supabase.service'
import { DiscordService } from 'src/discord/discord.service'
import { PeatixOrderService } from 'src/peatix-order/peatix-order.service'
import { AttendeeReceipt } from 'src/types/supabase'
import { Constants } from 'src/constnats'

@Injectable()
export class SalesDailyService {
  private readonly logger = new Logger(SalesDailyService.name)

  constructor(
    private readonly peatixOrderService: PeatixOrderService,
    private readonly supabaseService: SupabaseService,
    private readonly discordService: DiscordService,
  ) {
    //
  }

  async apply() {
    const orders = await this.peatixOrderService.getOrders()

    const receipts: AttendeeReceipt[] = orders
      .map((attendee) => {
        const appliedAt = attendee[Object.keys(attendee)[Constants.PEATIX_APPLIED_AT_ROW_INDEX]]
        const receiptId = attendee[Object.keys(attendee)[Constants.PEATIX_RECEIPT_ID_ROW_INDEX]]
        const ticketName = attendee[Object.keys(attendee)[Constants.PEATIX_RECEIPTS_TICKET_NAME_ROW_INDEX]]

        const d = new Date(appliedAt)
        const appliedDate = `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`

        // チケット名から参加者の種別を特定する
        if (ticketName.includes(Constants.PEATIX_GENERAL_TICKET)) {
          return { date: appliedDate, role: Constants.PEATIX_GENERAL_ROLE, receipt_id: receiptId }
        }
        if (ticketName.includes(Constants.PEATIX_WITH_PARTY_TICKET)) {
          return { date: appliedDate, role: Constants.PEATIX_WITH_PARTY_ROLE, receipt_id: receiptId }
        }

      // return { role: 'attendee', receipt_id: receiptId }
    })
    .filter(v => v) // null は除外

    const startedDate = new Date(2024, 7 - 1, 29)
    let archives = [[], [], []]
    for (let date = startedDate; date <= new Date(); date.setDate(date.getDate() + 1)) {
      archives[0].push(`${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`)
      archives[1].push(`${receipts.filter(v => v.role === Constants.PEATIX_GENERAL_ROLE).filter(v => v.date.includes(`${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`)).length}`)
      archives[2].push(`${receipts.filter(v => v.role === Constants.PEATIX_WITH_PARTY_ROLE).filter(v => v.date.includes(`${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`)).length}`)
    }
    for (const archive of archives) {
      this.logger.log(`${archive.join(',')}`)
      this.discordService.send('After Purchase Bot', `${archive.join(',')}`)
    }
  }
}
