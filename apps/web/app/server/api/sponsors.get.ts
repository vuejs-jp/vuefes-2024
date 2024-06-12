import db from '../db'
import { defineEventHandler } from 'h3'
import type { Sponsor, SponsorInfo } from '~/types/app'

export default defineEventHandler(async () => {
  const response = await db.sponsor.getList()
  const sponsors = response.default as Sponsor[]

  const platinumSponsors: SponsorInfo = {
    type: 'platinum',
    title: 'Platinum',
    list: sponsors.filter((s: Sponsor) => s['option_categories'].includes('platinum'))
  }

  const goldSponsors: SponsorInfo = {
    type: 'gold',
    title: 'Gold',
    list: sponsors.filter((s: Sponsor) => s['option_categories'].includes('gold'))
  }

  const silverSponsors: SponsorInfo = {
    type: 'silver',
    title: 'Silver',
    list: sponsors.filter((s: Sponsor) => s['option_categories'].includes('silver'))
  }

  const bronzeSponsors: SponsorInfo = {
    type: 'bronze',
    title: 'Bronze',
    list: sponsors.filter((s: Sponsor) => s['option_categories'].includes('bronze'))
  }

  const specialNamingRightSponsors: SponsorInfo = {
    type: 'option',
    title: 'Special Naming Rights',
    list: sponsors.filter((s: Sponsor) => s['option_categories'].includes('special-naming-rights'))
  }

  const specialLunchSponsors: SponsorInfo = {
    type: 'option-separate',
    title: 'Special Lunch',
    list: sponsors.filter((s: Sponsor) => s['option_categories'].includes('special-lunch'))
  }

  const afterPartySponsors: SponsorInfo = {
    type: 'option-separate',
    title: 'After Party',
    list: sponsors.filter((s: Sponsor) => s['option_categories'].includes('after-party'))
  }

  const nameCardSponsors: SponsorInfo = {
    type: 'option-separate',
    title: 'Name Card',
    list: sponsors.filter((s: Sponsor) => s['option_categories'].includes('name-card'))
  }

  const simultaneousInterpretationSponsors: SponsorInfo = {
    type: 'option-separate',
    title: 'Simultaneous Interpretation',
    list: sponsors.filter((s: Sponsor) => s['option_categories'].includes('simultaneous-interpretation'))
  }

  const mediaSponsors: SponsorInfo = {
    type: 'option',
    title: 'Media',
    list: sponsors.filter((s: Sponsor) => s['option_categories'].includes('media'))
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
  }
})
