import db from '../db'
import { defineEventHandler } from 'h3'
import type { Sponsor, SponsorInfo } from '@vuejs-jp/model'
import { serverSupabaseClient } from '#supabase/server'
import { Database } from '~/types/supabase'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  let sponsors: Sponsor[] = []

  if (config.public.sponsorDatasource === 'local') {
    const response = await db.sponsor.getList()
    sponsors = response.default as Sponsor[]
  }

  if (config.public.sponsorDatasource === 'supabase') {
    const client = await serverSupabaseClient<Database>(event)
    const { data: _sponsors } = await client.from('sponsors').select() as { data: Sponsor[] }
    sponsors = _sponsors
  }

  const platinumSponsors: SponsorInfo = {
    type: 'platinum',
    title: 'platinum',
    list: sponsors
      .filter((s: Sponsor) => {
        if (process.env.NODE_ENV === 'production') return s['tag'].includes('platinum') && s.is_open === true
        return s['tag'].includes('platinum')
      })
      .sort((a: Sponsor, b: Sponsor) => {
        if (!a.display_order) return a.created_at < b.created_at ? -1 : 1
        if (!b.display_order) return a.created_at < b.created_at ? -1 : 1
        return a.display_order - b.display_order
      }),
  }

  const goldSponsors: SponsorInfo = {
    type: 'gold',
    title: 'gold',
    list: sponsors
      .filter((s: Sponsor) => {
        if (process.env.NODE_ENV === 'production') return s['tag'].includes('gold') && s.is_open === true
        return s['tag'].includes('gold')
      })
      .sort((a: Sponsor, b: Sponsor) => {
        if (!a.display_order) return a.created_at < b.created_at ? -1 : 1
        if (!b.display_order) return a.created_at < b.created_at ? -1 : 1
        return a.display_order - b.display_order
      }),
  }

  const silverSponsors: SponsorInfo = {
    type: 'silver',
    title: 'silver',
    list: sponsors
      .filter((s: Sponsor) => {
        if (process.env.NODE_ENV === 'production') return s['tag'].includes('silver') && s.is_open === true
        return s['tag'].includes('silver')
      })
      .sort((a: Sponsor, b: Sponsor) => {
        if (!a.display_order) return a.created_at < b.created_at ? -1 : 1
        if (!b.display_order) return a.created_at < b.created_at ? -1 : 1
        return a.display_order - b.display_order
      }),
  }

  const bronzeSponsors: SponsorInfo = {
    type: 'bronze',
    title: 'bronze',
    list: sponsors
      .filter((s: Sponsor) => {
        if (process.env.NODE_ENV === 'production') return s['tag'].includes('bronze') && s.is_open === true
        return s['tag'].includes('bronze')
      })
      .sort((a: Sponsor, b: Sponsor) => {
        if (!a.display_order) return a.created_at < b.created_at ? -1 : 1
        if (!b.display_order) return a.created_at < b.created_at ? -1 : 1
        return a.display_order - b.display_order
      }),
  }

  const specialNamingRightSponsors: SponsorInfo = {
    type: 'option',
    title: 'special_naming_rights',
    list: sponsors
      .filter((s: Sponsor) => {
        if (process.env.NODE_ENV === 'production') return s['tag'].includes('special-naming-rights') && s.is_open === true
        return s['tag'].includes('special-naming-rights')
      })
      .sort((a: Sponsor, b: Sponsor) => {
        if (!a.display_order) return a.created_at < b.created_at ? -1 : 1
        if (!b.display_order) return a.created_at < b.created_at ? -1 : 1
        return a.display_order - b.display_order
      }),
  }

  const specialLunchSponsors: SponsorInfo = {
    type: 'option-separate',
    title: 'special_lunch',
    list: sponsors
      .filter((s: Sponsor) => {
        if (process.env.NODE_ENV === 'production') return s['tag'].includes('special-lunch') && s.is_open === true
        return s['tag'].includes('special-lunch')
      })
      .sort((a: Sponsor, b: Sponsor) => {
        if (!a.display_order) return a.created_at < b.created_at ? -1 : 1
        if (!b.display_order) return a.created_at < b.created_at ? -1 : 1
        return a.display_order - b.display_order
      }),
  }

  const afterPartySponsors: SponsorInfo = {
    type: 'option-separate',
    title: 'after_party',
    list: sponsors
      .filter((s: Sponsor) => {
        if (process.env.NODE_ENV === 'production') return s['tag'].includes('after-party') && s.is_open === true
        return s['tag'].includes('after-party')
      })
      .sort((a: Sponsor, b: Sponsor) => {
        if (!a.display_order) return a.created_at < b.created_at ? -1 : 1
        if (!b.display_order) return a.created_at < b.created_at ? -1 : 1
        return a.display_order - b.display_order
      }),
  }

  const nameCardSponsors: SponsorInfo = {
    type: 'option-separate',
    title: 'name_card',
    list: sponsors
      .filter((s: Sponsor) => {
        if (process.env.NODE_ENV === 'production') return s['tag'].includes('name-card') && s.is_open === true
        return s['tag'].includes('name-card')
      })
      .sort((a: Sponsor, b: Sponsor) => {
        if (!a.display_order) return a.created_at < b.created_at ? -1 : 1
        if (!b.display_order) return a.created_at < b.created_at ? -1 : 1
        return a.display_order - b.display_order
      }),
  }

  const simultaneousInterpretationSponsors: SponsorInfo = {
    type: 'option-separate',
    title: 'simultaneous_interpretation',
    list: sponsors
      .filter((s: Sponsor) => {
        if (process.env.NODE_ENV === 'production') return s['tag'].includes('simultaneous-interpretation') && s.is_open === true
        return s['tag'].includes('simultaneous-interpretation')
      })
      .sort((a: Sponsor, b: Sponsor) => {
        if (!a.display_order) return a.created_at < b.created_at ? -1 : 1
        if (!b.display_order) return a.created_at < b.created_at ? -1 : 1
        return a.display_order - b.display_order
      }),
  }

  const mediaSponsors: SponsorInfo = {
    type: 'option',
    title: 'media',
    list: sponsors
      .filter((s: Sponsor) => {
        if (process.env.NODE_ENV === 'production') return s['tag'].includes('media') && s.is_open === true
        return s['tag'].includes('media')
      })
      .sort((a: Sponsor, b: Sponsor) => {
        if (!a.display_order) return a.created_at < b.created_at ? -1 : 1
        if (!b.display_order) return a.created_at < b.created_at ? -1 : 1
        return a.display_order - b.display_order
      }),
  }

  const toolSponsors: SponsorInfo = {
    type: 'option',
    title: 'tool',
    list: sponsors
      .filter((s: Sponsor) => {
        if (process.env.NODE_ENV === 'production') return s['tag'].includes('tool') && s.is_open === true
        return s['tag'].includes('tool')
      })
      .sort((a: Sponsor, b: Sponsor) => {
        if (!a.display_order) return a.created_at < b.created_at ? -1 : 1
        if (!b.display_order) return a.created_at < b.created_at ? -1 : 1
        return a.display_order - b.display_order
      }),
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
