'use client'

import React, { Fragment } from 'react'
import { CaseStudyCards } from '@components/blocks/CaseStudyCards'
import { FormBlock } from '../blocks/FormBlock'
import { CardGrid } from '../blocks/CardGrid'
import { MediaContent } from '../blocks/MediaContent'
import { HoverHighlights } from '../blocks/HoverHighlights'
import { CodeFeature } from '../blocks/CodeFeature'
import { Page, ReusableContent } from '../../payload-types'
import { toKebabCase } from '../../utilities/to-kebab-case'
import { BlockSpacing } from '../BlockSpacing'
import { BannerBlock } from '../blocks/Banner'
import { BlogContent } from '../blocks/BlogContent'
import { MediaBlock } from '../blocks/MediaBlock'
import { CodeBlock } from '../blocks/CodeBlock'
import { HeaderObserver } from '../HeaderObserver'
import { useTheme } from '../providers/Theme'
import { ContentBlock } from '../blocks/Content'
import { Slider } from '../blocks/Slider'
import { CaseStudiesHighlightBlock } from '../blocks/CaseStudiesHighlight'
import { Steps } from '../blocks/Steps'
import { StickyHighlights } from '../blocks/StickyHighlights'

type ReusableContentBlock = Extract<Page['layout'][0], { blockType: 'reusableContentBlock' }>

const blockComponents = {
  banner: BannerBlock,
  blogContent: BlogContent,
  caseStudiesHighlight: CaseStudiesHighlightBlock,
  caseStudyCards: CaseStudyCards,
  mediaBlock: MediaBlock,
  code: CodeBlock,
  content: ContentBlock,
  form: FormBlock,
  slider: Slider,
  cardGrid: CardGrid,
  mediaContent: MediaContent,
  steps: Steps,
  stickyHighlights: StickyHighlights,
  hoverHighlights: HoverHighlights,
  codeFeature: CodeFeature,
}

type Props = {
  blocks: (ReusableContent['layout'][0] | ReusableContentBlock)[]
  disableOuterSpacing?: true
}

export const RenderBlocks: React.FC<Props> = props => {
  const { blocks, disableOuterSpacing } = props
  const theme = useTheme()

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <HeaderObserver color={theme}>
        <Fragment>
          {blocks.map((block, index) => {
            const { blockName, blockType } = block

            if (blockType && blockType in blockComponents) {
              const Block = blockComponents[blockType]

              const hasSpacing = !['banner', 'blogContent', 'code'].includes(blockType)

              let topSpacing = hasSpacing
              let bottomSpacing = hasSpacing

              if (disableOuterSpacing && hasSpacing) {
                if (index === 0) topSpacing = false
                if (index === blocks.length - 1) bottomSpacing = false
              }

              if (Block) {
                return (
                  <BlockSpacing key={index} top={topSpacing} bottom={bottomSpacing}>
                    <Block id={toKebabCase(blockName)} {...block} />
                  </BlockSpacing>
                )
              }
            }
            return null
          })}
        </Fragment>
      </HeaderObserver>
    )
  }

  return null
}
