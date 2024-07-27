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
    this.logger.log(orders)

    const receipts: AttendeeReceipt[] = orders.map((attendee) => {
      const receiptId = attendee[Object.keys(attendee)[0]]
      const ticketName = attendee[Object.keys(attendee)[4]]

      // チケット名から参加者の種別を特定する
      if (ticketName.includes(Constants.PEATIX_GENERAL_TICKET)) {
        return { role: Constants.PEATIX_GENERAL_ROLE, receipt_id: receiptId }
      }
      if (ticketName.includes(Constants.PEATIX_WITH_PARTY_TICKET)) {
        return { role: Constants.PEATIX_WITH_PARTY_ROLE, receipt_id: receiptId }
      }

      // return { role: 'attendee', receipt_id: receiptId }
    })
    this.logger.log(receipts)

    this.discordService.send('After Purchase Bot', `${receipts.length}件 購入済`)

    // let i = 0

    // Peatix 購入情報を Supabase へ反映する
    for (const receipt of receipts) {
      this.logger.log(receipt)
      // const result = await this.supabaseService.updateAttendees(receipt)
      // if (!result) {
      //   break
      // }
      // i += 1
    }

    // this.discordService.send('After Purchase Bot', `${receipts.length}件 購入済 / ${i}件 反映済`)
  }
}
