'use client'

import * as React from 'react'
import { useRouteData } from '@cloud/context'

import { Button } from '@components/Button'
import { MaxWidth } from '@root/app/_components/MaxWidth'
import { useCustomerPortal } from '@root/utilities/use-customer-portal'
import { SectionHeader } from '../_layoutComponents/SectionHeader'

import classes from './page.module.scss'

const portalURL = `${process.env.NEXT_PUBLIC_CLOUD_CMS_URL}/api/customer-portal`

export default () => {
  const { team } = useRouteData()
  const { openPortalSession, error, loading } = useCustomerPortal({
    team,
  })

  return (
    <MaxWidth>
      <SectionHeader
        title="Team billing"
        intro="All billing is managed in Stripe, click the link below to be taken to your customer portal.
        You must be an owner of this team to manage billing."
      />
      {(loading || error) && (
        <div className={classes.formSate}>
          {loading && <p className={classes.loading}>Loading...</p>}
          {error && <p className={classes.error}>{error}</p>}
        </div>
      )}
      <Button
        href={portalURL}
        onClick={openPortalSession}
        label="Manage Billing"
        appearance="primary"
      />
    </MaxWidth>
  )
}
