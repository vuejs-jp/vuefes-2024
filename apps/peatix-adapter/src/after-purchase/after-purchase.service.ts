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
    const _personalSponsors: string[] = orders
      .map((attendee) => attendee[Object.keys(attendee)[Constants.PEATIX_PERSONAL_SPONSOR_NAME_ROW_INDEX]])
      .filter(v => v) // null は除外
    const personalSponsors = [...new Set(_personalSponsors)] // 重複を削除
    // this.logger.log(receipts)
    const today = new Date()
    this.logger.log(
      `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}時点の${Constants.PEATIX_GENERAL_TICKET}売上状況: ${receipts.filter(v => v.role === Constants.PEATIX_GENERAL_ROLE).length}枚 (+${receipts.filter(v => v.role === Constants.PEATIX_GENERAL_ROLE).filter(v => v.date.includes(`${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`)).length}枚)`,
    )
    this.logger.log(
      `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}時点の${Constants.PEATIX_WITH_PARTY_TICKET}売上状況: ${receipts.filter(v => v.role === Constants.PEATIX_WITH_PARTY_ROLE).length}枚 (+${receipts.filter(v => v.role === Constants.PEATIX_WITH_PARTY_ROLE).filter(v => v.date.includes(`${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`)).length}枚)`,
    )
    this.logger.log(
      `${Constants.PEATIX_PERSONAL_SPONSOR_TICKET}売上状況: ${personalSponsors.length}枚 ('${personalSponsors.join('\', \'')}')`,
    )
    this.discordService.send(
      'After Purchase Bot', 
      `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}時点の${Constants.PEATIX_GENERAL_TICKET}売上状況: ${receipts.filter(v => v.role === Constants.PEATIX_GENERAL_ROLE).length}枚 (+${receipts.filter(v => v.role === Constants.PEATIX_GENERAL_ROLE).filter(v => v.date.includes(`${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`)).length}枚)`,
    )
    this.discordService.send(
      'After Purchase Bot', 
      `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}時点の${Constants.PEATIX_WITH_PARTY_TICKET}売上状況: ${receipts.filter(v => v.role === Constants.PEATIX_WITH_PARTY_ROLE).length}枚 (+${receipts.filter(v => v.role === Constants.PEATIX_WITH_PARTY_ROLE).filter(v => v.date.includes(`${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`)).length}枚)`,
    )
    this.discordService.send(
      'After Purchase Bot', 
      `${Constants.PEATIX_PERSONAL_SPONSOR_TICKET}売上状況: ${personalSponsors.length}枚 ('${personalSponsors.join('\', \'')}')`,
    )

    this.discordService.send('After Purchase Bot', `${receipts.length}件 購入済`)

    // 各日毎の購入数を集計する
    // const startedDate = new Date(2024, 7 - 1, 29)
    // let archives = [[], [], []]
    // for (let date = startedDate; date <= new Date(); date.setDate(date.getDate() + 1)) {
    //   archives[0].push(`${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`)
    //   archives[1].push(`${receipts.filter(v => v.role === Constants.PEATIX_GENERAL_ROLE).filter(v => v.date.includes(`${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`)).length}`)
    //   archives[2].push(`${receipts.filter(v => v.role === Constants.PEATIX_WITH_PARTY_ROLE).filter(v => v.date.includes(`${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`)).length}`)
    // }
    // for (const archive of archives) {
    //   this.logger.log(`${archive.join(', ')} `)
    // }

    let i = 0

    // Peatix 購入情報を Supabase へ反映する
    for (const receipt of receipts) {
      // this.logger.log(receipt)
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
