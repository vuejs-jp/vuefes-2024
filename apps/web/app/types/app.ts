type SponsorType = 'platinum' | 'gold' | 'silver' | 'bronze' | 'option' | 'option-separate'

export type SponsorCategories =
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

type OptionCategory = 'name-card'
  | 'special-naming-rights'
  | 'after-party'
  | 'simultaneous-interpretation'
  | 'special-lunch'
  | 'media'
  | 'tool'

export type Sponsor = {
  id: string
  name: string
  image_url: string
  option_categories: Array<SponsorType | OptionCategory>
  link_url: string
}

export type SponsorInfo = {
  type: SponsorType
  title: string
  list: Sponsor[]
}
