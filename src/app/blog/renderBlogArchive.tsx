'use client'

import React from 'react'
import { Cell, Grid } from '@faceless-ui/css-grid'
import { DefaultHero } from '@components/Hero/Default'
import { BlockSpacing } from '@components/BlockSpacing'
import { Post } from '@root/payload-types'
import { ContentMediaCard } from '@components/cards/ContentMediaCard'
import { Gutter } from '@components/Gutter'
import { formatDate } from '@utilities/format-date-time'

import classes from './index.module.scss'

export const RenderBlogArchive: React.FC<{ posts: Post[] }> = ({ posts }) => {
  const currentDate = formatDate({ date: new Date() })
  return (
    <React.Fragment>
      <DefaultHero
        richText={[
          {
            type: 'h2',
            children: [
              {
                text: 'Keep tabs on Payload.',
              },
            ],
          },
          {
            text: 'Here, you’ll find news about feature releases, happenings in the industry, and Payload announcements in general.',
          },
        ]}
      />
      <Gutter>
        <BlockSpacing>
          <Grid>
            {(posts || []).map(blogPost => {
              const { publishedOn } = blogPost
              const publishedDate = formatDate({ date: publishedOn })

              if (publishedDate <= currentDate) {
                return (
                  <Cell key={blogPost.id} cols={4} colsS={8} className={classes.blogPost}>
                    <ContentMediaCard
                      title={blogPost.title}
                      description={blogPost?.meta?.description}
                      href={`/blog/${blogPost.slug}`}
                      media={blogPost.image}
                    />
                  </Cell>
                )
              }
              return null
            })}
          </Grid>
        </BlockSpacing>
      </Gutter>
    </React.Fragment>
  )
}

export default RenderBlogArchive
