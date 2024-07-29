import { Injectable, Logger } from '@nestjs/common'
import { PeatixOrderService } from '../peatix-order/peatix-order.service'
import { AttendeeReceipt } from 'src/types/supabase'
import { Constants } from 'src/constnats'
import { SupabaseService } from 'src/supabase/supabase.service'
import { DiscordService } from 'src/discord/discord.service'

@Injectable()
export class AfterPurchaseService {
  private readonly logger = new Logger(AfterPurchaseService.name)

  constructor(
    private readonly peatixOrderService: PeatixOrderService,
    private readonly supabaseService: SupabaseService,
    private readonly discordService: DiscordService,
  ) {
    //
  }

  async apply() {
    const orders = await this.peatixOrderService.getOrders()
    // this.logger.log(orders)

    const receipts: AttendeeReceipt[] = orders
      .map((attendee) => {
        const receiptId = attendee[Object.keys(attendee)[Constants.PEATIX_RECEIPT_ID_ROW_INDEX]]
        const ticketName = attendee[Object.keys(attendee)[Constants.PEATIX_RECEIPTS_TICKET_NAME_ROW_INDEX]]

        // チケット名から参加者の種別を特定する
        if (ticketName.includes(Constants.PEATIX_GENERAL_TICKET)) {
          return { role: Constants.PEATIX_GENERAL_ROLE, receipt_id: receiptId }
        }
        if (ticketName.includes(Constants.PEATIX_WITH_PARTY_TICKET)) {
          return { role: Constants.PEATIX_WITH_PARTY_ROLE, receipt_id: receiptId }
        }

        // return { role: 'attendee', receipt_id: receiptId }
      })
      .filter(v => v) // null は除外
    const personalSponsors: string[] = orders
      .map((attendee) => attendee[Object.keys(attendee)[Constants.PEATIX_PERSONAL_SPONSOR_NAME_ROW_INDEX]])
      .filter(v => v) // null は除外
    // this.logger.log(receipts)
    this.logger.log(personalSponsors)

    this.discordService.send('After Purchase Bot', `${receipts.length}件 購入済`)

    let i = 0

    // Peatix 購入情報を Supabase へ反映する
    for (const receipt of receipts) {
      this.logger.log(receipt)
      const result = await this.supabaseService.updateAttendees(receipt)
      if (result.status === false) {
        // break
      }
      if (result.data !== null) {
        i += 1
      }
    }

    this.discordService.send('After Purchase Bot', `${receipts.length}件 購入済 / ${i}件 反映済`)
  }
}
