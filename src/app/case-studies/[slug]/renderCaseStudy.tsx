'use client'

import React from 'react'
import { Cell, Grid } from '@faceless-ui/css-grid'
import { CaseStudy } from '@types'
import { Breadcrumbs } from '@components/Breadcrumbs'
import { Gutter } from '../../../components/Gutter'

import { RichText } from '../../../components/RichText'
import { Button } from '../../../components/Button'
import { Media } from '../../../components/Media'
import { RenderBlocks } from '../../../components/RenderBlocks'

import classes from './index.module.scss'

export const RenderCaseStudy: React.FC<CaseStudy> = props => {
  const { title, featuredImage, introContent, layout, url } = props

  return (
    <React.Fragment>
      <Gutter>
        <Breadcrumbs
          items={[
            {
              label: 'Case Studies',
              href: `/case-studies`,
            },
            {
              label: title,
            },
          ]}
        />
        <Grid>
          <Cell cols={9}>
            <RichText content={introContent} />
          </Cell>

          <Cell start={10} cols={3}>
            <Button
              appearance="default"
              el="a"
              href={url}
              newTab
              label="Visit Site"
              labelStyle="mono"
              icon="arrow"
            />
          </Cell>
        </Grid>

        {typeof featuredImage !== 'string' && (
          <div className={classes.featuredMediaWrap}>
            <Media resource={featuredImage} />
          </div>
        )}
      </Gutter>

      <RenderBlocks blocks={layout} />
    </React.Fragment>
  )
}

export default RenderCaseStudy
