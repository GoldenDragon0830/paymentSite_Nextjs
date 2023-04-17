'use client'

import React, { Fragment } from 'react'
import { Cell, Grid } from '@faceless-ui/css-grid'
import { Checkbox } from '@forms/fields/Checkbox'
import Form from '@forms/Form'
import FormProcessing from '@forms/FormProcessing'
import FormSubmissionError from '@forms/FormSubmissionError'
import Label from '@forms/Label'
import Submit from '@forms/Submit'
import { useRouter } from 'next/navigation'

import { Gutter } from '@components/Gutter'
import { useInstallationSelector } from '@components/InstallationSelector'
import { useTeamDrawer } from '@components/TeamDrawer'
import { UniqueRepoName } from '@components/UniqueRepoName'
import { useCreateDraftProject } from '@root/app/new/useCreateDraftProject'
import { PayloadIcon } from '@root/graphics/PayloadIcon'
import { Template } from '@root/payload-cloud-types'
import { useAuth } from '@root/providers/Auth'

import classes from './CloneTemplate.module.scss'

export const CloneTemplate: React.FC<{
  template?: Template
}> = props => {
  const { user } = useAuth()
  const { template } = props
  const router = useRouter()
  const [InstallationSelector, { value: selectedInstall }] = useInstallationSelector()

  const createDraftProject = useCreateDraftProject({
    projectName: template?.name,
    installID: selectedInstall?.id,
    templateID: template?.id,
    onSubmit: ({ id: draftProjectID }) => {
      router.push(`/new/clone/configure/${draftProjectID}`)
    },
  })

  const [TeamDrawer, TeamDrawerToggler] = useTeamDrawer()
  const noTeams = !user?.teams || user?.teams.length === 0

  return (
    <Form
      onSubmit={({ unflattenedData }) => {
        createDraftProject({
          repo: {
            name: unflattenedData?.repositoryName,
          },
          makePrivate: unflattenedData?.makePrivate,
        })
      }}
    >
      <Gutter>
        {noTeams && (
          <p className={classes.noTeams}>
            {`You must be a member of a team to create a project. `}
            <TeamDrawerToggler className={classes.createTeamLink}>
              Create a new team
            </TeamDrawerToggler>
            {'.'}
          </p>
        )}
        <FormProcessing />
        <FormSubmissionError />
        <Grid>
          <Cell cols={4} colsM={8} className={classes.sidebarCell}>
            <div className={classes.sidebar}>
              <div>
                <Label label="Selected Template" htmlFor="" />
                <div className={classes.template}>
                  <div className={classes.templateIcon}>
                    <PayloadIcon />
                  </div>
                  <p className={classes.templateName}>{template?.name}</p>
                </div>
              </div>
              {template?.description && <p>{template?.description}</p>}
            </div>
          </Cell>
          <Cell cols={8} colsM={8}>
            <Grid className={classes.projectInfo}>
              <Cell cols={4}>
                <InstallationSelector description="Select where to create this repository." />
              </Cell>
              <Cell cols={4}>
                <UniqueRepoName
                  repositoryOwner={selectedInstall?.account?.login}
                  initialValue={template?.slug}
                />
              </Cell>
            </Grid>
            <p className={classes.appPermissions}>
              {`Don't see your organization? `}
              <a href={selectedInstall?.html_url} rel="noopener noreferrer" target="_blank">
                Adjust your GitHub app permissions
              </a>
              {'.'}
            </p>
            <div className={classes.createPrivate}>
              <Checkbox
                label="Create private Git repository"
                initialValue={false}
                path="makePrivate"
              />
            </div>
            <Submit label="Create Project" appearance="primary" />
          </Cell>
        </Grid>
      </Gutter>
      <TeamDrawer />
    </Form>
  )
}
