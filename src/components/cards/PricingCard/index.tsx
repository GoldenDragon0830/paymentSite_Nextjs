import React from 'react'
import { CMSLink } from '@components/CMSLink'
import { ArrowIcon } from '@icons/ArrowIcon'
import { PricingCardProps } from '../types'

import classes from './index.module.scss'

export const PricingCard: React.FC<PricingCardProps> = props => {
  const { title, className, leader, description } = props

  const hasLink = props.link.url || props.link.reference 

  return (
    <div
      className={[
        className,
        classes.card,
        !hasLink && classes.noLink,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <CMSLink className={classes.link} {...props.link}>
        {leader && <span className={classes.leader}>{leader}</span>}
        <div className={classes.content}>
            {title && <h3 className={classes.title}>{title}</h3>}
            {description && <div className={classes.description}>{description}</div>}
        </div>
        <ArrowIcon className={classes.arrow} />
      </CMSLink>
    </div>
  )
}
