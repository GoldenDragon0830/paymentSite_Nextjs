'use client'

import React, { useEffect, useState } from 'react'
import AnimateHeight from 'react-animate-height'
import Link from 'next/link'
import { MenuIcon } from '@components/graphics/MenuIcon'
import { CloseIcon } from '@components/graphics/CloseIcon'
import { Gutter } from '../../../../../components/Gutter'
import { DocMeta, Topic } from '../types'
import { ChevronIcon } from '../../../../../components/graphics/ChevronIcon'
import { openTopicsLocalStorageKey } from '../shared'
import { MDXProvider } from '../../../../../components/MDX'
import classes from './index.module.scss'

type Props = {
  topics: Topic[]
  children: React.ReactNode
  doc: string
  topic: string
}

export const DocsTemplate: React.FC<Props> = ({
  topics,
  doc: docParam,
  topic: topicParam,
  children,
}) => {
  const [currentTopicIsOpen, setCurrentTopicIsOpen] = useState(true)
  const [openTopicPreferences, setOpenTopicPreferences] = useState<string[]>()
  const [init, setInit] = useState(false)
  const [navOpen, setNavOpen] = useState(false)

  useEffect(() => {
    const preference = window.localStorage.getItem(openTopicsLocalStorageKey)

    if (preference) {
      setOpenTopicPreferences(JSON.parse(preference))
    } else {
      setOpenTopicPreferences([topicParam])
    }
  }, [])

  useEffect(() => {
    if (openTopicPreferences && !init) {
      setInit(true)
    }
  }, [openTopicPreferences])

  return (
    <MDXProvider>
      <Gutter left="half" right="half" className={classes.wrap}>
        <nav
          className={[
            classes.nav,
            !openTopicPreferences && classes.navHidden,
            navOpen && classes.navOpen,
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {topics.map(topic => {
            const topicSlug = topic.slug.toLowerCase()
            const isCurrentTopic = topicParam === topicSlug
            const isActive =
              openTopicPreferences?.includes(topicSlug) || (isCurrentTopic && currentTopicIsOpen)

            return (
              <React.Fragment key={topic.slug}>
                <button
                  type="button"
                  className={[classes.topic, isActive && classes['topic--open']]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() => {
                    if (isCurrentTopic) {
                      if (openTopicPreferences.includes(topicSlug) && currentTopicIsOpen) {
                        const newState = [...openTopicPreferences]
                        newState.splice(newState.indexOf(topicSlug), 1)

                        setOpenTopicPreferences(newState)
                        window.localStorage.setItem(
                          openTopicsLocalStorageKey,
                          JSON.stringify(newState),
                        )
                      }
                      setCurrentTopicIsOpen(state => !state)
                    } else {
                      const newState = [...openTopicPreferences]

                      if (!newState.includes(topicSlug)) {
                        newState.push(topicSlug)
                      } else {
                        newState.splice(newState.indexOf(topicSlug), 1)
                      }

                      setOpenTopicPreferences(newState)
                      window.localStorage.setItem(
                        openTopicsLocalStorageKey,
                        JSON.stringify(newState),
                      )
                    }
                  }}
                >
                  <ChevronIcon
                    className={[classes.toggleChevron, isActive && classes.activeToggleChevron]
                      .filter(Boolean)
                      .join(' ')}
                  />
                  {topic.slug.replace('-', ' ')}
                </button>
                <AnimateHeight height={isActive ? 'auto' : 0} duration={init ? 200 : 0}>
                  <ul className={classes.docs}>
                    {topic.docs.map((doc: DocMeta) => {
                      const isDocActive = docParam === doc.slug && topicParam === topicSlug

                      return (
                        <li key={doc.slug}>
                          <Link
                            href={`/docs/${topicSlug}/${doc.slug}`}
                            className={[classes.doc, isDocActive && classes['doc--active']]
                              .filter(Boolean)
                              .join(' ')}
                          >
                            {doc.label}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </AnimateHeight>
              </React.Fragment>
            )
          })}
        </nav>
        <div className={classes.content}>{children}</div>
        <button
          type="button"
          onClick={() => setNavOpen(open => !open)}
          className={classes.mobileNavButton}
        >
          Documentation
          {!navOpen && <MenuIcon />}
          {navOpen && <CloseIcon />}
        </button>
      </Gutter>
    </MDXProvider>
  )
}
