import React from 'react'
import { BlockSpacing } from '../../../components/BlockSpacing'
import { Gutter } from '../../../components/Gutter'
import { StyleguideBreadcrumbs } from './Breadcrumbs'
import { RenderDarkMode } from './RenderDarkMode'

export const StyleguidePageContent: React.FC<{
  title?: string
  children: React.ReactNode
}> = ({ title, children }) => {
  return (
    <div>
      <BlockSpacing top={false}>
        <Gutter>
          <StyleguideBreadcrumbs pageTitle={title} />
          <h1>{title || 'Page Title'}</h1>
        </Gutter>
        {children}
      </BlockSpacing>
      <BlockSpacing>
        <RenderDarkMode>{children}</RenderDarkMode>
      </BlockSpacing>
    </div>
  )
}
