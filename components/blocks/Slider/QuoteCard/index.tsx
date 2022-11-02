import * as React from 'react'
import { RichText } from '@components/RichText'
import { Page } from '@root/payload-types'
import { ThemeProvider } from '@components/providers/Theme'
import { QuoteIcon } from '@components/icons/QuoteIcon'

import { formatDateTime } from '@root/utilities/format-date-time'
import classes from './index.module.scss'

type Props = Extract<Page['layout'][0], { blockType: 'slider' }>['sliderFields']['quoteSlides'][0]
export const QuoteCard: React.FC<Props> = ({ richText, quoteDate }) => {
  return (
    <ThemeProvider theme="dark" className={classes.quoteCard}>
      <QuoteIcon className={classes.icon} />
      <RichText content={richText} />
      <time className={classes.date} dateTime={quoteDate}>
        {formatDateTime(quoteDate)}
      </time>
    </ThemeProvider>
  )
}
