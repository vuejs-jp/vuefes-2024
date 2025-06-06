export type SponsorType = 'platinum' | 'gold' | 'silver' | 'bronze' | 'option' | 'option-separate' | PersonalSponsorType

export type PersonalSponsorType = 'personal'

export type SponsorCategory =
  | 'platinumSponsors'
  | 'goldSponsors'
  | 'silverSponsors'
  | 'bronzeSponsors'
  | 'specialNamingRightSponsors'
  | 'namingRightSponsors'
  | 'specialLunchSponsors'
  | 'lunchSponsors'
  | 'afterPartySponsors'
  | 'nameCardSponsors'
  | 'simultaneousInterpretationSponsors'
  | 'childcareSponsors'
  | 'handsonSponsors'
  | 'mediaSponsors'
  | 'toolSponsors'
  | 'personalSponsors'


export type OptionSponsorType =
  | 'name-card'
  | 'special-naming-rights'
  | 'naming-rights'
  | 'after-party'
  | 'simultaneous-interpretation'
  | 'childcare'
  | 'special-lunch'
  | 'lunch'
  | 'handson'
  | 'media'
  | 'tool'

export type Sponsor = {
  id: string
  name: string
  detail_page_id?: string
  description_ja: string
  description_en: string
  speaker_id?: string[]
  image_url: string
  share_image_url: string
  tag: Array<SponsorType | OptionSponsorType>
  link_url: string
  is_open: boolean
  display_order?: number
  created_at: string
  updated_at: string
}

export type SponsorInfo = {
  type: SponsorType
  title: string
  list: Sponsor[]
}

export type PersonalSponsorInfo = {
  type: PersonalSponsorType
  title: string
  list: string[]
}
