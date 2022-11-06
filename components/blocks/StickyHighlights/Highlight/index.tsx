import React, { useEffect, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import { Page } from '@root/payload-types'
import { RichText } from '@components/RichText'
import { Cell, Grid } from '@faceless-ui/css-grid'
import Code from '@components/Code'
import { Media } from '@components/Media'
import { CMSLink } from '@components/CMSLink'
import { PixelBackground } from '@components/PixelBackground'
import classes from './index.module.scss'

type Props = Extract<
  Page['layout'][0],
  { blockType: 'stickyHighlights' }
>['stickyHighlightsFields']['highlights'][0] & { yDirection: 'up' | 'down'; midBreak: boolean }

export const StickyHighlight: React.FC<Props> = React.memo(
  ({ richText, enableLink, link, type, code, media, yDirection, midBreak }) => {
    const [visible, setVisible] = useState(false)
    const [centerCodeMedia, setCenterCodeMedia] = useState(false)
    const ref = useRef(null)
    const codeMediaWrapRef = useRef(null)
    const codeMediaInnerRef = useRef(null)

    const codeMediaClasses = [
      classes.codeMedia,
      centerCodeMedia && classes.centerCodeMedia,
      visible && classes.visible,
    ]
      .filter(Boolean)
      .join(' ')

    useEffect(() => {
      if (!midBreak) {
        const refCopy = ref?.current
        const codeWrapRefCopy = codeMediaWrapRef?.current
        let intersectionObserver: IntersectionObserver
        let resizeObserver: ResizeObserver

        if (refCopy) {
          intersectionObserver = new IntersectionObserver(
            entries => {
              entries.forEach(entry => {
                setVisible(entry.isIntersecting)
              })
            },
            {
              rootMargin: '0px',
              threshold: 0.5,
            },
          )

          intersectionObserver.observe(refCopy)
        }

        if (codeWrapRefCopy && codeMediaInnerRef?.current) {
          resizeObserver = new ResizeObserver(entries => {
            entries.forEach(entry => {
              setCenterCodeMedia(
                entry.contentRect.height > (codeMediaInnerRef?.current?.clientHeight || 0),
              )
            })
          })

          resizeObserver.observe(codeWrapRefCopy)
        }

        return () => {
          if (refCopy) {
            intersectionObserver.unobserve(refCopy)
          }

          if (codeWrapRefCopy) {
            resizeObserver.unobserve(codeWrapRefCopy)
          }
        }
      }

      return () => null
    }, [ref, midBreak])

    return (
      <div
        ref={ref}
        className={[classes.stickyHighlight, classes[`scroll-direction--${yDirection}`]].join(' ')}
      >
        <Grid className={classes.minHeight}>
          <Cell cols={5} colsM={8}>
            <RichText content={richText} className={classes.richText} />
            {enableLink && <CMSLink {...link} appearance="default" />}
          </Cell>
        </Grid>
        <CSSTransition in={visible} timeout={750} classNames="codeMedia">
          <Grid className={classes.codeMediaPosition}>
            <Cell cols={6} start={7} colsM={8} startM={1}>
              <div className={codeMediaClasses} ref={codeMediaWrapRef}>
                <div ref={codeMediaInnerRef}>
                  {type === 'code' && (
                    <div className={classes.code}>
                      <PixelBackground className={classes.pixels} />
                      <Code>{code}</Code>
                    </div>
                  )}
                  {type === 'media' && typeof media === 'object' && <Media resource={media} />}
                </div>
              </div>
            </Cell>
          </Grid>
        </CSSTransition>
      </div>
    )
  },
)
