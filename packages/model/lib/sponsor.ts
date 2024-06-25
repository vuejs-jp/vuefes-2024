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
  image_url: string
  tag: Array<SponsorType | Tag>
  link_url: string
}

export type SponsorInfo = {
  type: SponsorType
  title: string
  list: Sponsor[]
}
