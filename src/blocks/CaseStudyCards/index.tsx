import * as React from 'react'
import { Gutter } from '@components/Gutter'
import { Media } from '@components/Media'
import { RichText } from '@components/RichText'
import { Page } from '@root/payload-types'

import { PixelBackground } from '@components/PixelBackground'
import { BlockSpacing } from '@components/BlockSpacing'
import Link from 'next/link'
import classes from './index.module.scss'

type Props = Extract<Page['layout'][0], { blockType: 'caseStudyCards' }>

export const CaseStudyCards: React.FC<Props> = props => {
  const { caseStudyCardFields } = props

  if (caseStudyCardFields.cards.length > 0) {
    return (
      <BlockSpacing className={classes.caseStudyCards}>
        <Gutter>
          {caseStudyCardFields?.cards?.length > 0 && (
            <div className={classes.cards}>
              <div className={classes.bg}>
                <PixelBackground />
              </div>
              {caseStudyCardFields.cards.map((card, i) => {
                if (typeof card.caseStudy === 'object') {
                  return (
                    <Link
                      href={`/case-studies/${card.caseStudy.slug}`}
                      key={i}
                      className={classes.card}
                    >
                      <RichText className={classes.content} content={card.richText} />
                      <div className={classes.media}>
                        {typeof card.caseStudy.featuredImage !== 'string' && (
                          <Media resource={card.caseStudy.featuredImage} fill />
                        )}
                      </div>
                    </Link>
                  )
                }

                return null
              })}
            </div>
          )}
        </Gutter>
      </BlockSpacing>
    )
  }

  return null
}
