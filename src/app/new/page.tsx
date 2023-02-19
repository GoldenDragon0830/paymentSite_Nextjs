'use client'

import React, { Fragment } from 'react'
import { TemplatesBlock } from '@blocks/TemplatesBlock'

import { Button } from '@components/Button'
import { Gutter } from '@components/Gutter'
import { Heading } from '@components/Heading'
import { useAuth } from '@root/providers/Auth'

import classes from './index.module.scss'

const NewProject: React.FC = () => {
  const { user } = useAuth()

  if (!user) {
    return (
      <Gutter>
        <h1>Create an account to get started.</h1>
        <Button label="Log in" href="/login" appearance="primary" />
      </Gutter>
    )
  }

  return (
    <Fragment>
      <Gutter>
        <div className={classes.header}>
          <div className={classes.headerContent}>
            <Heading element="h1" marginTop={false}>
              New project
            </Heading>
            <p className={classes.description}>
              Create a project from a template, or import an existing Git codebase.
            </p>
          </div>
          <Button
            label="Import existing codebase"
            href="/new/import"
            appearance="primary"
            el="link"
          />
        </div>
      </Gutter>
      <TemplatesBlock />
      <Gutter>
        <div className={classes.callToAction}>
          <h6>Payload Cloud is the best way to deploy a Payload project.</h6>
          <p>
            Get a quick-start with one of our pre-built templates, or deploy your own existing
            Payload codebase.
          </p>
        </div>
      </Gutter>
    </Fragment>
  )
}

export default NewProject
