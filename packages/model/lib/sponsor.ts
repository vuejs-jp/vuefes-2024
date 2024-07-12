type SponsorType = 'platinum' | 'gold' | 'silver' | 'bronze' | 'option' | 'option-separate'

export type SponsorCategory =
  | 'platinumSponsors'
  | 'goldSponsors'
  | 'silverSponsors'
  | 'bronzeSponsors'
  | 'specialNamingRightSponsors'
  | 'specialLunchSponsors'
  | 'afterPartySponsors'
  | 'nameCardSponsors'
  | 'simultaneousInterpretationSponsors'
  | 'mediaSponsors'
  | 'toolSponsors'


type Tag = 'name-card'
  | 'special-naming-rights'
  | 'after-party'
  | 'simultaneous-interpretation'
  | 'special-lunch'
  | 'media'
  | 'tool'

export type Sponsor = {
  id: string
  name: string
  detail_page_id?: string
  description_ja: string
  description_en: string
  speaker_id?: string
  image_url: string
  tag: Array<SponsorType | Tag>
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
