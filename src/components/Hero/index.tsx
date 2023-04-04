import React from 'react'

import { Page } from '@root/payload-types'
import { ContentMediaHero } from './ContentMedia'
import { DefaultHero } from './Default'
import { FormHero } from './FormHero'
import { HomeHero } from './Home'
import { LivestreamHero } from './Livestream'

import classes from './index.module.scss'

const heroes = {
  default: DefaultHero,
  contentMedia: ContentMediaHero,
  home: HomeHero,
  form: FormHero,
  livestream: LivestreamHero,
}

export const Hero: React.FC<{
  page: Page
}> = props => {
  const {
    page: {
      hero,
      breadcrumbs,
      hero: { type },
    },
  } = props

  const HeroToRender = heroes[type] as any

  if (HeroToRender) {
    return (
      <div className={classes.hero}>
        <HeroToRender {...hero} breadcrumbs={breadcrumbs} />
      </div>
    )
  }

  return null
}
