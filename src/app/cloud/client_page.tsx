'use client'

import React, { Fragment, useEffect } from 'react'
import { NewProjectBlock } from '@blocks/NewProject'
import { Cell, Grid } from '@faceless-ui/css-grid'
import { Text } from '@forms/fields/Text'

import { Button } from '@components/Button'
import { ProjectCard } from '@components/cards/ProjectCard'
import { Gutter } from '@components/Gutter'
import { LoadingShimmer } from '@components/LoadingShimmer'
import { TeamSelector } from '@components/TeamSelector'
import { useAuth } from '@root/providers/Auth'
import { useGetProjects } from '@root/utilities/use-cloud-api'
import useDebounce from '@root/utilities/use-debounce'

import classes from './index.module.scss'

export const CloudHomePage = () => {
  const { user } = useAuth()
  const [selectedTeam, setSelectedTeam] = React.useState<string | 'none'>()
  const [search, setSearch] = React.useState<string>('')
  const [searchedTerm, setSearchedTerm] = React.useState<string>(search)
  const debouncedSearch = useDebounce(search, 100)

  const {
    isLoading,
    error,
    result: projects,
  } = useGetProjects({
    teams: selectedTeam ? [selectedTeam] : undefined,
    search: debouncedSearch,
  })

  // this will avoid rendering race conditions
  // where the `NewProjectBlock` will flash on the screen
  // before the `useGetProjects` hook has started loading
  useEffect(() => {
    if (isLoading === false) {
      setSearchedTerm(debouncedSearch)
    }
  }, [isLoading, debouncedSearch])

  const matchedTeam = user?.teams?.find(({ team }) =>
    typeof team === 'string' ? team === selectedTeam : team?.id === selectedTeam,
  )?.team //eslint-disable-line function-paren-newline
  const teamName = typeof matchedTeam === 'string' ? matchedTeam : matchedTeam?.name

  return (
    <Fragment>
      <Gutter>
        {error && <p className={classes.error}>{error}</p>}
        <div className={classes.controls}>
          <div className={classes.controlsBG} />
          <Text
            placeholder="Search projects"
            initialValue={search}
            onChange={(incomingSearch: string) => {
              setSearch(incomingSearch)
            }}
            className={classes.search}
            fullWidth={false}
          />
          <TeamSelector
            onChange={incomingTeam => {
              setSelectedTeam(incomingTeam?.id)
            }}
            className={classes.teamSelector}
            initialValue="none"
            allowEmpty
            label={false}
          />
          <Button
            appearance="primary"
            href="/new"
            label="New project"
            el="link"
            className={classes.createButton}
          />
        </div>
        {isLoading && <LoadingShimmer number={3} />}
      </Gutter>
      {!isLoading && projects?.length === 0 && searchedTerm.length === 0 && (
        <NewProjectBlock
          heading={selectedTeam ? `Team '${teamName}' has no projects` : `You have no projects`}
          cardLeader="New"
          headingElement="h3"
        />
      )}
      {!isLoading && (projects?.length > 0 || searchedTerm.length > 0) && (
        <Gutter>
          <div className={classes.content}>
            {projects && projects.length === 0 && searchedTerm?.length > 0 && (
              <p className={classes.noResults}>
                {"Your search didn't return any results, please try again."}
              </p>
            )}
            {Array.isArray(projects) && projects.length > 0 && (
              <Grid className={classes.projects}>
                {projects.map((project, index) => (
                  <Cell key={index} cols={4}>
                    <ProjectCard project={project} className={classes.projectCard} />
                  </Cell>
                ))}
              </Grid>
            )}
          </div>
        </Gutter>
      )}
    </Fragment>
  )
}
