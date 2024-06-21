import db from '../db'
import { defineEventHandler } from 'h3'
import type { Sponsor, SponsorInfo } from '@vuejs-jp/model'

export default defineEventHandler(async () => {
  const response = await db.sponsor.getList()
  const sponsors = response.default as Sponsor[]

  const platinumSponsors: SponsorInfo = {
    type: 'platinum',
    title: 'Platinum',
    list: sponsors.filter((s: Sponsor) => s['tag'].includes('platinum'))
  }

  const goldSponsors: SponsorInfo = {
    type: 'gold',
    title: 'Gold',
    list: sponsors.filter((s: Sponsor) => s['tag'].includes('gold'))
  }

  const silverSponsors: SponsorInfo = {
    type: 'silver',
    title: 'Silver',
    list: sponsors.filter((s: Sponsor) => s['tag'].includes('silver'))
  }

  const bronzeSponsors: SponsorInfo = {
    type: 'bronze',
    title: 'Bronze',
    list: sponsors.filter((s: Sponsor) => s['tag'].includes('bronze'))
  }

  const specialNamingRightSponsors: SponsorInfo = {
    type: 'option',
    title: 'special_naming_rights',
    list: sponsors.filter((s: Sponsor) => s['tag'].includes('special-naming-rights'))
  }

  const specialLunchSponsors: SponsorInfo = {
    type: 'option-separate',
    title: 'special_lunch',
    list: sponsors.filter((s: Sponsor) => s['tag'].includes('special-lunch'))
  }

  const afterPartySponsors: SponsorInfo = {
    type: 'option-separate',
    title: 'after_party',
    list: sponsors.filter((s: Sponsor) => s['tag'].includes('after-party'))
  }

  const nameCardSponsors: SponsorInfo = {
    type: 'option-separate',
    title: 'name_card',
    list: sponsors.filter((s: Sponsor) => s['tag'].includes('name-card'))
  }

  const simultaneousInterpretationSponsors: SponsorInfo = {
    type: 'option-separate',
    title: 'simultaneous_interpretation',
    list: sponsors.filter((s: Sponsor) => s['tag'].includes('simultaneous-interpretation'))
  }

  const mediaSponsors: SponsorInfo = {
    type: 'option',
    title: 'media',
    list: sponsors.filter((s: Sponsor) => s['tag'].includes('media'))
  }
  const toolSponsors: SponsorInfo = {
    type: 'option',
    title: 'tool',
    list: sponsors.filter((s: Sponsor) => s['tag'].includes('tool'))
  }
  return {
    platinumSponsors,
    goldSponsors,
    silverSponsors,
    bronzeSponsors,
    specialNamingRightSponsors,
    specialLunchSponsors,
    afterPartySponsors,
    nameCardSponsors,
    simultaneousInterpretationSponsors,
    mediaSponsors,
    toolSponsors
  }
})
